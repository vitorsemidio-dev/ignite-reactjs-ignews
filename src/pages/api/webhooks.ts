import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import { Stripe } from "stripe";
import {
  stripe,
  StripeRequestHeaders,
  StripeWebhooksEvents,
} from "./../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set<string>([
  StripeWebhooksEvents.CHECKOUT_SESSION_COMPLETED,
  StripeWebhooksEvents.CUSTOMER_SUBSCRIPTION_CREATED,
  StripeWebhooksEvents.CUSTOMER_SUBSCRIPTION_UPDATED,
  StripeWebhooksEvents.CUSTOMER_SUBSCRIPTION_DELETED,
]);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);

    const secret = req.headers[StripeRequestHeaders.SIGNATURE];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.log(err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case StripeWebhooksEvents.CUSTOMER_SUBSCRIPTION_CREATED:
          case StripeWebhooksEvents.CUSTOMER_SUBSCRIPTION_UPDATED:
          case StripeWebhooksEvents.CUSTOMER_SUBSCRIPTION_DELETED:
            const subscription = event.data.object as Stripe.Subscription;
            await saveSubscription(
              subscription.id.toString(),
              subscription.customer.toString(),
              type === StripeWebhooksEvents.CUSTOMER_SUBSCRIPTION_CREATED,
            );
            break;
          case StripeWebhooksEvents.CHECKOUT_SESSION_COMPLETED:
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;
            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true,
            );
            break;
          default:
            throw new Error("Unhandled event type");
        }
      } catch (err) {
        return res.json({ error: "Webhook handler failed" });
      }
    }

    return res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method not allowed");
  }
};

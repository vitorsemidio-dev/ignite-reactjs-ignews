import { query as q } from "faunadb";
import { FaunaIndexes } from "./../../../services/enums/fauna.enum";
import { fauna, FaunaCollections } from "./../../../services/fauna";
import { stripe } from "./../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(q.Index(FaunaIndexes.USER_BY_STRIPE_CUSTOMER_ID), customerId),
      ),
    ),
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (createAction) {
    await fauna.query(
      q.If(
        q.Not(
          q.Exists(
            q.Match(q.Index(FaunaIndexes.SUBSCRIPTION_BY_ID), subscriptionId),
          ),
        ),
        q.Create(q.Collection(FaunaCollections.SUBSCRIPTIONS), {
          data: subscriptionData,
        }),
        q.Get(
          q.Match(q.Index(FaunaIndexes.SUBSCRIPTION_BY_ID), subscriptionId),
        ),
      ),
    );
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(q.Index(FaunaIndexes.SUBSCRIPTION_BY_ID), subscriptionId),
          ),
        ),
        {
          data: subscriptionData,
        },
      ),
    );
  }
}

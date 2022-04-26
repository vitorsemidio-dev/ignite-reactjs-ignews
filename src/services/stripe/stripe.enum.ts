export enum StripeRequestHeaders {
  SIGNATURE = "stripe-signature",
}

export enum StripeWebhooksEvents {
  CHECKOUT_SESSION_COMPLETED = "checkout.session.completed",
  CUSTOMER_SUBSCRIPTION_CREATED = "customer.subscription.created",
  CUSTOMER_SUBSCRIPTION_UPDATED = "customer.subscription.updated",
  CUSTOMER_SUBSCRIPTION_DELETED = "customer.subscription.deleted",
}

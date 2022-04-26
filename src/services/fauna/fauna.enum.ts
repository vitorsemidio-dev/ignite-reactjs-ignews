export enum FaunaCollections {
  SUBSCRIPTIONS = "subscriptions",
  USERS = "users",
}

export enum FaunaIndexes {
  SUBSCRIPTION_BY_ID = "subscription_by_id",
  USER_BY_EMAIL = "user_by_email",
  USER_BY_STRIPE_CUSTOMER_ID = "user_by_stripe_customer_id",
}

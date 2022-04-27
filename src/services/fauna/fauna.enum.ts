export enum FaunaCollections {
  SUBSCRIPTIONS = "subscriptions",
  USERS = "users",
}

export enum FaunaIndexes {
  SUBSCRIPTION_BY_ID = "subscription_by_id",
  SUBSCRIPTION_BY_STATUS = "subscription_by_status",
  SUBSCRIPTION_BY_USER_REF = "subscription_by_user_ref",
  USER_BY_EMAIL = "user_by_email",
  USER_BY_STRIPE_CUSTOMER_ID = "user_by_stripe_customer_id",
}

import { Client } from "faunadb";
export * from "./enums/fauna.enum";

export const fauna = new Client({
  secret: process.env.FAUNADB_API_KEY,
  domain: process.env.FAUNADB_DOMAIN,
});

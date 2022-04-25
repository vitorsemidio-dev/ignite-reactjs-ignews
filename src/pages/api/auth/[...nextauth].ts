import { query as q } from "faunadb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna, FaunaCollections, FaunaIndexes } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const data = {
        email: user.email,
      };
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index(FaunaIndexes.USER_BY_EMAIL),
                  q.Casefold(user.email),
                ),
              ),
            ),
            q.Create(q.Collection(FaunaCollections.USERS), { data }),
            q.Get(
              q.Match(
                q.Index(FaunaIndexes.USER_BY_EMAIL),
                q.Casefold(user.email),
              ),
            ),
          ),
        );
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});
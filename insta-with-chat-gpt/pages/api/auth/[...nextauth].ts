import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        // @ts-expect-error
        session.user.username = session.user?.name
          ?.split(" ")
          .join("")
          .toLocaleLowerCase();

        // @ts-expect-error
        session.user.uid = token.sub;
      }
      return session;
    },
  },
});

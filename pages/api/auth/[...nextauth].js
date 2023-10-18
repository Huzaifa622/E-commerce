import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signOut } from "next-auth/react";

const isAdmin = ['gamingbuddy8135@gmail.com'];
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      issuer: process.env.NEXTAUTH_CLIENT_ISSUER,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    signIn: async (user, account, profile) => {
      console.log('Sign-in callback - User details:', user);
      // Your sign-in logic here
      return Promise.resolve(true);
    },
    session: async({ session, token, user }) => {
      session.user = user;
      console.log(user)
      console.log(session);
      console.log(session?.user?.email)
      if (isAdmin.includes(session?.user?.email)) {
        return session;
      } else {
      
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

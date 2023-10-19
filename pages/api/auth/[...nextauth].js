import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signOut } from "next-auth/react";
import { errorToJSON } from "next/dist/server/render";

const isAdmin = ["gamingbuddy8135@gmail.com"];
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
    session: ({ session, token, user }) => {
      if (isAdmin.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export async function isAdminReq(req , res){
  const session = await getServerSession(req , res , authOptions)
  if(!isAdmin.includes(session?.user?.email)){
    res.status(401)
    res.end()
     throw 'not an Admin'
  }
}
export default NextAuth(authOptions);

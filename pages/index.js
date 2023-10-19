
import { useSession, signIn, signOut } from "next-auth/react";
import { Inter } from "next/font/google";

import Layout from "@/components/Layout";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {data: session } = useSession();
  // console.log(session)
 
  return (
  <Layout>
  <div className="flex justify-between mx-8 my-4 ">
    <div className="">Hello , {session?.user?.name}</div>
    <div className="flex ">
      <img src={session?.user?.image} width={25} alt="userimage"/>{session?.user?.email}</div>
  </div>
  </Layout>

  );
}

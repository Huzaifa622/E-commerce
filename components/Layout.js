import React from 'react'
import Nav from './Nav'
import { signIn, useSession } from 'next-auth/react';


const Layout = ({children}) => {
    const { data: session } = useSession();
    if (!session) {
      return (
        <div className="bg-slate-600 w-screen h-screen flex items-center">
          <div className="w-full text-center">
            <button
              onClick={() => signIn("google")}
              className="bg-slate-50 rounded-full p-2 " 
            >
              Sign in with google
            </button>
          </div>
        </div>
      );
    }
  return (
    <div className="bg-slate-600 min-h-screen flex flex-col">
    <Nav/>
    <div className="bg-white flex-grow h-full p-5 ">{children}</div>
  </div>
  )
}

export default Layout
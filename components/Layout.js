import React from 'react'
import Nav from './Nav'
import { signIn, useSession } from 'next-auth/react';


const Layout = ({children}) => {
    const { data: session } = useSession();
    console.log(session)
    if (!session) {
      return (
        <div className="bg-violet-600 w-screen h-screen flex items-center">
          <div className="w-full text-center">
            <button
              onClick={async() => await signIn("google")}
              className="bg-violet-400 text-white hover:bg-violet-800 rounded-full p-2 " 
            >
              Sign in with google
            </button>
          </div>
        </div>
      );
    }
  return (
    <div className="bg-violet-600 min-h-screen flex flex-col overflow-x-hidden text-base">
    <Nav/>
   <div className='bg-violet-50 flex flex-grow flex-col w-screen justify-start'>{children}</div>
  </div>
  )
}

export default Layout
'use client';

import { useSession, signOut } from "next-auth/react";

const SessionStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center space-x-4"> 
      {session ? (
        <>
          <span>Welcome, {session.user?.email}</span>
          <button onClick={() => signOut()} className="btn btn-sm"> 
            Logout
          </button>
        </>
      ) : (
        <div className="flex space-x-4">
          <a href="/auth/login" className="link link-hover btn btn-link">
            Login
          </a>
          <a href="/auth/register" className="link link-hover btn btn-link"> 
            Register
          </a>
        </div>
      )}
    </div>
  );
};

export default SessionStatus;
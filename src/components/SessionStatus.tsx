"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useState, useEffect } from "react";

const adjectives = ["Happy", "Sunny", "Clever", "Brave", "Gentle", "Witty", "Kind", "Calm", "Eager", "Jolly"];
const nouns = ["Penguin", "Tiger", "Dolphin", "Eagle", "Koala", "Panda", "Lion", "Wolf", "Bear", "Fox"];

const generateRandomName = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
};

const SessionStatus = () => {
  const { data: session, status } = useSession();
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    if (session?.user?.name === "Guest") {
      setGuestName(generateRandomName());
    }
  }, [session]);

  if (status === "loading") {
    return <button className="btn loading">Loading...</button>;
  }

  if (session) {
    const displayName = session.user?.name === "Guest" ? guestName : session.user?.name;
    return (
      <div className="flex items-center space-x-4">
        <span className="text-lg">Welcome, {displayName}</span>
        <button className="btn btn-primary" onClick={() => signOut()}>Logout</button>
      </div>
    );
  }

  return (
    <div className="flex space-x-4">
      <a href="/auth/login" className="btn btn-secondary">Login</a>
      <a href="/auth/register" className="btn btn-secondary">Register</a>
      <button onClick={() => signIn("credentials", { email: "guest", password: "guest" })} className="btn btn-secondary">
        Sign in as Guest
      </button>
    </div>
  );
};

export default SessionStatus;
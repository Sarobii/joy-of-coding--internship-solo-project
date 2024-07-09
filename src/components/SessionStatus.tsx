"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const adjectives = ["Happy", "Sunny", "Clever", "Brave", "Gentle", "Witty", "Kind", "Calm", "Eager", "Jolly"];
const nouns = ["Penguin", "Tiger", "Dolphin", "Eagle", "Koala", "Panda", "Lion", "Wolf", "Bear", "Fox"];

const generateRandomName = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
};

const SessionStatus = () => {
  const { data: session, status } = useSession();
  const [guestName, setGuestName] = useState(session?.user?.name === "Guest" ? session.user.name : "");
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.name === "Guest" && !guestName) {
      const storedName = localStorage.getItem("guestName");
      if (storedName) {
        setGuestName(storedName);
      } else {
        const newName = generateRandomName();
        setGuestName(newName);
        localStorage.setItem("guestName", newName);
      }
    }
  }, [session, guestName]);

  useEffect(() => {
    if (session && status === "authenticated") {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <button className="btn loading">Loading...</button>;
  }

  if (status === "authenticated" && session) {
    const displayName = session.user?.name === "Guest" ? guestName : session.user?.name;
    return (
      <div className="flex items-center space-x-4">
        <span className="text-lg">Welcome, {displayName}</span>
        <button className="btn btn-primary" onClick={() => signOut()}>Logout</button>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex space-x-4">
        <a href="/auth/login" className="btn btn-secondary">Login</a>
        <a href="/auth/register" className="btn btn-secondary">Register</a>
        <button onClick={() => signIn("credentials", { email: "guest", password: "guest", redirect: false }).then(() => router.push('/'))} className="btn btn-secondary">
          Guest
        </button>
      </div>
    );
  }

  // Handle any unexpected cases
  return null;
};

export default SessionStatus;

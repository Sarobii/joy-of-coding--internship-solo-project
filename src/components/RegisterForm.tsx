"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {error && <p className="text-error">{error}</p>}
        <input
          type="text"
          id="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="email"
          value={email}
          id="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          value={confirmPassword}
          id="confirm-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="input input-bordered w-full max-w-xs"
        />
        {password !== confirmPassword && <p className="text-error">Passwords do not match</p>}
        <button className="btn btn-primary w-full max-w-xs" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

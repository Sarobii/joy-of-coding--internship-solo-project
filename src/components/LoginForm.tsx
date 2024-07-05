'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/"); // Redirect to the home page after successful login
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4"> 
        {error && <p className="text-error">{error}</p>} 
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
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="input input-bordered w-full max-w-xs" 
        />
        <button type="submit" className="btn btn-primary w-full max-w-xs">Login</button> 
      </form>
    </div>
  );
}

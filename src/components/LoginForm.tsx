"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: true, // Set to false if you want to handle errors inline without page reloads
      callbackUrl: "/dashboard", // Where to send the user after a successful login
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/");
      router.refresh();
    } catch (err) { setMsg(err.message); }
  }

  return (
    <div>
      {/* <Navbar /> */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 p-6 border border-black rounded bg-white text-black">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
               className="w-full border border-black px-2 py-1 mb-4 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
               className="w-full border border-black px-2 py-1 mb-4 rounded" required />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Login</button>
        {msg && <p className="text-red-600 mt-2">{msg}</p>}
      </form>
    </div>
  );
}


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      alert("Registered successfully! Please login.");
      router.push("/login");
    } catch (err) { setMsg(err.message); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 border mb-3 rounded text-black"/>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border mb-3 rounded text-black"/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border mb-3 rounded text-black"/>
      <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-white hover:text-black transition">Register</button>
      {msg && <p className="text-red-500 mt-2">{msg}</p>}
    </form>
  );
}



"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    function onUserChanged() {
      const u = localStorage.getItem("user");
      setUser(u ? JSON.parse(u) : null);
    }

    window.addEventListener("user-changed", onUserChanged);

    return () => {
      window.removeEventListener("user-changed", onUserChanged);
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout API failed", err);
    }
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-changed"));
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>

      <div className="flex space-x-4 items-center">
        {user ? (
          <>
            <Link href="/create-post" className="bg-white text-black px-3 py-1 rounded">Add Post</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

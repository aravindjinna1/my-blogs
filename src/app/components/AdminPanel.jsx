"use client";
import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch("/api/posts").then(r=>r.json()).then(d=>setPosts(d.posts||[]));
  }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure to delete this post?")) return;
    await fetch(`/api/posts`, { method: "DELETE", body: JSON.stringify({ id }), headers: { "Content-Type": "application/json" } });
    setPosts(posts.filter(p=>p._id!==id));
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      {posts.map(post=>(
        <div key={post._id} className="flex justify-between items-center border-b py-2">
          <span>{post.title}</span>
          <button onClick={()=>handleDelete(post._id)} className="text-red-600 hover:underline">Delete</button>
        </div>
      ))}
    </div>
  );
}

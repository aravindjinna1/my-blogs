"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CreatePostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold','italic','underline','strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link','image'],
      ['clean']
    ]
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.push("/");
      router.refresh();
    } catch (err) { setMsg(err.message); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <input
        type="text"
        required
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className="w-full p-2 border mb-4 rounded text-black"
      />
      <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} className="h-64 mb-4" />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black transition">Post</button>
      {msg && <p className="text-red-500 mt-2">{msg}</p>}
    </form>
  );
}

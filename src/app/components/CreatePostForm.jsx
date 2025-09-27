


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";

export default function CreatePostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Bold,
      Italic,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: "<p><em>Start writing your content here…</em></p>",
    immediatelyRender: false, 
  });

  async function handleImageUpload(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!res.ok) throw new Error("Image upload failed");
    return res.json();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    const content = editor?.getHTML() || "";
    if (!title.trim() || !content.trim()) {
      setMsg("Please provide title and content.");
      return;
    }

    setIsPosting(true);
    try {
      let imageUrl = null;
      if (imageFile) {
        const uploadRes = await handleImageUpload(imageFile);
        imageUrl = uploadRes.secure_url;
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content, imageUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create post");

      router.push("/");
      router.refresh();
    } catch (err) {
      setMsg(err.message || "Network error");
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md mt-6 text-black"
    >
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>

      <input
        type="text"
        required
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border mb-4 rounded text-black"
      />

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Upload Featured Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
          }}
        />
        {imagePreview && (
          <div className="relative mt-2">
            <img
              src={imagePreview}
              alt="preview"
              className="max-h-48 border rounded"
            />
          </div>
        )}
      </div>

      {/* Render editor only on client */}
      {isClient && editor && (
        <>
          {/* Toolbar */}
          <div className="mb-2 flex gap-2">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded">Bold</button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded">Italic</button>
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className="px-2 py-1 border rounded">Underline</button>
            <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className="px-2 py-1 border rounded">Strike</button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 border rounded">H2</button>
          </div>

          <div className="min-h-[240px] border p-3 rounded prose max-w-full mb-4 bg-white text-black">
            <EditorContent editor={editor} />
          </div>
        </>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPosting}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
        {msg && <p className="text-red-600">{msg}</p>}
      </div>
    </form>
  );
}

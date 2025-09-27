

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostCard({ post, currentUser }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const isAuthor = currentUser?.id === post.authorId; // ✅ check ownership

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete post");
      }

      router.refresh(); // refresh list after delete
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <article className="border border-gray-300 rounded-md p-4 mb-4 bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>

      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <p className="text-gray-500 mt-2 text-sm">
        By {post.authorName} — {new Date(post.createdAt).toLocaleString()}
      </p>

      {post.images && (
        <img
          src={post.images}
          alt="post-image"
          className="mt-2 max-h-64 rounded border"
        />
      )}

      {/* ✅ Show delete only if current user is the author */}
      {isAuthor && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </article>
  );
}

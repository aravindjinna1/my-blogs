"use client";
export default function PostCard({ post }) {
  return (
    <article className="border border-gray-300 rounded-md p-4 mb-4 bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: post.content }} />
      <p className="text-gray-500 mt-2 text-sm">By {post.authorName} — {new Date(post.createdAt).toLocaleString()}</p>
    </article>
  );
}




"use client";

import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const loggedInUserId = session?.user?.id;

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch((err) => console.error(err));
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="bg-black text-white mb-10">
      {/* <main className="max-w-4xl mx-auto p-6"> */}
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Bloggerz</h1>

        <div className="mb-6 flex justify-center  ">
          <input 
            type="text"
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full max-w-md text-black bg-white mb-10"
          />
           </div>
        </div>

        <div className="m-20">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-600">No posts found.</p>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUserId={loggedInUserId}
            />
          ))
        )}
        </div>
      {/* </main> */}
    </div>
  );
}

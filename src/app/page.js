// "use client";
// import { useEffect, useState } from "react";
// import PostCard from "./components/PostCard";

// export default function HomePage() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/posts").then(r=>r.json()).then(d=>{
//       setPosts(d.posts||[]);
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <main className="max-w-4xl mx-auto mt-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>
//       {loading ? <p className="text-center">Loading...</p> :
//         posts.length===0 ? <p className="text-center">No posts yet.</p> :
//         posts.map(p=><PostCard key={p._id} post={p} />)
//       }
//       <h2>no posts now</h2>
//     </main>
//   );
// }


// // /app/page.js
// import Navbar from "./components/Navbar";

// export default function HomePage() {
//   return (
//     <div className="bg-white text-black min-h-screen">
//       <Navbar />
//       <main className="max-w-3xl mx-auto p-6">
//         <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
//         <p>All blog posts will appear below.</p>
//       </main>
//     </div>
//   );
// }


"use client";
// import Navbar from "./components/Navbar";
import PostCard from "./components/PostCard";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Main content */}
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to My Blog</h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet. Be the first to create one!</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </main>
    </div>
  );
}

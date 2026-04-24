"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  description: string;
  image: string;
  short_description: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  // Load all posts initially
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, []);

  // Search posts
  const searchPost = () => {
    const inputValue = inputRef.current?.value || "";
    const encodedQuery = encodeURIComponent(inputValue);

    setQuery(inputValue);
    setSearchLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?q=${encodedQuery}`)
      .then((res) => res.json())
      .then((res) => setPosts(res))
      .finally(() => setSearchLoading(false));
  };

  // Search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPost();
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </main>

      <div className="flex justify-end px-4 mb-4">
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-md"
        />

        <button
          onClick={searchPost}
          disabled={searchLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
        >
          {searchLoading ? "Loading..." : "Search"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post._id}`}>
            <div className="border border-gray-200 p-4 cursor-pointer">
              <img
                className="w-full h-48 object-cover mb-4"
                src={post.image}
                alt="Post Image"
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && query && (
        <p className="text-center mt-6 text-gray-600">
          No posts available for your search: <b>{query}</b>
        </p>
      )}
    </>
  );
}
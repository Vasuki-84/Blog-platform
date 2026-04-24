"use client";

import { use, useEffect, useState } from "react";

type PostType = {
  title: string;
  description: string;
  image: string;
  created_at: string;
};

export default function Post({
  params,
}: {
  params:  { id: string };
}) {
  const { id } = params;

  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`)
      .then((res) => res.json())
      .then((res) => setPost(res));
  }, [id]);

  return (
    <div>
      {post && (
        <main className="container mx-auto px-4 py-6">
          <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
          <p className="text-gray-500">{post.created_at}</p>
          <img src={post.image} alt="Post Image" className="my-4" />
          <p>{post.description}</p>
        </main>
      )}
    </div>
  );
}
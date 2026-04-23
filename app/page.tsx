"use client"

import Image from "next/image";
import { useEffect, useState,useRef } from "react";
import Link from "next/link";

export default function Home() {
  type Post = {
    _id: string;
  title: string;
  description: string;
  image: string;
   short_description: string;

};
 const [posts, setPosts] = useState<Post[]>([]);

 // shows all posts in UI
  useEffect(()=>{
    console.log(process.env.NEXT_PUBLIC_API_URL,'API_URL')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
    .then((res)=>res.json())
    .then(res=>setPosts(res))
  },[]);

  // disable / enable the search button depends the search
const [search,setSearch]= useState(false);



// Get input values in search post using UseRef() hook
const inputRef = useRef<HTMLInputElement>(null);

  // search posts
  const searchPost = ()=>{
    setSearch(true);
      const query = inputRef.current?.value || "";
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?q=${query}`)
        .then((res)=>res.json())
        .then(res=>setPosts(res))
        .finally(()=> setSearch(false))
  }


  return (
    <>
    <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </main>
      <div className="flex justify-end px-4">
        <input ref={inputRef} type="text" className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
        <button   onClick={searchPost} disabled={search} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">{search? "Loading...": "Search"}</button>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          posts.map((post)=> (
            <Link key={post._id} href={"/post/"+post._id}>
          <div className="border border-gray-200 p-4">
          <img className="w-full h-48 object-cover mb-4" src={post.image} alt="Post Image"/>
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600">{post.short_description}</p>
        </div>
        </Link>
))}
       
    </div>
      </>
  );
}

"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { IBlog } from "@/models/blog";

export default function Home() {
  const [fetchedBlogs, setFetchedBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    console.log("fetching blogs")
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const blogsData = await response.json();
        console.log(blogsData,"blogsData")
        setFetchedBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>My Blog</h1>
      <div>
        {fetchedBlogs.length===0?<p>No blogs found!</p>:
        fetchedBlogs.map((blog)=>{
          return <BlogCard key={blog._id} blog={blog} />
        })}
      </div>
    </div>
  );
}

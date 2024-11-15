"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IBlog } from "@/models/blog";

export default function BlogPage() {
  const { slug } = useParams(); // Access the slug parameter from the URL
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(slug,"slug")
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch the blog");
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!blog) {
    return <p>No blog found.</p>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>
        <strong>Author:</strong> {blog.author}
      </p>
      <p>
        <em>Published on:</em> {new Date(blog.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

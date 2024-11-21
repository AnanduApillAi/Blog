"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IBlog } from "@/models/blog";
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch the blog");
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500">Error: {error}</p>
    </div>
  );

  if (!blog) return (
    <div className="flex items-center justify-center min-h-screen">
      <p>No blog found.</p>
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} />
              <time>{new Date(blog.createdAt).toLocaleDateString()}</time>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={16} />
              <time>{new Date(blog.createdAt).toLocaleTimeString()}</time>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-100 mb-6">
            <div className="flex-1">
              <div className="font-medium">By {blog.author}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {blog.topics.map((topic, index) => (
              <Link href={`/topics/${topic}`} key={index}>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:opacity-80 transition-opacity">
                  {topic}
                </span>
              </Link>
            ))}
          </div>
        </header>

        <div className="prose lg:prose-lg max-w-none">
          <div className="mb-4 leading-relaxed text-gray-700">
            {blog.content}
          </div>
        </div>
      </article>
    </main>
  );
}
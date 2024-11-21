// app/topics/[slug]/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import { IBlog } from '@/models/blog';

export default function TopicPage() {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/topics/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blogs');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchBlogs();
  }, [slug]);

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-theme-primary capitalize">{slug as string} Posts</h1>
        <p className="text-theme-secondary">
          Found {blogs.length} posts in this topic
        </p>
      </div>

      <div className="space-y-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </main>
  );
}
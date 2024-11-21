// app/page.tsx
"use client"
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import { IBlog } from "@/models/blog";

export default function HomePage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let response;
        
        if (searchQuery) {
          response = await fetch('/api/blogs/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchTerm: searchQuery }),
          });
        } else {
          response = await fetch('/api/blogs');
        }

        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setBlogs(searchQuery ? data.matchingBlogs : data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-theme-primary mb-6">My Blog</h1>
        
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-theme-secondary">
          {searchQuery ? 'No blogs found for your search.' : 'No blogs available.'}
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
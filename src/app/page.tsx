"use client";

import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";
import { IBlog } from "@/models/blog";

export default function Home() {
  const [fetchedBlogs, setFetchedBlogs] = useState<IBlog[]>([]);
  const [searchResults, setSearchResults] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const blogsData = await response.json();
        setFetchedBlogs(blogsData);
        setSearchResults(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearchResults = (results: IBlog[]) => {
    setSearchResults(results);
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-theme-primary">My Blogggg</h1>
      
      <div className="max-w-2xl">
        <SearchBar onSearchResults={handleSearchResults} />
      </div>
      
      <div className="space-y-6">
        {searchResults.length === 0 ? (
          <p className="text-center py-8 text-theme-secondary">No blogs found!</p>
        ) : (
          searchResults.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        )}
      </div>
    </div>
  );
}
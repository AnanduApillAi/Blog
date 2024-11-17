"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { IBlog } from "@/models/blog";
import SearchBar from "@/components/searchBar";

export default function Home() {
  const [fetchedBlogs, setFetchedBlogs] = useState<IBlog[]>([]);
  const [searchResults, setSearchResults] = useState<IBlog[]>([]);

  useEffect(() => {
    console.log("fetching blogs");
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const blogsData = await response.json();
        console.log(blogsData, "blogsData");
        setFetchedBlogs(blogsData);
        setSearchResults(blogsData);  // Initially, show all blogs in search results
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Search handler function that updates the search results
  const handleSearchResults = (results: IBlog[]) => {
    setSearchResults(results);
  };

  useEffect(()=>{
    console.log(searchResults,'page levvel')
  },[searchResults])
  
  return (
    <div>
      <h1>My Blog</h1>
      <SearchBar onSearchResults={handleSearchResults} />
      <div>
        {searchResults.length === 0 ? (
          <p>No blogs found!</p>
        ) : (
          searchResults.map((blog) => {
            return <BlogCard key={blog._id} blog={blog} />;
          })
        )}
      </div>
    </div>
  );
}

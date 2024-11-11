"use client"

import { useEffect } from "react";
import {blogs} from "../lib/dummyData"
import BlogCard from "../components/BlogCard"
export default function Home() {
  useEffect(()=>{
    console.log(blogs)
  },[])
  return (
    <div className="">
      <h1>My Blog</h1>
      <div>
        {blogs.map((blog)=>{
          return <BlogCard key={blog.id} blog={blog}/>
        })}
      </div>
    </div>
  );
}

// app/blog/[slug]/page.tsx

"use client"
import { blogs } from "../../../lib/dummyData"
import { useEffect, useState } from "react"
import { Blog } from "../../../types/types"
import React from "react"

export default function Page({ params }: { params: { slug: string } }) {
  const slug = React.use(params).slug // Directly access slug from params
  const [blog, setBlog] = useState<Blog | null>(null)

  useEffect(() => {
    if (slug) {
      const foundBlog = blogs.find(item => item.slug === slug)
      setBlog(foundBlog || null)
    }
  }, [slug])

  useEffect(() => {
    if (blog) {
      console.log(blog)
    }
  }, [blog])

  return (
    <div>
      <h1>{blog ? blog.title : 'Loading...'} </h1>
      <p>{blog ? blog.content : 'Loading content...'}</p>
    </div>
  )
}

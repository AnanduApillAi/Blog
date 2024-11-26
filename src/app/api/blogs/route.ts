import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog";

// GET route to fetch all blogs
export async function GET() {
  try {
    await dbConnect(); // Connect to the database
    const blogs = await Blog.find({}); // Fetch all blogs
    return NextResponse.json(blogs); // Return the blogs as JSON
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE route to delete a blog
export async function DELETE(request: Request) {
  try {
    await dbConnect(); // Connect to the database
    const { blogId } = await request.json(); // Extract the blog ID from the request body
    const deletedBlog = await Blog.findByIdAndDelete(blogId); // Delete the blog and get the deleted document
    if (!deletedBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    // Save the deleted blog to a separate collection or return it as a response
    await saveDeletedBlog(deletedBlog);
    return NextResponse.json(deletedBlog); // Return the deleted blog as JSON
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function saveDeletedBlog(blog: any) {
  try {
    await dbConnect();
    const mongoose = require('mongoose');
    const deletedBlogCollection = mongoose.connection.collection("deleted_blogs");
    await deletedBlogCollection.insertOne(blog);
  } catch (error) {
    console.error("Error saving deleted blog:", error);
  }
}
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog";

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

// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Blog from "../../../models/blog";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({});
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

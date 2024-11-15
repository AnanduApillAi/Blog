import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = await params;

  try {
    await dbConnect(); // Connect to the database
    const blog = await Blog.findOne({ slug }); // Find a blog by its slug
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(blog); // Return the blog as JSON
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog";
import { ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    await dbConnect(); // Connect to the database
    let blog;
    
    // Try to find by ObjectId first
    if (ObjectId.isValid(slug)) {
      blog = await Blog.findOne({ _id: new ObjectId(slug) });
    }
    
    // If not found by ID, try to find by slug
    if (!blog) {
      blog = await Blog.findOne({ slug });
    }

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

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  
  try {
    await dbConnect();
    const body = await req.json();
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      slug,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

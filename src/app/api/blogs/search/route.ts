import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { searchTerm } = await req.json();
    
    if (!searchTerm?.trim()) {
      return NextResponse.json(
        { success: false, error: "Search term is required" },
        { status: 400 }
      );
    }

    const url = `${process.env.STRAPI_API_URL}/api/blogs?filters[$or][0][title][$containsi]=${encodeURIComponent(searchTerm)}&filters[$or][1][topics][name][$containsi]=${encodeURIComponent(searchTerm)}&populate=topics&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&fields[3]=author&fields[4]=excerpts&fields[5]=documentId`;

    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi search failed: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      matchingBlogs: data.data || []
    });

  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to search blogs",
        details: error.message 
      },
      { status: 500 }
    );
  }
}
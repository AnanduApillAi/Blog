import {NextResponse } from "next/server";



export async function GET() {
  try {

    const url = `${process.env.STRAPI_API_URL}/api/blogs?populate=topics&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&fields[3]=author&fields[4]=excerpts&fields[5]=documentId&sort[0]=publishedAt:desc`;

    const response = await fetch(url, {

      headers: {
        "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      blogs: data.data || []
    });

  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blogs",
        details: error.message
      },
      { status: 500 }
    );
  }
}
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Blog from '@/models/Blog'; // Assuming Blog is your mongoose model

export async function POST(req: NextApiRequest) {
  

  // Extracting the search term from the request body
  await dbConnect(); // Connect to the database
  const { searchTerm } = await req.json();

  // Basic validation
  if (!searchTerm || typeof searchTerm !== 'string') {
    return NextResponse.json(
      { success: false, error: 'Invalid input. Search term is required.' },
      { status: 400 }
    );
  }

  // Regex to allow only alphanumeric characters and spaces
  if (!/^[a-zA-Z0-9\s]+$/.test(searchTerm)) {
    return NextResponse.json(
      { success: false, error: 'Search term contains invalid characters.' },
      { status: 400 }
    );
  }

  try {
    console.log(`searching through blogs to find ${searchTerm}`);
    // Search in the database: Title or Topics matching the search term (case-insensitive)
    const matchingBlogs = await Blog.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { topics: { $regex: searchTerm, $options: 'i' } }
      ]
    }).exec();
    
    // Return the blogs that matched the search term
    return NextResponse.json({ success: true, matchingBlogs: matchingBlogs });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'An error occurred while searching for blogs.' },
      { status: 500 }
    );
  }
}

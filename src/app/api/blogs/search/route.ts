import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest) {
  const res = NextResponse.json({});

  console.log(req.method); // This will log the method

  const { searchTerm } = await req.json(); // Using req.json() to get the body

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

  // Proceed with search logic (dummy response here)
  return NextResponse.json({ success: true, message: `Searching for ${searchTerm}` });
}

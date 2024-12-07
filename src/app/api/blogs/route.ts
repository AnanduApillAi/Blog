export async function getBlogs() {
  const strapiUrl = process.env.STRAPI_API_URL;
  const strapiToken = process.env.STRAPI_API_TOKEN;
  
  if (!strapiUrl || !strapiToken) {
    console.error('Missing required environment variables');
    return { data: [] };
  }

  try {
    const url = `${strapiUrl}/api/blogs?populate=topics&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&fields[3]=author&fields[4]=excerpts&fields[5]=documentId&sort[0]=publishedAt:desc`;
    
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'Authorization': `Bearer ${strapiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { data: [] };
  }
}
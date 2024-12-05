export async function getBlogs() {
    try {
      const url = `${process.env.STRAPI_API_URL}/api/blogs?populate=topics&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&fields[3]=author&fields[4]=excerpts&fields[5]=documentId&sort[0]=publishedAt:desc`;
  
  
      const res = await fetch(url, {
        next: { revalidate: 3600 },
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
      }
  
      const data = await res.json();
      console.log(data,'dtaat')
  
      return data;
    } catch (error) {
      console.error('Error:', error);
      return { data: [] };
    }
  }
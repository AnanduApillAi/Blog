// services/strapi.ts
export async function fetchAPI(path: string) {
    const apiURL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    
    const response = await fetch(`${apiURL}/api${path}`);
    const data = await response.json();
    return data;
  }
  
  // Example function to fetch all blogs
  export async function getAllBlogs() {
    const data = await fetchAPI('/blogs');
    return data.data;
  }
  
  // Example function to fetch a single blog
  export async function getBlog(slug: string) {
    const data = await fetchAPI(`/blogs?filters[slug][$eq]=${slug}`);
    return data.data[0];
  }
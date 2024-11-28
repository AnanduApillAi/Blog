// app/page.tsx
import BlogCard from '@/components/BlogCard'

// Page-level revalidation
export const revalidate = 3600 

interface Blog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  publishedAt: string;
  author: string;
  excerpts: string;
}

async function debugBlogData() {
  try {
    // Test different URL structures
    const urls = [
      `${process.env.STRAPI_API_URL}/api/blogs?populate=*`,
      `${process.env.STRAPI_API_URL}/api/blogs?populate[topics]=*`,
      `${process.env.STRAPI_API_URL}/api/blogs?populate=topics`,
      // Your current URL
      `${process.env.STRAPI_API_URL}/api/blogs?populate[topics][fields][0]=name&populate[topics][fields][1]=slug&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&fields[3]=author&fields[4]=excerpt&fields[5]=documentId&sort[0]=publishedAt:desc`
    ];

    for (let i = 0; i < urls.length; i++) {
      console.log('\n--- Testing URL ' + (i + 1) + ' ---');
      console.log('URL:', urls[i]);
      
      const res = await fetch(urls[i]);
      const data = await res.json();
      
      console.log('\nResponse Structure:');
      console.log('Has data array:', Boolean(data.data));
      console.log('Number of blogs:', data.data?.length);
      
      if (data.data?.[0]) {
        console.log('\nFirst Blog Structure:');
        console.log(JSON.stringify(data.data[0], null, 2));
        
        console.log('\nAvailable Fields in First Blog:');
        console.log(Object.keys(data.data[0]));
        
        if (data.data[0].attributes) {
          console.log('\nAvailable Attributes:');
          console.log(Object.keys(data.data[0].attributes));
          
          if (data.data[0].attributes.topics) {
            console.log('\nTopics Data:');
            console.log(JSON.stringify(data.data[0].attributes.topics, null, 2));
          } else {
            console.log('\nNo topics field found in attributes');
          }
        }
      }
    }
  } catch (error) {
    console.error('Debug Error:', error);
  }
}


async function getBlogs() {
 try {
  const url = `${process.env.STRAPI_API_URL}/api/blogs?populate=topics&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&fields[3]=author&fields[4]=excerpts&fields[5]=documentId&sort[0]=publishedAt:desc`;
   console.log('Fetching from URL:', url);

   const res = await fetch(url, {
     next: { revalidate: 3600 },
     cache: 'force-cache'
   });

   console.log('Response status:', res.status);
   console.log('Response status text:', res.statusText);

   if (!res.ok) {
     const errorText = await res.text();
     console.error('Error response:', errorText);
     throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
   }

   const data = await res.json();
   console.log('Fetched data:', data);
   return data;
 } catch (error) {
   console.error('Error:', error);
   return { data: [] };
 }
}

export default async function HomePage() {
  // await debugBlogData();
 const { data: blogs } = await getBlogs();

 return (
   <div>
     {/* Page Header */}
     <div className="mb-8">
       <h1 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
         Latest Articles
       </h1>
       <p className="text-theme-secondary">
         Explore our collection of articles on web development and technology
       </p>
     </div>

     {/* Blog Grid */}
     <div className="space-y-8">
       {blogs.length === 0 ? (
         <div className="text-center py-12 text-theme-secondary">
           No articles available at the moment.
         </div>
       ) : (
         blogs.map((blog: Blog) => (
           <BlogCard
             key={blog.id}
             blog={{
               title: blog.title,
               slug: blog.slug,
               excerpts: blog.excerpts,
               author: blog.author,
               createdAt: blog.publishedAt,
               topics:blog.topics
             }}
           />
         ))
       )}
     </div>

     {/* Results Count */}
     {blogs.length > 0 && (
       <div className="mt-8 text-center text-theme-secondary">
         Showing {blogs.length} articles
       </div>
     )}
   </div>
 );
}
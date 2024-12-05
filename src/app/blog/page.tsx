// app/blog/page.tsx
import BlogCard from '@/components/BlogCard'
import ClientSearch from '@/components/ClientSearch'
import {getBlogs} from '../api/blogs/route'
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






async function searchBlogs(query: string) {
  try {
    const url = `${process.env.STRAPI_API_URL}/api/blogs?filters[$or][0][title][$containsi]=${encodeURIComponent(query)}&filters[$or][1][topics][name][$containsi]=${encodeURIComponent(query)}&populate=topics&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&fields[3]=author&fields[4]=excerpts&fields[5]=documentId`;
    const res = await fetch(url)
    if (!res.ok) throw new Error('Search failed')
    const data = await res.json()

    return data.data
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}

export default async function HomePage({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q
  let serverBlogs = []

  // Server-side rendering logic
  if (query) {
    serverBlogs = await searchBlogs(query)
  } else {
    const { data } = await getBlogs()
    console.log(data,'blogss')
    serverBlogs = data
  }

  return (
    <div>
      {/* Server Rendered Content */}
      <div id="server-content" >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
            {query ? `Search Results: ${query}` : 'Latest Articles'}
          </h1>
          <p className="text-theme-secondary">
            {query
              ? `Found ${serverBlogs.length} articles matching "${query}"`
              : 'Explore our collection of articles on web development and technology'
            }
          </p>
        </div>

        <div className="space-y-8">
          {serverBlogs.map((blog: Blog) => (
            <BlogCard
              key={blog.id}
              blog={{
                title: blog.title,
                slug: blog.slug,
                excerpts: blog.excerpts,
                author: blog.author,
                createdAt: blog.publishedAt,
                topics: blog.topics
              }}
            />
          ))}
        </div>
      </div>

      {/* Client Search Results */}
      <ClientSearch />
    </div>
  )
}
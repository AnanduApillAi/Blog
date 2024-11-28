// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import RichText from '@/components/RichText';
import type { Metadata } from 'next';

// Generate static paths at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.STRAPI_API_URL}/api/blogs`);
    const { data: blogs } = await res.json();
    
    return blogs.map((blog: any) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating paths:', error);
    return [];
  }
}

// Generate metadata for each blog post
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const slug = await params.slug;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: `${blog.title} | Your Blog Name`,
    description: blog.excerpts,
    openGraph: {
      title: blog.title,
      description: blog.excerpts,
      type: 'article',
      authors: [blog.author],
      publishedTime: blog.publishedAt
    }
  };
}

async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=topics`,
      {
        next: { revalidate: 3600 }
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch blog');
    }

    const { data } = await res.json();
    return data[0];
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export default async function BlogPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const slug = await params.slug;
  const blog = await getBlogBySlug(slug);
  console.log(blog,'blogSingle')
  if (!blog) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} />
              <time>{new Date(blog.publishedAt).toLocaleDateString()}</time>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={16} />
              <time>{new Date(blog.publishedAt).toLocaleTimeString()}</time>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-100 mb-6">
            <div className="flex-1">
              <div className="font-medium">By {blog.author}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {blog.topics.map((topic) => (
              <Link 
                href={`/topics/${topic.slug}`} 
                key={topic.id}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:opacity-80 transition-opacity"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        </header>

        <div className="prose lg:prose-lg max-w-none">
          <RichText content={blog.content} />
        </div>
      </article>
    </main>
  );
}
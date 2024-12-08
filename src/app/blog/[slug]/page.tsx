// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import RichText from '@/components/RichText';
import type { Metadata } from 'next';

interface BlogType {
  slug: string;
  title: string;
  excerpts: string;
  content: string;
  publishedAt: string;
  author: string;
  topics: { id: number; slug: string; name: string }[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.STRAPI_API_URL}/api/blogs`);
    const { data: blogs } = await res.json();
    
    return blogs.map((blog: BlogType) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating paths:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: `${blog.title}`,
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
        cache: 'no-store'
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

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="px-4 py-8">
      <article className="bg-theme-secondary rounded-xl shadow-sm overflow-hidden">
        <header className="p-6 border-b border-theme-primary">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-theme-primary">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-theme-secondary">
              <Calendar size={16} className="text-theme-tertiary" />
              <time>{new Date(blog.publishedAt).toLocaleDateString()}</time>
            </div>
            <div className="flex items-center gap-2 text-theme-secondary">
              <Clock size={16} className="text-theme-tertiary" />
              <time>{new Date(blog.publishedAt).toLocaleTimeString()}</time>
            </div>
          </div>

          {/* Author Card */}
          <div className="bg-theme-tertiary rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="font-medium text-theme-primary">
                  By {blog.author}
                </div>
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2">
            {blog.topics.map((topic: { id: number; slug: string; name: string }) => (
              <Link
                href={`/topics/${topic.slug}`}
                key={topic.id}
                className="px-3 py-1 rounded-full text-sm bg-theme-tertiary text-theme-primary hover:bg-theme-accent-primary hover:text-white transition-all duration-200"
              >
                {topic.name}
              </Link>
            ))}
          </div>
        </header>

        {/* Blog Content */}
        <div className="p-6">
          <div className="prose lg:prose-lg max-w-none dark:prose-invert prose-headings:text-theme-primary prose-p:text-theme-secondary prose-a:text-theme-accent-primary">
            <RichText content={blog.content} />
          </div>
        </div>
      </article>
    </main>
  );
}
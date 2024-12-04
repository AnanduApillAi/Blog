// app/topics/[slug]/page.tsx
import { notFound } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import type { Metadata } from 'next';

// Generate static paths for all topics
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.STRAPI_API_URL}/api/topics`);
    const { data: topics } = await res.json();
    
    return topics.map((topic: any) => ({
      slug: topic.slug,
    }));
  } catch (error) {
    console.error('Error generating paths:', error);
    return [];
  }
}

// Generate metadata for each topic page
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const topic = await getTopicData(params.slug);
  
  if (!topic) {
    return {
      title: 'Topic Not Found',
      description: 'The requested topic could not be found.'
    };
  }

  return {
    title: `${topic.name} Posts | Your Blog Name`,
    description: topic.description
  };
}

// Fetch topic data and its blogs
async function getTopicData(slug: string) {
  try {
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/api/topics?filters[slug][$eq]=${slug}&populate[blogs][populate]=topics`,
      {
        next: { revalidate: 3600 }
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch topic');
    }

    const { data } = await res.json();
    const topic = data[0];
    
    if (!topic) return null;

    return {
      id: topic.id,
      name: topic.name,
      description: topic.description,
      blogs: topic.blogs.map((blog: any) => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpts: blog.excerpts,
        author: blog.author,
        createdAt: blog.publishedAt,
        topics: blog.topics.map((topic: any) => ({
          name: topic.name,
          slug: topic.slug
        }))
      }))
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export default async function TopicPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const topic = await getTopicData(params.slug);

  if (!topic) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-theme-primary">
          {topic.name}
        </h1>
        <p className="text-theme-secondary mb-4">
          {topic.description}
        </p>
        <p className="text-theme-secondary">
          Found {topic.blogs.length} posts in this topic
        </p>
      </div>

      <div className="space-y-6">
        {topic.blogs.map((blog) => (
          <BlogCard 
            key={blog.id} 
            blog={blog}
          />
        ))}
      </div>
    </main>
  );
}
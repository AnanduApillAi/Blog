// app/topics/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Topic {
  id: number;
  name: string;
  description: string;
  slug: string;
  documentId: string;
  blogs: any[];  // for counting blog posts
}

interface Category {
  id: number;
  name: string;
  topics: Topic[];
}

async function getTopicsWithCategories() {
  try {
    // Fetch categories with their topics and related blogs
    const res = await fetch(`${process.env.STRAPI_API_URL}/api/categories?populate[topics][populate][blogs][count]=true&pagination[pageSize]=100`, {
    
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch categories and topics');
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export default async function TopicsPage() {
  const categories = await getTopicsWithCategories();

  if (!categories) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-theme-primary">Topics</h1>
        <p className="text-theme-secondary">
          Explore our collection of articles by topic
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          console.log(category,'category'),
          <div 
            key={category.id} 
            className="bg-theme-secondary rounded-xl overflow-hidden shadow-sm p-4 sm:p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-theme-primary">
              {category.name}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {category.topics.map((topic) => (
                <Link 
                  key={topic.id} 
                  href={`/topics/${topic.slug}`}
                  className="block"
                >
                  <div className="bg-theme-tertiary p-4 rounded-lg hover:bg-opacity-90 transition-all h-full">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-medium text-theme-primary">
                        {topic.name}
                      </h3>
                      <span className="px-2 py-1 bg-accent-primary text-theme-primary text-xs rounded-full min-w-[3rem] text-center">
                        {topic.blogs.count} 
                        {topic.blogs.count === 1 ? ' post' : ' posts'}
                      </span>
                    </div>
                    <p className="text-sm text-theme-secondary line-clamp-2">
                      {topic.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export function generateMetadata() {
  return {
    title: 'Topics | Your Blog Name',
    description: 'Explore our collection of articles by category'
  };
}
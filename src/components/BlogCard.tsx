// components/BlogCard.tsx
import Link from 'next/link';
import { Calendar } from 'lucide-react';



interface BlogCardProps {
  blog: {
    title: string;
    excerpts: string;  // notice the 's'
    slug: string;
    author: string;
    publishedAt: string;
    topics: Array<{
      id: number;
      name: string;
      slug: string;
      documentId: string;
    }>;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  console.log(blog,'blog')
  return (
    <article className="bg-theme-secondary rounded-xl overflow-hidden shadow-sm">
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-2 mb-3 text-theme-secondary">
          <Calendar size={16} />
          <time>{new Date(blog.createdAt).toLocaleDateString()}</time>
        </div>
        
        {/* Title and Link */}
        <Link href={`/blog/${blog.slug}`}>
          <h2 className="text-xl font-bold mb-2 text-theme-primary hover:text-accent-primary transition-colors">
            {blog.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="mb-4 text-theme-secondary">
          {blog.excerpts}
        </p>

        {/* Author */}
        <div className="text-sm mb-4 text-theme-secondary">
          By {blog.author}
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-2">
          {blog.topics.map((topic, index) => (
            <Link href={`/topics/${topic.slug}`} key={index}>
              <span className="px-3 py-1 rounded-full text-sm bg-theme-tertiary text-theme-secondary hover:opacity-80 transition-opacity">
                {topic.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
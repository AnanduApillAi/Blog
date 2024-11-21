// components/BlogCard.tsx
import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
  blog: {
    title: string;
    content: string;
    slug: string;
    author: string;
    createdAt: string;
    topics: string[];
    _id: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <article className="bg-theme-secondary rounded-xl overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3 text-theme-secondary">
          <Calendar size={16} />
          <time>{new Date(blog.createdAt).toLocaleDateString()}</time>
        </div>
        
        <Link href={`/blog/${blog.slug}`}>
          <h2 className="text-xl font-bold mb-2 text-theme-primary hover:text-accent-primary transition-colors">
            {blog.title}
          </h2>
        </Link>

        <p className="mb-4 text-theme-secondary">
          {blog.content.slice(0, 150)}...
        </p>

        <div className="text-sm mb-4 text-theme-secondary">
          By {blog.author}
        </div>

        <div className="flex flex-wrap gap-2">
          {blog.topics.map((topic, index) => (
            <Link href={`/topics/${topic}`} key={index}>
              <span className="px-3 py-1 rounded-full text-sm bg-theme-tertiary text-theme-secondary hover:opacity-80 transition-opacity">
                {topic}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
// app/topics/[slug]/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-theme-primary">
          Topic Not Found
        </h2>
        <p className="text-theme-secondary mb-6">
          The topic you're looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/topics" 
          className="inline-block px-6 py-2 bg-accent-primary text-white rounded-full hover:bg-accent-secondary transition-colors"
        >
          View All Topics
        </Link>
      </div>
    </div>
  );
}
import Link from "next/link";

// app/blog/[slug]/not-found.tsx
export default function NotFound() {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-theme-primary">
            Blog Post Not Found
          </h2>
          <p className="text-theme-secondary mb-6">
            The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link 
            href="/" 
            className="inline-block px-6 py-2 bg-accent-primary text-white rounded-full hover:bg-accent-secondary transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

function RecentBlogs() {
 const [recentBlogs, setRecentBlogs] = useState([]);

 useEffect(() => {
   const fetchBlogs = async () => {
     try {
       const baseUrl = window.location.origin;
       const response = await fetch(`${baseUrl}/api/blogs`);
       const { blogs } = await response.json();
       setRecentBlogs(blogs.slice(0, 3));
     } catch (error) {
       console.error('Error fetching recent blogs:', error);
     }
   };

   fetchBlogs();
 }, []);

 if(recentBlogs.length==0){
  return
 }
 return (
   <section>
     <div className="px-4 md:px-16 w-full lg:w-[80%] py-16">
       <div className="flex justify-between items-center mb-8">
         <h2 className="text-2xl font-bold" style={{ color: 'var(--portfolio-text)' }}>Recent Posts</h2>
         <Link
           href="/blog"
           className="px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1"
           style={{
             background: 'var(--portfolio-zinc)',
             color: 'var(--portfolio-text)',
             boxShadow: '0 4px 6px rgba(var(--portfolio-accent-rgb), 0.1)'
           }}
         >
           View All
         </Link>
       </div>

       <div className="space-y-4">
         {recentBlogs.map((blog) => (
           <a
             key={blog.id}
             href={`/blog/${blog.slug}`}
             className="block p-4 rounded-lg transition-all duration-300 hover:-translate-x-2"
             style={{
               background: 'var(--portfolio-zinc)',
               boxShadow: '0 2px 4px rgba(var(--portfolio-accent-rgb), 0.05)'
             }}
           >
             <div className="flex justify-between items-start gap-4">
               <div className="flex-1">
                 <h3
                   className="font-medium mb-2 line-clamp-1"
                   style={{ color: 'var(--portfolio-text)' }}
                 >
                   {blog.title}
                 </h3>
                 <p
                   className="text-sm line-clamp-1 mb-2"
                   style={{ color: 'var(--portfolio-secondary)' }}
                 >
                   {blog.excerpts}
                 </p>
                 <div className="flex gap-2">
                   {blog.topics.map((topic) => (
                     <span
                       key={topic.id}
                       className="text-xs px-2 py-1 rounded text-white font-semibold"
                       style={{
                         background: 'var(--portfolio-accent)'
                       }}
                     >
                       {topic.name}
                     </span>
                   ))}
                 </div>
               </div>
               <span
                 className="text-xs whitespace-nowrap"
                 style={{ color: 'var(--portfolio-accent)' }}
               >
                 {new Date(blog.publishedAt).toLocaleDateString()}
               </span>
             </div>
           </a>
         ))}
       </div>
     </div>
   </section>
 );
}

export default RecentBlogs;
// components/ClientSearch.tsx
"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import BlogCard from './BlogCard'

export default function ClientSearch() {
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [initialLoad, setInitialLoad] = useState(true)
  const [domActive, setDomActive] = useState(false)

  useEffect(() => {
    if (initialLoad){
      setInitialLoad(false)
      return;
    } 
    
    const serverContent = document.getElementById('server-content')
    
    if (query) {

      serverContent?.classList.add('hidden')
      
      fetch('/api/blogs/search', {
        method: 'POST',
        body: JSON.stringify({ searchTerm: query })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data,'client search data')
        setSearchResults(data.matchingBlogs)
        setIsLoading(false)
        setDomActive(true)
      })
    } else {
      serverContent?.classList.remove('hidden')
      setSearchResults([])
      setDomActive(false)
    }
  }, [query])

  if (!query || initialLoad) return null;

  if (!domActive) return null;
  return (
    <div id="client-content">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-theme-primary">
          Search Results: {query}
        </h1>
        {isLoading ? (
          <p className="text-theme-secondary">Searching...</p>
        ) : (
          <p className="text-theme-secondary">
            Found {searchResults.length} articles matching &quot;{query}&quot;
          </p>
        )}
      </div>

      <div className="space-y-8">
        {searchResults.map(blog => (
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
  )
}
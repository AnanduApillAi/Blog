// app/admin/page.tsx
"use client"
import { useState, useEffect } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import { IBlog } from '@/types'

export default function AdminPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      if (!response.ok) throw new Error('Failed to fetch blogs')
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-theme-primary">Blog Management</h1>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded hover:bg-accent-secondary transition-colors"
        >
          <Plus size={20} />
          New Blog
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-theme-tertiary text-theme-primary placeholder:text-theme-secondary"
        />
      </div>

      {/* Blog List */}
      <div className="bg-theme-secondary rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-theme-tertiary">
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Topics</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog._id} className="border-t border-theme-primary">
                <td className="px-4 py-3">{blog.title}</td>
                <td className="px-4 py-3">{blog.author}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {blog.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-theme-tertiary rounded-full text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button className="p-1 text-blue-500 hover:text-blue-700">
                      <Edit size={20} />
                    </button>
                    <button className="p-1 text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-8 text-theme-secondary">
            No blogs found.
          </div>
        )}
      </div>
    </div>
  )
}
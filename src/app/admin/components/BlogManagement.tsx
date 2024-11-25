import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import {IBlog} from '../../../models/blog'

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-theme-primary mb-6">Blog Management</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-theme-tertiary text-theme-primary placeholder:text-theme-secondary"
        />
      </div>

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
                      <span key={index} className="px-2 py-1 bg-theme-tertiary rounded-full text-xs">
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
          <div className="text-center py-8 text-theme-secondary">No blogs found.</div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
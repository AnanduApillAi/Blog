"use client"
import React, { useState } from 'react';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';

const ModernBlog = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Sample blog data
  const posts = [
    {
      id: 1,
      title: "The Future of Web Design: Minimalism Meets Functionality",
      excerpt: "Exploring how modern web design is evolving to combine aesthetic minimalism with powerful functionality.",
      date: "March 20, 2024",
      time: "14:30",
      topics: ["Web Design", "UI/UX", "Development"]
    },
    {
      id: 2,
      title: "Understanding Modern JavaScript Patterns",
      excerpt: "A deep dive into the latest JavaScript patterns and practices that are shaping modern development.",
      date: "March 19, 2024",
      time: "09:15",
      topics: ["JavaScript", "Programming", "Web Development"]
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" 
             onClick={() => setIsMenuOpen(false)}>
          <div className={`absolute top-0 left-0 bottom-0 w-64 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          } transform transition-transform duration-300 ease-in-out`}
               onClick={e => e.stopPropagation()}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold">MONO</span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-4">
                <a href="#" className="block py-2 hover:text-blue-500 transition-colors">Home</a>
                <a href="#" className="block py-2 hover:text-blue-500 transition-colors">Topics</a>
                <a href="#" className="block py-2 hover:text-blue-500 transition-colors">About</a>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-40 ${
        isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
      } backdrop-blur-md border-b ${
        isDarkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold">MONO</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Topics</a>
              <a href="#" className="hover:text-blue-500 transition-colors">About</a>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <div className={`relative ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              } rounded-full`}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className={`w-full py-2 px-4 pl-10 rounded-full outline-none ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search - Shown below header on mobile */}
      <div className="md:hidden p-4">
        <div className={`relative ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        } rounded-full`}>
          <input
            type="text"
            placeholder="Search articles..."
            className={`w-full py-2 px-4 pl-10 rounded-full outline-none ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.id} className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } rounded-xl overflow-hidden shadow-sm`}>
              <div className="p-6">
                {/* Date and Time */}
                <div className={`mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <time>{post.date} at {post.time}</time>
                </div>
                
                <h2 className="text-xl font-bold mb-2 hover:text-blue-500 cursor-pointer">
                  {post.title}
                </h2>
                <p className={`mb-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {post.excerpt}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.topics.map((topic, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ModernBlog;
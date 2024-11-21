"use client"
import React, { useState } from 'react';
import { Menu, X, Search, Moon, Sun, Calendar, Clock } from 'lucide-react';

const SingleBlogPost = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Sample blog post data
  const post = {
    title: "Understanding Modern JavaScript Patterns",
    date: "March 20, 2024",
    time: "14:30",
    author: {
      name: "Sarah Johnson",
      role: "Senior Developer",
    },
    topics: ["JavaScript", "Programming", "Web Development"],
    content: [
      {
        type: "paragraph",
        content: "Modern JavaScript development has evolved significantly over the past few years. With the introduction of ES6 and subsequent releases, we've seen a transformation in how we write and structure our code."
      },
      {
        type: "heading",
        content: "The Rise of Modern Patterns"
      },
      {
        type: "paragraph",
        content: "Design patterns in JavaScript have become increasingly important as applications grow in complexity. They provide tested solutions to common problems in software design and help create more maintainable codebases."
      },
      {
        type: "code",
        content: `// Example of the Observer Pattern
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}`
      },
      {
        type: "heading",
        content: "Practical Applications"
      },
      {
        type: "paragraph",
        content: "These patterns find practical applications in real-world scenarios. From state management to event handling, understanding these patterns can significantly improve your code architecture."
      },
      {
        type: "paragraph",
        content: "When implementing these patterns, it's crucial to consider the specific needs of your project. Not every pattern is suitable for every situation, and sometimes simpler solutions might be more appropriate."
      }
    ]
  };

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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article>
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Calendar size={16} />
                <time>{post.date}</time>
              </div>
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Clock size={16} />
                <time>{post.time}</time>
              </div>
            </div>

            {/* Author Info */}
            <div className={`flex items-center gap-4 p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            } mb-6`}>
              <div className="flex-1">
                <div className="font-medium">{post.author.name}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {post.author.role}
                </div>
              </div>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-2">
              {post.topics.map((topic, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-300' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {topic}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose lg:prose-lg dark:prose-invert max-w-none">
            {post.content.map((section, index) => {
              switch (section.type) {
                case 'heading':
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {section.content}
                    </h2>
                  );
                case 'paragraph':
                  return (
                    <p key={index} className={`mb-4 leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {section.content}
                    </p>
                  );
                case 'code':
                  return (
                    <pre key={index} className={`p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <code>{section.content}</code>
                    </pre>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </article>
      </main>
    </div>
  );
};

export default SingleBlogPost;
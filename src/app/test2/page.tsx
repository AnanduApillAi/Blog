"use client"
import React, { useState } from 'react';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';

const TopicsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Sample topics data with categories
  const topicCategories = [
    {
      category: "Development",
      topics: [
        { name: "JavaScript", postCount: 128 },
        { name: "React", postCount: 95 },
        { name: "Python", postCount: 82 },
        { name: "Web Development", postCount: 156 },
        { name: "Node.js", postCount: 73 }
      ]
    },
    {
      category: "Design",
      topics: [
        { name: "UI/UX", postCount: 112 },
        { name: "Web Design", postCount: 89 },
        { name: "Typography", postCount: 45 },
        { name: "Color Theory", postCount: 34 },
        { name: "Design Systems", postCount: 67 }
      ]
    },
    {
      category: "Business",
      topics: [
        { name: "Marketing", postCount: 94 },
        { name: "Startups", postCount: 76 },
        { name: "Entrepreneurship", postCount: 88 },
        { name: "Strategy", postCount: 62 },
        { name: "Product Management", postCount: 71 }
      ]
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
                  placeholder="Search topics..."
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
            placeholder="Search topics..."
            className={`w-full py-2 px-4 pl-10 rounded-full outline-none ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Topics</h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore our collection of articles by topic
          </p>
        </div>

        {/* Topics Grid */}
        <div className="space-y-8">
          {topicCategories.map((category, index) => (
            <div key={index} className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } rounded-xl overflow-hidden shadow-sm p-6`}>
              <h2 className="text-xl font-bold mb-4">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.topics.map((topic, topicIndex) => (
                  <div
                    key={topicIndex}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium mb-1">{topic.name}</div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {topic.postCount} posts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TopicsPage;
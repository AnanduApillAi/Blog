"use client"
import { useState } from 'react';
import TopicManagement from './components/TopicManagement';
import BlogManagement from './components/BlogManagement';

const AdminPanel = () => {
  const [currentScreen, setCurrentScreen] = useState<'blog' | 'topic'>('blog');

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentScreen === 'blog'
              ? 'bg-accent-primary text-white hover:bg-accent-secondary'
              : 'bg-theme-tertiary text-theme-primary hover:bg-theme-secondary'
          }`}
          onClick={() => setCurrentScreen('blog')}
        >
          Blog Management
        </button>
        <button
          className={`ml-2 px-4 py-2 rounded-lg transition-colors ${
            currentScreen === 'topic'
              ? 'bg-accent-primary text-white hover:bg-accent-secondary'
              : 'bg-theme-tertiary text-theme-primary hover:bg-theme-secondary'
          }`}
          onClick={() => setCurrentScreen('topic')}
        >
          Topic Management
        </button>
      </div>

      {currentScreen === 'blog' ? <BlogManagement /> : <TopicManagement />}
    </div>
  );
};

export default AdminPanel;
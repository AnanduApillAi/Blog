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
              ? 'bg-theme-tertiary text-theme-primary '
              : 'bg-accent-primary text-theme-tertiary'
          }`}
          onClick={() => setCurrentScreen('blog')}
        >
          Blog Management
        </button>
        <button
          className={`ml-2 px-4 py-2 rounded-lg transition-colors ${
            currentScreen === 'topic'
              ? 'bg-theme-tertiary text-theme-primary'
              : 'bg-accent-primary text-theme-tertiary'
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
"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Topic {
  name: string;
  description: string;
  postCount: number;
}

interface TopicCategory {
  category: string;
  topics: Topic[];
}

export default function TopicsPage() {
  const [topicCategories, setTopicCategories] = useState<TopicCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics');
        if (!response.ok) throw new Error('Failed to fetch topics');
        const data = await response.json();
        setTopicCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load topics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-theme-primary">Topics</h1>
        <p className="text-theme-secondary">
          Explore our collection of articles by topic
        </p>
      </div>

      <div className="space-y-8">
        {topicCategories.map((category, index) => (
          <div key={index} className="bg-theme-secondary rounded-xl overflow-hidden shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-theme-primary">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.topics.map((topic, topicIndex) => (
                <Link key={topicIndex} href={`/topics/${topic.name}`}>
                  <div
                  
                  className="bg-theme-tertiary p-4 rounded-lg cursor-pointer hover-bg-theme"
                >
                  <div className="font-medium mb-1 text-theme-primary">{topic.name}</div>
                  <div className="text-sm text-theme-secondary">
                    {topic.postCount} posts
                  </div>
                </div>
                </Link>
                
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
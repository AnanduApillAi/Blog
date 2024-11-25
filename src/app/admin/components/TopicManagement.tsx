import { useState, useEffect } from 'react';
import { ITopic } from '@/models/topic';

const TopicManagement = () => {
  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/topics');
      if (!response.ok) throw new Error('Failed to fetch topics');
      const data = await response.json();
      const topics = data.flatMap((category) => category.topics);
      setTopics(topics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-theme-primary mb-6">Topic Management</h1>

      <div className="bg-theme-secondary rounded-lg overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="bg-theme-tertiary">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-right">Posts</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => (
              <tr key={topic.name} className="border-t border-theme-primary">
                <td className="px-4 py-3">{topic.name}</td>
                <td className="px-4 py-3">{topic.description}</td>
                <td className="px-4 py-3 text-right">{topic.postCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {topics.length === 0 && (
          <div className="text-center py-8 text-theme-secondary">No topics found.</div>
        )}
      </div>
    </div>
  );
};

export default TopicManagement;
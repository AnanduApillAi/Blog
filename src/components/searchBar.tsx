"use client"
import { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const validateInput = (input: string) => {
    // Basic validation: check for empty input or invalid characters
    if (!input.trim()) {
      return 'Search term cannot be empty.';
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(input)) {
      return 'Search term contains invalid characters.';
    }
    return ''; // No errors
  };

  const handleSearch = async () => {
    const validationError = validateInput(searchTerm);
    if (validationError) {
      setAlertMessage(validationError);
      return;
    }

    try {
      const response = await fetch('/api/blogs/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm }),
      });
      const data = await response.json();

      if (!data.success) {
        setAlertMessage(data.error);
        return;
      }

      setAlertMessage(''); // Clear any previous error messages
      console.log(data.message); // Proceed with search results
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />
      <button onClick={handleSearch}>Search</button>
      {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}
    </div>
  );
};

export default SearchBar;

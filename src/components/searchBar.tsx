// components/SearchBar.tsx
"use client"
import { useState, useEffect } from 'react';
import { Search, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialSearch?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialSearch = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const validateInput = (input: string) => {
    if (!input.trim()) {
      return 'Search term cannot be empty.';
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(input)) {
      return 'Search term contains invalid characters.';
    }
    return '';
  };

  const handleSearch = async () => {
    const validationError = validateInput(searchTerm);
    if (validationError) {
      setAlertMessage(validationError);
      return;
    }

    try {
      setIsSearching(true);
      setAlertMessage('');
      router.push(`/?q=${encodeURIComponent(searchTerm.trim())}`);
    } catch (error) {
      console.error('An error occurred:', error);
      setAlertMessage('An error occurred while searching');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none
          ${isFocused ? 'text-accent-primary' : 'text-theme-tertiary'}`}>
          <Search size={20} />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search articles..."
          className={`
            w-full
            h-12
            pl-12
            pr-[120px]
            rounded-full
            bg-theme-tertiary
            text-theme-primary
            placeholder:text-theme-tertiary
            outline-none
            transition-colors
            ${isFocused ? 'ring-2 ring-accent-primary' : 'ring-1 ring-theme-primary'}
          `}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchTerm.trim()) handleSearch();
          }}
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchTerm.trim()}
            className={`
              h-8
              px-4
              rounded-full
              font-medium
              text-sm
              transition-colors
              relative
              text-theme-tertiary
              ${!searchTerm.trim() 
                ? 'bg-theme-secondary' 
                : isSearching 
                  ? 'bg-accent-secondary text-theme-tertiary' 
                  : 'bg-accent-primary hover:bg-accent-secondary'
              }
              disabled:opacity-50
              disabled:cursor-not-allowed
            `}
          >
            <span className="relative z-10">
              Search
            </span>
            {isSearching && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Loader className="w-4 h-4 animate-spin" />
              </span>
            )}
          </button>
        </div>
      </div>

      {alertMessage && (
        <div className="mt-2 text-sm text-red-500 px-4">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
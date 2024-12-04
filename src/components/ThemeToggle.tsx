'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() =>{
        setTheme(theme === 'dark' ? 'light' : 'dark')
        
        
      } }
      className="p-2 rounded-full bg-theme-secondary hover:bg-theme-tertiary transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-theme-primary" />
      ) : (
        <Moon className="w-5 h-5 text-theme-primary" />
      )}
    </button>
  );
}
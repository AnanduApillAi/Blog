// app/layout.tsx
"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import '../styles/global.css';
import SearchBar from "@/components/SearchBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const darkModePreference = localStorage.getItem('darkMode') === 'true';
      setIsDarkMode(darkModePreference);
      
      // Also check system preference if no stored preference
      if (localStorage.getItem('darkMode') === null) {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemPrefersDark);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };
  
  return (
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <body className="bg-theme-primary text-theme-primary transition-colors duration-200">
        <Header onDarkModeToggle={toggleDarkMode} />
        <div className="mt-20">
          <SearchBar/>
        </div>
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
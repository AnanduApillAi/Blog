"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.cookie = `theme=${newTheme};path=/`;
  };

  const NavLinks = () => (
    <>
      <Link href="/" className="text-theme-primary hover:text-accent-primary transition-colors">
        Home
      </Link>
      <Link href="/topics" className="text-theme-primary hover:text-accent-primary transition-colors">
        Topics
      </Link>
      <Link href="/about" className="text-theme-primary hover:text-accent-primary transition-colors">
        About
      </Link>
    </>
  );

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 lg:hidden" 
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="absolute top-0 left-0 bottom-0 w-64 bg-theme-secondary transform transition-transform duration-300 ease-in-out"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="text-xl font-bold text-theme-primary">
                  MONO
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-theme-primary hover:text-accent-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-4">
                <NavLinks />
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-theme-secondary/95 backdrop-blur-md border-b border-theme-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-theme-primary hover:text-accent-primary transition-colors" 
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-theme-primary hover:text-accent-primary transition-colors">
                MONO
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavLinks />
            </nav>

            {/* Theme Toggle */}
            {mounted && (
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-theme-primary hover:bg-theme-tertiary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="transition-transform hover:rotate-12" />
                ) : (
                  <Moon size={20} className="transition-transform hover:-rotate-12" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
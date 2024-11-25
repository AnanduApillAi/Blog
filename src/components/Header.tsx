"use client"
// components/Header.tsx
import React, { useState } from 'react';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';
import Link from 'next/link';



const Header= () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-overlay-background z-50 lg:hidden" 
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="absolute top-0 left-0 bottom-0 w-64 bg-theme-secondary transform transition-transform duration-300 ease-in-out"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-theme-primary">MONO</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-theme-primary">
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-4">
                <Link href="/" className="block py-2 text-theme-primary hover:text-accent-primary transition-colors">Home</Link>
                <Link href="/topics" className="block py-2 text-theme-primary hover:text-accent-primary transition-colors">Topics</Link>
                <Link href="/about" className="block py-2 text-theme-primary hover:text-accent-primary transition-colors">About</Link>
              </nav>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-theme-secondary/95 backdrop-blur-md border-b border-theme-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button className="lg:hidden text-theme-primary" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-theme-primary">MONO</Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-theme-primary hover:text-accent-primary transition-colors">Home</Link>
              <Link href="/topics" className="text-theme-primary hover:text-accent-primary transition-colors">Topics</Link>
              <Link href="/about" className="text-theme-primary hover:text-accent-primary transition-colors">About</Link>
            </nav>

            <button 
              onClick={() => window.toggleTheme()}
              className="p-2 rounded-full text-theme-primary hover:bg-theme-tertiary transition-colors"
            >
              <Sun size={20} className="hidden dark:block" />
              <Moon size={20} className="block dark:hidden" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
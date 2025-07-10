'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--facebook-border)] bg-[var(--facebook-blue)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left Section - Logo and Search */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link 
              href="/" 
              className="text-2xl font-bold text-white">
                Wall
              </Link>
            </div>
            
          </div>

          {/* Right Section - Theme Toggle and Settings */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
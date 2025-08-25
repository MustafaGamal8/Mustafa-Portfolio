'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-card text-card-foreground border border-border">
        <Sun size={20} />
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-card text-card-foreground border border-border hover:bg-card-hover transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label={theme === 'light' ? 'تبديل إلى الوضع المظلم' : 'تبديل إلى الوضع المضيء'}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-primary" />
      ) : (
        <Sun size={20} className="text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
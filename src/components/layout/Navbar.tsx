import React from 'react';
import { Zap, Github } from 'lucide-react';

interface NavbarProps {
  username: string;
  onSearch: (username: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ username, onSearch }) => {
  const [input, setInput] = React.useState(username);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <nav className="sticky top-0 z-40 bg-surface-DEFAULT/80 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-bold text-white text-sm tracking-tight hidden sm:block">
            Dev<span className="text-brand-400">Pulse</span>
          </span>
        </div>

        {/* Search */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative flex-1">
            <Github
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="GitHub username..."
              className="w-full bg-surface-card border border-surface-border rounded-lg pl-8 pr-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
          >
            Search
          </button>
        </form>

        {/* GitHub link */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-white transition-colors flex-shrink-0"
        >
          <Github size={18} />
        </a>
      </div>
    </nav>
  );
};

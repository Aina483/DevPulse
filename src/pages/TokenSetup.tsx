import React, { useState } from 'react';
import { Zap, Key, ExternalLink, Shield, Eye, EyeOff } from 'lucide-react';

interface TokenSetupProps {
  onTokenSave: (token: string) => void;
}

export const TokenSetup: React.FC<TokenSetupProps> = ({ onTokenSave }) => {
  const [token, setToken] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      localStorage.setItem('github_token', token.trim());
      onTokenSave(token.trim());
    }
  };

  return (
    <div className="min-h-screen bg-surface-DEFAULT flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Dev<span className="text-brand-400">Pulse</span>
          </h1>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-brand-500/10 rounded-lg">
              <Key size={18} className="text-brand-400" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-sm">Connect GitHub</h2>
              <p className="text-gray-500 text-xs">Enter your Personal Access Token</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">GitHub PAT</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-surface-DEFAULT border border-surface-border rounded-lg px-3 py-2.5 pr-10 text-sm text-white placeholder-gray-700 font-mono focus:outline-none focus:border-brand-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!token.trim()}
              className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              Launch Dashboard
            </button>
          </form>

          {/* How to get token */}
          <div className="mt-5 pt-4 border-t border-surface-border">
            <p className="text-xs text-gray-600 mb-3 font-medium uppercase tracking-wider">How to get your token</p>
            <ol className="space-y-2">
              {[
                'Go to GitHub → Settings → Developer settings',
                'Click "Personal access tokens" → "Tokens (classic)"',
                'Generate new token with read:user and repo scopes',
                'Copy and paste the token above',
              ].map((step, i) => (
                <li key={i} className="flex gap-2.5 text-xs text-gray-500">
                  <span className="text-brand-400 font-mono font-bold flex-shrink-0">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
            <a
              href="https://github.com/settings/tokens/new?scopes=read:user,repo&description=DevPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-1.5 text-xs text-brand-400 hover:underline"
            >
              <ExternalLink size={11} />
              Open GitHub token page
            </a>
          </div>
        </div>

        {/* Privacy note */}
        <div className="flex items-center gap-2 mt-4 text-center justify-center">
          <Shield size={11} className="text-gray-600" />
          <p className="text-xs text-gray-600">Token stored locally in your browser only</p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import type { Repository } from '../../types/github';
import { formatDistanceToNow } from 'date-fns';

interface RepoCardProps {
  repo: Repository;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const topics = repo.repositoryTopics?.nodes?.slice(0, 3) ?? [];
  const updatedAt = formatDistanceToNow(new Date(repo.updatedAt), { addSuffix: true });

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card block group hover:bg-surface-hover animate-slide-up"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white group-hover:text-brand-400 transition-colors truncate mr-2 text-sm">
          {repo.name}
        </h3>
        <ExternalLink size={14} className="text-gray-600 group-hover:text-brand-400 transition-colors flex-shrink-0 mt-0.5" />
      </div>

      {repo.description && (
        <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {topics.map(({ topic }) => (
            <span
              key={topic.name}
              className="badge bg-brand-500/10 text-brand-400"
            >
              {topic.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-auto">
        {repo.primaryLanguage && (
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span
              className="lang-dot"
              style={{ backgroundColor: repo.primaryLanguage.color || '#8b949e' }}
            />
            {repo.primaryLanguage.name}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Star size={12} />
          {repo.stargazerCount.toLocaleString()}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <GitFork size={12} />
          {repo.forkCount}
        </span>
        <span className="text-xs text-gray-600 ml-auto">{updatedAt}</span>
      </div>
    </a>
  );
};

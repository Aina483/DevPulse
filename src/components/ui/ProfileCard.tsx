import React from 'react';
import {
  MapPin, Link2, Twitter, Building2, Calendar,
  Users, Star, GitPullRequest
} from 'lucide-react';
import type { GitHubUser } from '../../types/github';
import { format } from 'date-fns';

interface ProfileCardProps {
  user: GitHubUser;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const joined = format(new Date(user.createdAt), 'MMM yyyy');

  return (
    <div className="card animate-fade-in">
      {/* Avatar + name */}
      <div className="flex items-start gap-4 mb-5">
        <div className="relative flex-shrink-0">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 rounded-xl border-2 border-surface-border"
          />
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-surface-card" />
        </div>
        <div className="min-w-0">
          <h2 className="font-bold text-white text-lg leading-tight truncate">
            {user.name || user.login}
          </h2>
          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 text-sm hover:underline font-mono"
          >
            @{user.login}
          </a>
          {user.bio && (
            <p className="text-gray-500 text-xs mt-1.5 leading-relaxed line-clamp-2">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-3 gap-2 mb-5 p-3 bg-surface-DEFAULT rounded-lg">
        <div className="text-center">
          <p className="text-white font-bold font-mono text-base">{user.followers.totalCount.toLocaleString()}</p>
          <p className="text-gray-600 text-xs">Followers</p>
        </div>
        <div className="text-center border-x border-surface-border">
          <p className="text-white font-bold font-mono text-base">{user.following.totalCount.toLocaleString()}</p>
          <p className="text-gray-600 text-xs">Following</p>
        </div>
        <div className="text-center">
          <p className="text-white font-bold font-mono text-base">{user.repositories.totalCount}</p>
          <p className="text-gray-600 text-xs">Repos</p>
        </div>
      </div>

      {/* Meta info */}
      <div className="space-y-2">
        {user.company && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Building2 size={13} className="text-gray-600 flex-shrink-0" />
            <span className="truncate">{user.company}</span>
          </div>
        )}
        {user.location && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin size={13} className="text-gray-600 flex-shrink-0" />
            <span>{user.location}</span>
          </div>
        )}
        {user.websiteUrl && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link2 size={13} className="text-gray-600 flex-shrink-0" />
            <a
              href={user.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline truncate"
            >
              {user.websiteUrl.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {user.twitterUsername && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Twitter size={13} className="text-gray-600 flex-shrink-0" />
            <a
              href={`https://twitter.com/${user.twitterUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline"
            >
              @{user.twitterUsername}
            </a>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={13} className="text-gray-600 flex-shrink-0" />
          <span>Joined {joined}</span>
        </div>
      </div>

      {/* Activity badges */}
      <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-surface-border">
        <span className="badge bg-yellow-500/10 text-yellow-400">
          <Star size={10} />
          {user.starredRepositories.totalCount} starred
        </span>
        <span className="badge bg-purple-500/10 text-purple-400">
          <GitPullRequest size={10} />
          {user.pullRequests.totalCount} PRs
        </span>
        <span className="badge bg-green-500/10 text-green-400">
          <Users size={10} />
          Active
        </span>
      </div>
    </div>
  );
};

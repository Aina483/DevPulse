import React from 'react';
import {
  GitCommit, GitPullRequest, Star, BookOpen,
  AlertCircle, GitFork, Users
} from 'lucide-react';
import { ProfileCard } from '../components/ui/ProfileCard';
import { StatCard } from '../components/ui/StatCard';
import { RepoCard } from '../components/ui/RepoCard';
import { ContributionHeatmap } from '../components/charts/ContributionHeatmap';
import { LanguageChart } from '../components/charts/LanguageChart';
import { MonthlyChart } from '../components/charts/MonthlyChart';
import { useGitHubProfile, useLanguageStats, useContributionData } from '../hooks/useGitHub';

interface DashboardProps {
  username: string;
}

const SkeletonCard = () => (
  <div className="card animate-pulse">
    <div className="h-4 bg-surface-border rounded w-1/2 mb-3" />
    <div className="h-8 bg-surface-border rounded w-1/3 mb-2" />
    <div className="h-3 bg-surface-border rounded w-1/4" />
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ username }) => {
  const { loading, error, user } = useGitHubProfile(username);
  const languages = useLanguageStats(user);
  const { weeks, monthlyData } = useContributionData(user);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <AlertCircle size={32} className="text-red-500" />
        <p className="text-white font-medium">Failed to load profile</p>
        <p className="text-gray-500 text-sm text-center max-w-sm">
          {error.message.includes('401')
            ? 'Invalid or expired GitHub token. Please check your token.'
            : error.message.includes('NOT_FOUND')
            ? `User "${username}" not found on GitHub.`
            : error.message}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <SkeletonCard />
          </div>
          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const { contributionsCollection } = user;
  const topRepos = [...user.repositories.nodes]
    .sort((a, b) => b.stargazerCount - a.stargazerCount)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <ProfileCard user={user} />
          <LanguageChart languages={languages} />
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              label="Total Commits"
              value={contributionsCollection.totalCommitContributions}
              icon={GitCommit}
              color="#4f6ef7"
            />
            <StatCard
              label="Pull Requests"
              value={user.pullRequests.totalCount}
              icon={GitPullRequest}
              color="#a371f7"
            />
            <StatCard
              label="Stars Earned"
              value={user.repositories.nodes.reduce((s, r) => s + r.stargazerCount, 0)}
              icon={Star}
              color="#e3b341"
            />
            <StatCard
              label="Repositories"
              value={user.repositories.totalCount}
              icon={BookOpen}
              color="#3fb950"
            />
          </div>

          {/* Second row stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              label="Issues Opened"
              value={user.issues.totalCount}
              icon={AlertCircle}
              color="#f85149"
            />
            <StatCard
              label="Total Forks"
              value={user.repositories.nodes.reduce((s, r) => s + r.forkCount, 0)}
              icon={GitFork}
              color="#58a6ff"
            />
            <StatCard
              label="Followers"
              value={user.followers.totalCount}
              icon={Users}
              color="#ec6547"
            />
          </div>

          {/* Heatmap */}
          <ContributionHeatmap
            weeks={weeks}
            total={contributionsCollection.contributionCalendar.totalContributions}
          />

          {/* Monthly chart */}
          <MonthlyChart data={monthlyData} />

          {/* Top repos */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">
              Top Repositories
              <span className="text-gray-600 font-normal ml-2">by stars</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

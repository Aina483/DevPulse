import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE, GET_PINNED_REPOS } from '../lib/queries';
import type { GitHubUser, LanguageStat } from '../types/github';

export function useGitHubProfile(username: string) {
  const { loading, error, data, refetch } = useQuery(GET_USER_PROFILE, {
    variables: { username },
    skip: !username,
  });

  const user: GitHubUser | null = data?.user ?? null;

  return { loading, error, user, refetch };
}

export function usePinnedRepos(username: string) {
  const { loading, error, data } = useQuery(GET_PINNED_REPOS, {
    variables: { username },
    skip: !username,
  });

  return { loading, error, pinnedRepos: data?.user?.pinnedItems?.nodes ?? [] };
}

export function useLanguageStats(user: GitHubUser | null): LanguageStat[] {
  if (!user) return [];

  const langMap = new Map<string, { size: number; color: string }>();

  for (const repo of user.repositories.nodes) {
    if (!repo.languages) continue;
    for (const edge of repo.languages.edges) {
      const existing = langMap.get(edge.node.name);
      if (existing) {
        existing.size += edge.size;
      } else {
        langMap.set(edge.node.name, {
          size: edge.size,
          color: edge.node.color || '#8b949e',
        });
      }
    }
  }

  const total = Array.from(langMap.values()).reduce((sum, l) => sum + l.size, 0);

  return Array.from(langMap.entries())
    .map(([name, { size, color }]) => ({
      name,
      color,
      size,
      percentage: Math.round((size / total) * 1000) / 10,
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 8);
}

export function useContributionData(user: GitHubUser | null) {
  if (!user) return { weeks: [], monthlyData: [] };

  const weeks = user.contributionsCollection.contributionCalendar.weeks;

  // Build monthly aggregated data for bar chart
  const monthlyMap = new Map<string, number>();
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      const month = day.date.substring(0, 7); // "2024-01"
      monthlyMap.set(month, (monthlyMap.get(month) ?? 0) + day.contributionCount);
    }
  }

  const monthlyData = Array.from(monthlyMap.entries())
    .slice(-12)
    .map(([month, count]) => ({
      name: new Date(month + '-01').toLocaleString('default', { month: 'short' }),
      contributions: count,
    }));

  return { weeks, monthlyData };
}

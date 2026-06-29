export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatarUrl: string;
  location: string;
  company: string;
  websiteUrl: string;
  twitterUsername: string;
  email: string;
  createdAt: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: {
    totalCount: number;
    nodes: Repository[];
  };
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalIssueContributions: number;
    totalRepositoryContributions: number;
    contributionCalendar: ContributionCalendar;
  };
  starredRepositories: { totalCount: number };
  pullRequests: { totalCount: number };
  issues: { totalCount: number };
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  isPrivate: boolean;
  updatedAt: string;
  primaryLanguage: Language | null;
  languages: {
    totalSize: number;
    edges: Array<{ size: number; node: Language }>;
  };
  repositoryTopics: {
    nodes: Array<{ topic: { name: string } }>;
  };
}

export interface Language {
  name: string;
  color: string;
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

export interface LanguageStat {
  name: string;
  color: string;
  size: number;
  percentage: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

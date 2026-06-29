import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUserProfile($username: String!) {
    user(login: $username) {
      login
      name
      bio
      avatarUrl
      location
      company
      websiteUrl
      twitterUsername
      email
      createdAt
      followers {
        totalCount
      }
      following {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      pullRequests(states: [MERGED, OPEN]) {
        totalCount
      }
      issues(states: [OPEN, CLOSED]) {
        totalCount
      }
      repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER) {
        totalCount
        nodes {
          id
          name
          description
          url
          stargazerCount
          forkCount
          isPrivate
          updatedAt
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            totalSize
            edges {
              size
              node {
                name
                color
              }
            }
          }
          repositoryTopics(first: 5) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

export const GET_PINNED_REPOS = gql`
  query GetPinnedRepos($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

# ⚡ DevPulse — GitHub Analytics Dashboard

> A real-time GitHub developer analytics dashboard powered by **React**, **TypeScript**, and the **GitHub GraphQL API v4** via **Apollo Client**.

![DevPulse Preview](https://via.placeholder.com/1200x600/0d1117/4f6ef7?text=DevPulse+Dashboard)

## 🚀 Live Demo

[**View Live →**](https://devpulse-github.vercel.app) *(deploy your own below)*

---

## ✨ Features

- **GraphQL-powered** — Single query fetches profile, repos, and contributions (replaces 5+ REST calls)
- **Contribution Heatmap** — 52-week activity grid with hover tooltips
- **Language Breakdown** — Donut chart + progress bars across all public repos
- **Monthly Contributions** — Bar chart of last 12 months activity
- **Top Repositories** — Sorted by stars with language, topics, and metadata
- **Profile Overview** — Avatar, bio, follower stats, social links
- **Live Search** — Look up any GitHub user's public stats
- **Apollo InMemoryCache** — Cached queries, no redundant network calls
- **Dark theme** — GitHub-inspired dark UI with smooth animations

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + TypeScript |
| GraphQL Client | Apollo Client 3 |
| API | GitHub GraphQL API v4 |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Date utils | date-fns |
| Icons | Lucide React |
| Build | Vite |
| Deploy | Vercel |

---

## 📁 Project Structure

```
devpulse/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ProfileCard.tsx     # User profile sidebar
│   │   │   ├── RepoCard.tsx        # Individual repo card
│   │   │   └── StatCard.tsx        # Metric stat card
│   │   ├── charts/
│   │   │   ├── ContributionHeatmap.tsx  # 52-week heatmap
│   │   │   ├── LanguageChart.tsx        # Donut + bar chart
│   │   │   └── MonthlyChart.tsx         # Bar chart
│   │   └── layout/
│   │       └── Navbar.tsx          # Top nav with search
│   ├── hooks/
│   │   └── useGitHub.ts            # Custom Apollo hooks
│   ├── lib/
│   │   ├── apollo.ts               # Apollo Client setup
│   │   └── queries.ts              # GraphQL query definitions
│   ├── pages/
│   │   ├── Dashboard.tsx           # Main dashboard page
│   │   └── TokenSetup.tsx          # Token onboarding page
│   ├── types/
│   │   └── github.ts               # TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/devpulse.git
cd devpulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get a GitHub Personal Access Token

1. Go to [GitHub → Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens/new?scopes=read:user,repo&description=DevPulse)
2. Select scopes: `read:user`, `repo`
3. Generate and copy the token

### 4. Run the dev server

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) and enter your GitHub token in the setup screen.

---

## 🌐 Deploy to Vercel

```bash
npm run build
```

Then push to GitHub and connect to [Vercel](https://vercel.com) — zero config needed.

---

## 🔍 GraphQL in Action

This project uses a **single GraphQL query** to replace multiple REST calls:

```graphql
query GetUserProfile($username: String!) {
  user(login: $username) {
    name
    bio
    avatarUrl
    followers { totalCount }
    repositories(first: 100, privacy: PUBLIC) {
      nodes {
        name
        stargazerCount
        languages(first: 10) {
          edges { size node { name color } }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      contributionCalendar {
        weeks {
          contributionDays { contributionCount date color }
        }
      }
    }
  }
}
```

**Apollo Client benefits used:**
- `InMemoryCache` — avoids re-fetching on re-renders
- `cache-and-network` fetch policy — stale-while-revalidate pattern
- `setContext` auth link — token injected per-request
- `skip` option — query skipped until username is set

---

## 🤝 Contributing

PRs welcome! Open an issue first for major changes.

---

## 📄 License

MIT — built by [Aina Khanna](https://github.com/Aina483)

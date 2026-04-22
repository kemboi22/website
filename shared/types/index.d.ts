export type GitHubPackageType = "npm" | "maven" | "rubygems" | "docker";

export interface GitHubPackage {
  id: number;
  name: string;
  package_type: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  metadata?: {
    container?: {
      tags: string[];
    };
    package_version?: {
      id: number;
      name: string;
      created_at: string;
      html_url: string;
    }[];
  };
}

export interface GitHubPackageVersion {
  id: number;
  name: string; // version
  created_at: string;
  updated_at: string;
  html_url: string;
  download_count: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
}

export interface UserRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  languageColor: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  html_url: string;
}

export interface UserPullRequest {
  id: number;
  title: string;
  repo: string;
  number: number;
  status: "open" | "merged" | "closed";
  date: string; // This will be formatted on the frontend
  description: string | null;
  labels: string[];
  additions: number;
  deletions: number;
  files: number;
  url: string;
}

export interface UserStats {
  repositories: number;
  contributions: number;
  pullRequests: number;
  starsEarned: number;
}

export interface GitHubReleaseAsset {
  name: string;
  download_count: number;
}

export interface GitHubRelease {
  id: number;
  name: string | null;
  tag_name: string;
  published_at: string;
  assets: GitHubReleaseAsset[];
}

export interface GitHubOrgStats {
  repos: number;
  totalPRs: number;
  totalIssuesClosed: number;
  totalReleases: number;
}

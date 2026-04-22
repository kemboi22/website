import {
  GitHubPackage,
  GitHubPackageVersion,
  GitHubRelease,
  GitHubRepo,
  UserRepo,
} from "#shared/types";

const API_URL = "https://api.github.com";

const TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME; // Added for user-specific data

const request = async <T>(path: string): Promise<T> => {
  const res = await $fetch<T>(`${API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });
  return res as Promise<T>;
};

export const github = {
  org: {
    packages: (packageType: string = "container") => {
      return request<GitHubPackage[]>(`/orgs/geniusdynamics/packages?package_type=${packageType}&per_page=100`);
    },
    repos: () => {
      return request<GitHubRepo[]>(`/orgs/geniusdynamics/repos?per_page=100`);
    },
  },
  package: {
    versions: (name: string, packageType: string = "container") => {
      return request<GitHubPackageVersion[]>(
        `/orgs/geniusdynamics/packages/${packageType}/${name}/versions`
      );
    },
    get: (name: string, packageType: string = "container") => {
      return request<GitHubPackage>(
        `/orgs/geniusdynamics/packages/${packageType}/${name}`
      );
    },
  },
  repo: {
    releases: (repo: string) => {
      return request<GitHubRelease[]>(`/repos/geniusdynamics/${repo}/releases`);
    },
  },
  user: {
    repos: () => {
      if (!GITHUB_USERNAME) {
        throw new Error("GITHUB_USERNAME is not defined in environment variables.");
      }
      return request<UserRepo[]>(`/users/${GITHUB_USERNAME}/repos?per_page=100`);
    },
  },
};

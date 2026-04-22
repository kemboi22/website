import { github } from "../utils/github";
import type { GitHubPackage, GitHubPackageVersion } from "#shared/types";

export const packagesHandler = defineCachedEventHandler(
  async (event) => {
    const packageType = (getQuery(event).package_type as string) || "container";

    const packages = await github.org.packages(packageType);
    const packagesWithDownloads = await Promise.all(
      packages.map(async (pkg) => {
        try {
          const versions = await github.package.versions(pkg.name, packageType);
          const downloads = versions.reduce((sum, v) => sum + (v.download_count || 0), 0);
          return { ...pkg, package_type: packageType, downloads };
        } catch {
          return { ...pkg, package_type: packageType, downloads: 0 };
        }
      }),
    );
    return packagesWithDownloads;
  },
  {
    maxAge: 60 * 60 * 24,
  },
);

export const packageDetailHandler = defineCachedEventHandler(
  async (event) => {
    const name = getRouterParam(event, "name");
    const packageType = (getQuery(event).package_type as string) || "container";

    if (!name) {
      return { error: "Package name is required" };
    }

    try {
      const pkg = await github.package.get(name, packageType);
      const versions = await github.package.versions(name, packageType);
      const downloads = versions.reduce((sum, v) => sum + (v.download_count || 0), 0);

      return {
        ...pkg,
        downloads,
        versions,
      };
    } catch (err: any) {
      return {
        error: true,
        message: err?.data?.message || "Failed to fetch package",
      };
    }
  },
  {
    maxAge: 60 * 60 * 24,
  },
);

export const packageVersionsHandler = defineCachedEventHandler(
  async (event) => {
    const name = getRouterParam(event, "name");
    const packageType = (getQuery(event).package_type as string) || "container";

    if (!name) {
      return;
    }

    try {
      const versions = await github.package.versions(name, packageType);
      return {
        name,
        package_type: packageType,
        versions,
      };
    } catch (err: any) {
      return {
        error: true,
        message: err?.data?.message || "Failed to fetch versions",
      };
    }
  },
  {
    maxAge: 60 * 60 * 24,
  },
);

export const orgReposHandler = defineCachedEventHandler(
  async (event) => {
    return await github.org.repos();
  },
  {
    maxAge: 60 * 60 * 24,
  },
);

export const repoReleasesHandler = defineCachedEventHandler(async (event) => {
  const repo = getRouterParam(event, "repo");
  if (!repo) {
    return;
  }
  return await github.repo.releases(repo);
});

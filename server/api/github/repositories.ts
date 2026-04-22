import { defineCachedEventHandler } from "#imports";
import { github } from "../../utils/github";
import { UserRepo } from "#shared/types";

export default defineCachedEventHandler(
  async (event): Promise<UserRepo[]> => {
    const userRepos = await github.user.repos();

    // Filter out forks and sort by stars for "popular" repositories
    const popularRepos = userRepos
      .filter((repo: any) => !repo.fork)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4); // Get top 4 popular repos

    return popularRepos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      languageColor: "#cccccc", // Placeholder, ideally would map language to color
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      topics: repo.topics,
      html_url: repo.html_url,
    }));
  },
  {
    maxAge: 60 * 60, // Cache for 1 hour
    name: "user-popular-repos",
    getKey: () => "user-popular-repos",
  },
);

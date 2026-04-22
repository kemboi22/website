import { defineCachedEventHandler } from "#imports";
import { github } from "../../utils/github";
import { UserStats } from "#shared/types";

export default defineCachedEventHandler(
  async (event): Promise<UserStats> => {
    const repos = await github.user.repos();

    let starsEarned = 0;
    for (const repo of repos) {
      starsEarned += repo.stargazers_count;
    }

    // Placeholder values for contributions and pullRequests due to API limitations
    // A more accurate solution would involve GitHub GraphQL API or parsing user events.
    return {
      repositories: repos.length,
      contributions: 0, // Placeholder
      pullRequests: 0, // Placeholder
      starsEarned: starsEarned,
    };
  },
  {
    maxAge: 60 * 60, // Cache for 1 hour
    name: "user-stats",
    getKey: () => "user-stats",
  },
);

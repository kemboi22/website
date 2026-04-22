import { defineCachedEventHandler } from "#imports";
import { UserPullRequest } from "#shared/types";

export default defineCachedEventHandler(
  async (event): Promise<UserPullRequest[]> => {
    // Due to the complexity of fetching detailed user-specific pull requests
    // with additions/deletions/files via the standard GitHub REST API without
    // hitting rate limits or making multiple requests per PR, this endpoint
    // will initially return an empty array.
    // A more robust solution would involve using the GitHub GraphQL API or
    // a dedicated GitHub API client that can aggregate this information
    // efficiently.
    return [];
  },
  {
    maxAge: 60 * 5, // Cache for 5 minutes
    name: "user-pull-requests",
    getKey: () => "user-pull-requests",
  },
);

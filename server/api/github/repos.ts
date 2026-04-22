import { defineCachedEventHandler } from "#imports";
import { github } from "../../utils/github";
import { UserRepo } from "#shared/types";

export default defineCachedEventHandler(
  async (event): Promise<UserRepo[]> => {
    return await github.user.repos();
  },
  {
    maxAge: 60 * 60, // Cache for 1 hour
    name: "user-repos",
    getKey: () => "user-repos",
  },
);

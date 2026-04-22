import { defineEventHandler, getRouterParam, getQuery } from "h3";
import { github } from "../../../utils/github";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");
  const packageType = getQuery(event).package_type as string || "container";
  
  if (!name) {
    return { error: "Package name is required", versions: [] };
  }
  
  try {
    const versions = await github.package.versions(name, packageType);
    return {
      name,
      package_type: packageType,
      versions: versions || [],
    };
  } catch (err: any) {
    return {
      error: true,
      message: err?.data?.message || "Failed to fetch versions",
      versions: [],
    };
  }
});
import { defineEventHandler } from "h3";
import { packagesHandler } from "~~/server/handlers/github_cache";

export default defineEventHandler(packagesHandler);


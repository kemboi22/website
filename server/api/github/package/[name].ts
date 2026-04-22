import { defineEventHandler } from "h3";
import { packageDetailHandler } from "../../../handlers/github_cache";

export default defineEventHandler(packageDetailHandler);
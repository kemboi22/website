<script setup lang="ts">
import type { UserStats, UserPullRequest, UserRepo, GitHubPackage, GitHubPackageVersion } from "#shared/types";

type PackageDetail = {
  id: number;
  name: string;
  package_type: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  metadata?: {
    package_version?: {
      id: number;
      name: string;
      created_at: string;
      html_url: string;
    }[];
  };
};

const GITHUB_USERNAME = "kemboi22";
const profileLink = computed(() => `https://github.com/${GITHUB_USERNAME}`);

const { data: stats, pending: statsPending, error: statsError } = useFetch<UserStats>("/api/github/stats");
const { data: pullRequests, pending: pullRequestsPending, error: pullRequestsError } = useFetch<UserPullRequest[]>("/api/github/pull-requests");
const { data: repositories, pending: repositoriesPending, error: repositoriesError } = useFetch<UserRepo[]>("/api/github/repositories");
const { data: packages, pending: packagesPending, error: packagesError } = useFetch<GitHubPackage[]>("/api/github/packages");

const showModal = ref(false);
const selectedPkg = ref<GitHubPackage | null>(null);
const packageVersions = ref<GitHubPackageVersion[]>([]);
const versionsLoading = ref(false);

const openPackage = async (pkg: GitHubPackage) => {
  selectedPkg.value = pkg;
  showModal.value = true;
  versionsLoading.value = true;
  packageVersions.value = [];
  
  try {
    const res = await $fetch<PackageDetail>(`/api/github/package-versions/${pkg.name}`, {
      query: { package_type: pkg.package_type }
    });
    packageVersions.value = res.versions || [];
  } catch {
    packageVersions.value = [];
  } finally {
    versionsLoading.value = false;
  }
};

const closeModal = () => {
  showModal.value = false;
  selectedPkg.value = null;
  packageVersions.value = [];
};

const formattedStats = computed(() => {
  if (!stats.value) return [];
  return [
    { label: "Repositories", value: stats.value.repositories },
    { label: "Stars Earned", value: stats.value.starsEarned },
    { label: "Contributions", value: stats.value.contributions },
    { label: "Pull Requests", value: stats.value.pullRequests },
  ];
});

useHead({
  title: `GitHub Activity - ${GITHUB_USERNAME}`,
  meta: [
    { name: "description", content: `GitHub activity for ${GITHUB_USERNAME}` }
  ]
});
</script>

<template>
  <div class="pt-16">
    <!-- Hero Section -->
    <section class="min-h-[50vh] flex items-center justify-center px-4 md:px-6 border-b border-border">
      <div class="container mx-auto max-w-6xl">
        <div class="space-y-6">
          <span class="text-xs font-mono uppercase tracking-widest text-muted-foreground">Open Source</span>
          <h1 class="text-4xl md:text-7xl font-serif font-bold tracking-tight">GitHub Activity</h1>
          <p class="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            My contributions to open source, personal projects, and collaborative development.
          </p>
          <a :href="profileLink" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all">
            View Full Profile
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 px-4 md:px-6 border-b border-border">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <template v-if="statsPending">
            <div v-for="i in 4" :key="i" class="text-center space-y-2 p-4 md:p-6 border border-border animate-pulse">
              <div class="h-8 md:h-10 bg-muted rounded w-3/4 mx-auto"></div>
              <div class="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          </template>
          <template v-else-if="statsError">
            <div class="col-span-full text-center text-destructive-foreground p-4 bg-destructive rounded">Error loading stats.</div>
          </template>
          <template v-else>
            <div v-for="stat in formattedStats" :key="stat.label" class="text-center space-y-2 p-4 md:p-6 border border-border hover:border-foreground transition-colors">
              <div class="text-3xl md:text-4xl font-serif font-bold">{{ stat.value.toLocaleString() }}</div>
              <div class="text-xs font-mono uppercase tracking-widest text-muted-foreground">{{ stat.label }}</div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Packages -->
    <section class="py-12 px-4 md:px-6 border-b border-border">
      <div class="container mx-auto max-w-6xl space-y-6">
        <h2 class="text-2xl font-serif font-bold">Packages</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <template v-if="packagesPending">
            <div v-for="i in 4" :key="i" class="text-center space-y-2 p-4 md:p-6 border border-border animate-pulse">
              <div class="h-8 bg-muted rounded w-3/4 mx-auto"></div>
              <div class="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
          </template>
          <template v-else-if="packagesError">
            <div class="col-span-full text-center text-destructive-foreground p-4 bg-destructive rounded">Error loading packages.</div>
          </template>
          <template v-else-if="!packages?.length">
            <p class="col-span-full text-center text-muted-foreground">No packages found.</p>
          </template>
          <template v-else>
            <button
              v-for="pkg in packages"
              :key="pkg.id"
              @click="openPackage(pkg)"
              class="text-center space-y-3 p-4 md:p-6 border border-border hover:border-foreground hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div class="flex justify-center">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div class="font-bold text-sm md:text-base truncate">{{ pkg.name }}</div>
              <div class="text-xs font-mono uppercase tracking-widest text-muted-foreground">{{ pkg.package_type }}</div>
              <div class="text-xs text-muted-foreground">
                <span v-if="pkg.downloads > 0">{{ pkg.downloads.toLocaleString() }} downloads</span>
                <span v-else>View versions</span>
              </div>
            </button>
          </template>
        </div>
      </div>
    </section>

    <!-- Package Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-background/90 backdrop-blur-sm" @click="closeModal"></div>
          <div class="relative bg-background border border-border w-full max-w-lg md:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <!-- Header -->
            <div class="flex items-start justify-between p-4 md:p-6 border-b border-border">
              <div>
                <h3 class="text-xl md:text-2xl font-serif font-bold">{{ selectedPkg?.name }}</h3>
                <div class="flex flex-wrap items-center gap-2 mt-2 text-xs md:text-sm text-muted-foreground">
                  <span class="font-mono uppercase px-2 py-1 border border-border">{{ selectedPkg?.package_type }}</span>
                  <span>{{ selectedPkg?.visibility }}</span>
                  <span v-if="selectedPkg?.updated_at">Updated {{ new Date(selectedPkg.updated_at).toLocaleDateString() }}</span>
                </div>
              </div>
              <button @click="closeModal" class="p-2 hover:bg-muted transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Versions List -->
            <div class="flex-1 overflow-y-auto p-4 md:p-6">
              <h4 class="text-lg font-bold mb-4">Versions</h4>
              
              <template v-if="versionsLoading">
                <div class="space-y-3">
                  <div v-for="i in 3" :key="i" class="h-20 bg-muted rounded animate-pulse"></div>
                </div>
              </template>
              
              <template v-else-if="!packageVersions.length">
                <p class="text-center text-muted-foreground py-8">No versions found.</p>
              </template>
              
              <template v-else>
                <div class="space-y-3">
                  <a
                    v-for="(version, index) in packageVersions"
                    :key="version.id"
                    :href="version.html_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-between p-3 md:p-4 border border-border hover:border-foreground hover:bg-muted/50 transition-all group"
                  >
                    <div class="flex items-center gap-3">
                      <span class="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-mono">{{ index + 1 }}</span>
                      <div>
                        <div class="font-mono font-bold text-sm md:text-base">{{ version.name }}</div>
                        <div class="text-xs text-muted-foreground">{{ new Date(version.created_at).toLocaleDateString() }}</div>
                      </div>
                    </div>
                    <svg class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </template>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Pull Requests -->
    <section class="py-16 md:py-24 px-4 md:px-6">
      <div class="container mx-auto max-w-6xl space-y-8 md:space-y-12">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl md:text-3xl font-serif font-bold">Recent Pull Requests</h2>
          <span class="text-xs font-mono uppercase tracking-widest text-muted-foreground hidden md:block">Last 30 Days</span>
        </div>

        <template v-if="pullRequestsPending">
          <div v-for="i in 3" :key="i" class="border border-border p-4 md:p-6 animate-pulse">
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-muted rounded-full"></div>
              <div class="flex-1 space-y-3">
                <div class="h-6 bg-muted rounded w-3/4"></div>
                <div class="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="pullRequestsError">
          <div class="text-center text-destructive-foreground p-4 bg-destructive rounded">Error loading pull requests.</div>
        </template>
        <template v-else-if="!pullRequests?.length">
          <p class="text-center text-muted-foreground">No recent pull requests found.</p>
        </template>
        <template v-else>
          <div class="space-y-4">
            <div v-for="pr in pullRequests" :key="pr.id" class="border border-border hover:border-foreground p-4 md:p-6 transition-all">
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 border border-border flex items-center justify-center flex-shrink-0" :class="pr.status === 'merged' ? 'bg-foreground text-background' : ''">
                  <svg v-if="pr.status === 'merged'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <a :href="pr.url" target="_blank" rel="noopener noreferrer" class="block text-lg font-bold hover:text-muted-foreground transition-colors truncate">{{ pr.title }}</a>
                  <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{{ pr.repo }}</span><span>#{{ pr.number }}</span><span>{{ pr.date }}</span>
                  </div>
                  <p class="text-sm text-muted-foreground mt-2 line-clamp-2">{{ pr.description }}</p>
                  <div class="flex flex-wrap gap-2 mt-3">
                    <span v-for="label in pr.labels" :key="label" class="px-2 py-1 text-xs border border-border font-mono">{{ label }}</span>
                  </div>
                </div>
                <div class="text-right flex-shrink-0 hidden md:block">
                  <div class="text-sm font-mono"><span class="text-green-600">+{{ pr.additions }}</span><span class="mx-1">/</span><span class="text-red-600">-{{ pr.deletions }}</span></div>
                  <div class="text-xs text-muted-foreground">{{ pr.files }} files</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Popular Repositories -->
    <section class="py-16 md:py-24 px-4 md:px-6 border-t border-border">
      <div class="container mx-auto max-w-6xl space-y-8 md:space-y-12">
        <h2 class="text-2xl md:text-3xl font-serif font-bold">Popular Repositories</h2>

        <template v-if="repositoriesPending">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div v-for="i in 2" :key="i" class="border border-border p-4 md:p-6 space-y-4 animate-pulse">
              <div class="h-6 bg-muted rounded w-3/4"></div>
              <div class="h-4 bg-muted rounded w-full"></div>
            </div>
          </div>
        </template>
        <template v-else-if="repositoriesError">
          <div class="text-center text-destructive-foreground p-4 bg-destructive rounded">Error loading repositories.</div>
        </template>
        <template v-else-if="!repositories?.length">
          <p class="text-center text-muted-foreground">No popular repositories found.</p>
        </template>
        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <a v-for="repo in repositories" :key="repo.name" :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="border border-border hover:border-foreground p-4 md:p-6 space-y-4 transition-all">
              <h3 class="text-lg font-bold group-hover:text-muted-foreground transition-colors">{{ repo.name }}</h3>
              <p class="text-sm text-muted-foreground line-clamp-2">{{ repo.description }}</p>
              <div class="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: repo.languageColor || '#cccccc' }"></div>
                  <span>{{ repo.language }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                  <span>{{ repo.stargazers_count }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  <span>{{ repo.forks_count }}</span>
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="topic in repo.topics" :key="topic" class="px-2 py-1 text-xs border border-border font-mono">{{ topic }}</span>
              </div>
            </a>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
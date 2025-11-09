FROM node:lts

# Install build tools for native modules
RUN apt-get update && apt-get install -y python3 make g++ build-essential libsqlite3-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies (ensure postinstall scripts run)
RUN pnpm install --prefer-offline --frozen-lockfile --ignore-scripts=false

# Copy source code
COPY . .

# Rebuild native module for this environment
RUN pnpm rebuild better-sqlite3

# Generate static site
RUN pnpm run generate

EXPOSE 3000
CMD ["pnpm", "dlx", "serve", ".output/public"]

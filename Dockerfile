FROM node:lts-alpine

# Install pnpm
RUN npm install -g pnpm

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ sqlite-dev

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Generate static site
RUN pnpm run generate

# Expose port 3000
EXPOSE 3000

# Start preview server
CMD ["pnpm", "dlx", "serve", ".output/public"]

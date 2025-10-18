FROM node:lts-alpine

# Install pnpm
RUN npm install -g pnpm

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

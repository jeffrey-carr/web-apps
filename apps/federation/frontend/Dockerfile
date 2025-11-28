# apps/federation/frontend/Dockerfile

# Build stage
FROM node:22-alpine AS build

ARG APP
ENV NODE_ENV=production
WORKDIR /app

# Copy the whole monorepo so shared packages & configs are available
COPY . .

# Work inside this app's frontend
WORKDIR /app/apps/${APP}/frontend

# Install deps (app-local package.json, lockfiles, etc.)
RUN \
  if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
  elif [ -f bun.lockb ]; then npm install -g bun && bun install; \
  elif [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi

# Build SvelteKit (adapter-node)
RUN npm run build

# Runtime stage
FROM node:22-alpine AS runtime

ARG APP
ENV NODE_ENV=production
WORKDIR /app

# Copy built app from build stage
COPY --from=build /app/apps/${APP}/frontend/build ./build
COPY --from=build /app/apps/${APP}/frontend/package.json ./

# Install runtime-only deps
RUN \
  if [ -f package-lock.json ]; then npm ci --omit=dev; \
  else npm install --omit=dev; \
  fi

EXPOSE 3000

CMD ["node", "build"]

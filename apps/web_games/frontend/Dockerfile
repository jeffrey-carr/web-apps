# Build stage
FROM node:22-alpine AS build

ARG APP
WORKDIR /app

# Copy the whole monorepo
COPY . .

# Work inside this app's frontend
WORKDIR /app/apps/${APP}/frontend

# Install deps INCLUDING devDeps (no NODE_ENV=production here)
RUN \
  if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
  elif [ -f bun.lockb ]; then npm install -g bun && bun install; \
  elif [ -f package-lock.json ]; then npm ci --include=dev; \
  else npm install --include=dev; \
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
# If you have a lockfile for the app, copy it too:
# COPY --from=build /app/apps/${APP}/frontend/package-lock.json ./ 

# Install ONLY runtime deps
RUN \
  if [ -f package-lock.json ]; then npm ci --omit=dev; \
  else npm install --omit=dev; \
  fi

# Create symlinks to resolve static asset path resolution in split chunks under Vite 8
RUN mkdir -p /app/build/server/chunks && \
    ln -sf /app/build/client /app/build/server/chunks/client && \
    ln -sf /app/build/prerendered /app/build/server/chunks/prerendered

EXPOSE 3000

CMD ["node", "build"]

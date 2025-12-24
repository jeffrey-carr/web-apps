# Build stage
FROM node:22-slim AS build

ARG APP
WORKDIR /app

# Copy the whole monorepo
COPY . .

# Work inside this app's frontend
WORKDIR /app/apps/${APP}/frontend

# --- 🔴 THE FIX IS HERE ---
# We DELETE the lockfiles to force npm to resolve dependencies for Linux.
# This fixes the "Cannot find module @rollup/rollup-linux-x64-gnu" error.
RUN rm -rf node_modules package-lock.json pnpm-lock.yaml bun.lockb && \
    npm install --include=dev

# Build SvelteKit
RUN npm run build

# Runtime stage
FROM node:22-slim AS runtime

ARG APP
ENV NODE_ENV=production
WORKDIR /app

# Copy built app from build stage
COPY --from=build /app/apps/${APP}/frontend/build ./build
COPY --from=build /app/apps/${APP}/frontend/package.json ./

# Install ONLY runtime deps
# We can use 'npm install' safely here since we aren't building anymore
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "build"]
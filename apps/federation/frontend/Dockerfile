# Build stage
FROM node:22-slim AS build

ARG APP
WORKDIR /app

# 1. Copy the entire monorepo
COPY . .

# 2. NUCLEAR OPTION: Delete ALL lockfiles to force fresh Linux resolution
# We delete the root lockfile AND any sub-project lockfiles.
RUN find . -name "package-lock.json" -delete && \
    find . -name "pnpm-lock.yaml" -delete && \
    find . -name "bun.lockb" -delete

# 3. ROOT INSTALL: Install dependencies for the whole workspace
# This ensures shared 'packages/' are linked and Linux binaries are downloaded.
RUN npm install

# 4. BUILD: Run the build command for the specific workspace
# We use -w to tell npm which app to build from the root context.
RUN npm run build -w apps/${APP}/frontend

# Runtime stage
FROM node:22-slim AS runtime

ARG APP
ENV NODE_ENV=production
WORKDIR /app

# Copy the built output from the specific app location
COPY --from=build /app/apps/${APP}/frontend/build ./build
COPY --from=build /app/apps/${APP}/frontend/package.json ./

# Install runtime dependencies
# We treat the output as a standalone app now
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "build"]
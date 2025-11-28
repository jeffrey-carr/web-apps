# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Install deps
COPY package.json package-lock.json* pnpm-lock.yaml* bun.lockb* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
  elif [ -f bun.lockb ]; then npm install -g bun && bun install; \
  elif [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi

# Copy source
COPY . .

# Build SvelteKit (must be adapter-node)
RUN npm run build

# Runtime stage
FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Copy built app + runtime deps
COPY --from=build /app/build ./build
COPY package.json package-lock.json* pnpm-lock.yaml* bun.lockb* ./

RUN \
  if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --prod; \
  elif [ -f bun.lockb ]; then npm install -g bun && bun install --production; \
  elif [ -f package-lock.json ]; then npm ci --omit=dev; \
  else npm install --omit=dev; \
  fi

CMD ["node", "build"]

# apps/federation/backend/Dockerfile
FROM golang:1.25-alpine AS build

# Which app are we building (e.g. federation, games, etc.)
ARG APP
ENV APP=${APP}

WORKDIR /app

# Copy the whole monorepo so go.work and shared packages are available
COPY . .

# Move into this app's backend module
WORKDIR /app/apps/${APP}/backend/src

# Download Go deps (uses go.mod + go.work + packages/go-common)
RUN go mod download

# Build the binary
RUN go build -o /app/server .

# --- Runtime image ---
FROM alpine:3.20

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=build /app/server ./server

ENV PORT=9999
EXPOSE 9999

CMD ["./server"]

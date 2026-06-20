# apps/recipe_book/backend/Dockerfile
FROM golang:1.25-alpine AS build

# Which app are we building (e.g. federation, recipe_book, etc.)
ARG APP
ENV APP=${APP}

WORKDIR /app

# Copy the whole monorepo so go.work and shared packages are available
COPY . .

# Move into this app's backend module
# For recipe_book, the go.mod is directly in the backend directory
WORKDIR /app/apps/${APP}/backend

# Download Go deps (uses go.mod + go.work + packages/go-common)
RUN go mod download

# Build the binary
RUN go build -o /app/server .

# --- Runtime image ---
FROM alpine:3.20

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=build /app/server ./server

ENV PORT=8080
EXPOSE 8080

CMD ["./server"]

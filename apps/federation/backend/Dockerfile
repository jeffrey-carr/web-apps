# apps/federation/backend/Dockerfile
FROM golang:1.25-alpine AS build

WORKDIR /app/src

# Copy entire module (including go.mod, go.sum, vendor, etc.)
COPY src/ .

# Build the binary using vendored deps
RUN go build -mod=vendor -o server .

# --- Runtime image ---
FROM alpine:3.20

RUN apk add --no-cache ca-certificates

WORKDIR /app

# Copy the binary from the build stage
COPY --from=build /app/src/server ./server

ENV PORT=9999
EXPOSE 9999

CMD ["./server"]

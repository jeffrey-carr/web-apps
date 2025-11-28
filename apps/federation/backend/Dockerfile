# apps/federation/backend/Dockerfile
FROM golang:1.25-alpine AS build

WORKDIR /app

# Copy module files
COPY src/go.mod src/go.sum ./src/

WORKDIR /app/src

# Download deps
RUN go mod download

# Copy the rest of the source
COPY src/ .

# Build the binary
RUN go build -o server .

# --- Runtime image ---
FROM alpine:3.20

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=build /app/src/server ./server

ENV PORT=9999
EXPOSE 9999

CMD ["./server"]

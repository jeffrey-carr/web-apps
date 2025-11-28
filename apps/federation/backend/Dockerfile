# apps/federation/backend/Dockerfile
FROM golang:1.25-alpine AS build

WORKDIR /app

COPY src/ ./src/

WORKDIR /app/src
RUN go build -mod=vendor -o /app/server

# Copy the rest of the source
COPY src/ .

# Build binary to /app/server
RUN go build -o /app/server .

# --- Runtime image ---
FROM alpine:3.20

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=build /app/server ./server

ENV PORT=9999
EXPOSE 9999

CMD ["./server"]

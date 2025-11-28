FROM golang:1.23-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o server ./src

FROM alpine:3.20

WORKDIR /app

COPY --from=build /app/server ./server

ENV PORT=9999
EXPOSE 9999

CMD ["./server"]

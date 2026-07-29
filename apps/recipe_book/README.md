# About the App

Jean's Recipe Book is a site to honor my late mom, Jean. She had a giant binder of all the recipes she collected over the years. It is the
most verbose app, and the one I try to encourage family and friends to actually use.

## Project Overview

The app is utilizes a Go backend API and a SvelteKit frontend. Everything runs in Docker, allowing you to easily spin up the client, server, and required caching layers like Redis with a single command.

## Technology Stack

### Frontend

- **SvelteKit (Svelte 5)** for a lightning-fast, reactive user interface.
- **Sass** for structured, maintainable styling.
- **Lucide Svelte** for beautiful iconography.
- **Vite** for modern, rapid build tooling.

### Backend

- **Go** for a high-performance REST API.
- **MongoDB** for document-based data persistence (tracking recipes, tags, uploaded files, and favorites).
- **Redis** for efficient rate limiting and caching.
- **Cloudinary** integration for robust image upload and management.
- **Custom Federation SDK** for authentication and authorization middleware.

### Infrastructure

- **Docker & Docker Compose** for streamlined local development and unified production builds.

## 💡 Fun Facts

Here's some AI-generated fun-facts about the app

- The backend utilizes a custom `jhttp` framework alongside `jmongo` and `jredis` service wrappers for streamlined data handling.
- Images aren't just stored locally—they are integrated directly with **Cloudinary** for on-the-fly transformations and optimized delivery!
- The backend employs a robust Redis-backed rate limiter (allowing up to 3000 requests per hour by default) to ensure API stability.
- The frontend consumes shared, internal workspace packages (like `@jeffrey-carr/frontend-common`), taking advantage of the project's larger monorepo structure.

Welcome to my monorepo! Stay as long as you'd like.

# About

This is my playground to play around with web development and try out new things. I thought it would be cool
to come up with a set of unified web apps to create my own little universe on the web... the Jeffiverse.

It started a long time ago with the recipe book. I originally started that project as a way for me to have all my mom's
old collection of recipes preserved forever. When I wanted to start a new project to make some web games, I thought it
would be a good idea to combine the two projects into a monorepo to allow me to share code across the two apps. This also
gave me the opportunity to start to build out my own component library to have a single, unified look across all my apps.
Thus the monorepo was born!

# AI

Almost all code is written by hand. The purpose of this project is to allow me to practice and get better as a developer,
so allowing AI to do most of the heavy lifting would defeat the purpose.

AI is used occasionally to help identify bugs and to provide tips about things I don't know. Sometimes it'll write a little bit
of frontend because I find it extremely tedious sometimes.

# Technology

While each app has its own technology, they share a lot of properties. All apps run within a Docker container to allow
me to easily deploy multiple apps to the same host. For data storage all apps utilize MongoDB. For any caching each app
has the option to spin up a local Redis instance within their Docker environment.

All of the frontends are written in Typescript and SCSS, and use the Sveltekit framework. The backends are _mostly_ written
in Go (and will probably be written in Go going forward, but who knows) with one Java app. I am a Go developer in my day-to-day,
so it's the language I'm the most comfortable with. Plus I find it enjoyable to write.

# Structure

## Packages

The `packages` folder contains all shared code for each app. There is a different package for each language:

- `frontend-common`
- `go-common`
- `java-common`

## Apps

The `apps` folder contains the logic for all my different apps. Within each app's folder, there are a few things

# Recipe Book

# Web Games

# Federation

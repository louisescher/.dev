# louisescher/.dev

This is the monorepo which holds the code and all surrounding tools that make up my personal website, [lou.gg](https://lou.gg).

## Project Structure

This is a monorepo. Within the `packages/` directory, you'll find all of the parts that make up this project:

### `packages/bot/`

This directory contains the code for the Discord bot that powers the status features on my site, like the currently playing song. To find out more, head to [its own README](packages/bot/README.md).

### `packages/dotdev/`

This directory contains the code for the website itself. To find out more, head to [its own README](packages/dotdev/README.md).

### `packages/shared/`

The `shared/` package contains database-related code that is used by the other packages. All it does is re-export drizzle and initialize a database connection.

### `packages/talks/`

This directory holds one Slidev deck per talk, each served under `lou.gg/talks/<id>/`. To find out more, head to [its own README](packages/talks/README.md).

## Deploying

The easiest way of deploying this project is by simply building and running the Dockerfile from the root directory, like this:

```bash
pnpm docker:build && pnpm docker:start
```

`pnpm build` builds the talk decks into `packages/dotdev/public/talks/` before it builds the site, so a deploy needs no extra step for them.

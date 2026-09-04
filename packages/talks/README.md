# packages/talks

Every talk deck, one [Slidev](https://sli.dev) project per folder. The folder name is the URL (`packages/talks/astro-compiler` is served at [lou.gg/talks/astro-compiler](https://lou.gg/talks/astro-compiler/))

## How a deck reaches the site

`pnpm talks:build` reads [`packages/dotdev/src/content/talks.json`](../dotdev/src/content/talks.json) and builds each listed deck into `packages/dotdev/public/talks/<id>/`.

The built decks are ignored by git. Run `pnpm talks:build` after a fresh clone if you want to see them locally.

## Commands

| Command                    | What it does                                                        |
| -------------------------- | ------------------------------------------------------------------- |
| `pnpm talk:dev <id>`       | Starts Slidev for one deck and opens it. Omit the id to list decks. |
| `pnpm talks:build [id...]` | Builds every deck, or only the ones you name.                       |
| `pnpm talk:export <id>`    | Exports a deck to PDF through `slidev export`.                      |
| `pnpm talk:new <id>`       | Scaffolds a deck folder and adds its `talks.json` entry.            |

```sh
pnpm talk:new my-talk --title "My Talk" --event "Some Conf" --location Berlin --year 2026
pnpm install
pnpm talk:dev my-talk
```

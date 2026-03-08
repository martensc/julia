# Julia Martens — Campaign Website

Static campaign website for [juliamartens.com](https://juliamartens.com), built with Gulp, Sass, and BrowserSync and deployed to GitHub Pages.

## Tech Stack
| Tool | Purpose |
|---|---|
| [Gulp 4](https://gulpjs.com) | Task runner |
| [Sass](https://sass-lang.com) (Dart Sass) | CSS pre-processor |
| [BrowserSync](https://browsersync.io) | Local dev server with live reload |
| [gulp-file-include](https://github.com/haoxins/gulp-file-include) | HTML partial includes |
| [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) | CSS vendor prefixes |
| [gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps) | CSS source maps |
| [gulp-concat](https://github.com/gulp-community/gulp-concat) + [gulp-terser](https://github.com/terser/terser) | JS bundling & minification |
| [gulp-gh-pages](https://github.com/shinnn/gulp-gh-pages) | GitHub Pages deployment |
| [Node.js 18](https://nodejs.org) (via nvm) | Runtime |
| [Yarn](https://yarnpkg.com) | Package manager |

## Getting Started

### Prerequisites

- [nvm](https://github.com/nvm-sh/nvm)
- [Yarn](https://yarnpkg.com)

### Install

```bash
nvm use
yarn install
```

## Commands

| Command | Description |
|---|---|
| `yarn start` | Build all assets, start BrowserSync dev server, and watch for changes |
| `yarn build` | One-time build of all assets to `build/` |
| `yarn watch` | Watch for file changes and rebuild (no server) |
| `yarn deploy` | Deploy the `build/` directory to GitHub Pages |

The dev server runs at **http://localhost:3000**.

## Deployment

The site deploys to GitHub Pages via the `gh-pages` branch:

```bash
yarn build
yarn deploy
```

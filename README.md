# GitHub Code Stats

Generate beautiful, customizable GitHub stats cards for your README profile.

## Features

- **Stats Card** - Display your GitHub stats (stars, commits, PRs, issues, rank)
- **Top Languages Card** - Show your most used programming languages
- **Repository Pin Card** - Pin specific repositories
- **Gist Card** - Display GitHub gists

## Tech Stack

- React 19 + TanStack Start (SSR)
- oRPC for type-safe APIs
- Satori for SVG rendering
- Cloudflare Workers for edge deployment
- R2 for caching

## API Usage

### Stats Card

```markdown
![Stats](https://github-code-stats.pages.dev/api/v1?username=YOUR_USERNAME)
```

### Top Languages Card

```markdown
![Languages](https://github-code-stats.pages.dev/api/v1/top-langs?username=YOUR_USERNAME)
```

### Repository Pin Card

```markdown
![Repo](https://github-code-stats.pages.dev/api/v1/pin?username=OWNER&repo=REPO_NAME)
```

### Gist Card

```markdown
![Gist](https://github-code-stats.pages.dev/api/v1/gist?id=GIST_ID)
```

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build
pnpm run build

# Check code
pnpm run check
```

## Project Structure

```
github-code-stats/
├── apps/
│   └── web/         # Fullstack application (React + TanStack Start)
├── packages/
│   ├── api/         # API layer / business logic
│   └── card-renderer/  # SVG card rendering
```

## Deployment

```bash
cd apps/web && pnpm run deploy
```

## Acknowledgments

Inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) by Anurag Hazra.

## License

MIT

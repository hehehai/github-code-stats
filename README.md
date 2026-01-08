# GitHub Code Stats

Generate beautiful, customizable GitHub stats cards for your README profile.

![GitHub Code Stats](https://cdn.actnow.dev/public/screenshot-2026-01-08T06-33-53.jpeg)

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
![Stats](https://github.actnow.dev/api/v1?username=YOUR_USERNAME)
```

### Top Languages Card

```markdown
![Languages](https://github.actnow.dev/api/v1/top-langs?username=YOUR_USERNAME)
```

### Repository Pin Card

```markdown
![Repo](https://github.actnow.dev/api/v1/pin?username=OWNER&repo=REPO_NAME)
```

### Gist Card

```markdown
![Gist](https://github.actnow.dev/api/v1/gist?id=GIST_ID)
```

## Examples

### Stats Card

**Default:**

![Stats](https://github.actnow.dev/api/v1?username=hehehai)

**Themes:**

| Theme | Preview |
|-------|---------|
| dark | ![](https://github.actnow.dev/api/v1?username=hehehai&theme=dark) |
| radical | ![](https://github.actnow.dev/api/v1?username=hehehai&theme=radical) |
| tokyonight | ![](https://github.actnow.dev/api/v1?username=hehehai&theme=tokyonight) |

**Icon Sets:**

| Icon Set | Preview |
|----------|---------|
| default | ![](https://github.actnow.dev/api/v1?username=hehehai&icon_set=default) |
| lucide | ![](https://github.actnow.dev/api/v1?username=hehehai&icon_set=lucide) |
| pixelarticons | ![](https://github.actnow.dev/api/v1?username=hehehai&icon_set=pixelarticons) |

**Options:**

- Hide rank: `hide_rank=true`
- Hide border: `hide_border=true`
- Include all commits: `include_all_commits=true`

### Top Languages Card

**Default:**

![Languages](https://github.actnow.dev/api/v1/top-langs?username=hehehai)

**Layouts:**

| Layout | Preview |
|--------|---------|
| compact | ![](https://github.actnow.dev/api/v1/top-langs?username=hehehai&layout=compact) |
| normal | ![](https://github.actnow.dev/api/v1/top-langs?username=hehehai&layout=normal) |
| pie | ![](https://github.actnow.dev/api/v1/top-langs?username=hehehai&layout=pie) |
| donut | ![](https://github.actnow.dev/api/v1/top-langs?username=hehehai&layout=donut) |

**Options:**

- Number of languages: `langs_count=8`
- Hide languages: `hide=html,css`

### Repository Pin Card

**Default:**

![Repo](https://github.actnow.dev/api/v1/pin?username=hehehai&repo=berry)

**With owner:**

![Repo](https://github.actnow.dev/api/v1/pin?username=hehehai&repo=berry&show_owner=true)

### Customization Reference

**Available Themes:**

`default`, `dark`, `radical`, `tokyonight`, `dracula`, `nord`, `gruvbox`, `onedark`, `cobalt`, `synthwave`, `highcontrast`, `github_dark`, `github_light`, `catppuccin_mocha`, `catppuccin_latte`

**Available Fonts:**

`google-sans-flex`, `jetbrains-mono`, `fira-code`, `maple-mono`, `inter`, `roboto`, `noto-sans`, `outfit`, `oxygen`

**Available Icon Sets:**

`default`, `lucide`, `tabler`, `phosphor`, `heroicons`, `solar`, `hugeicons`, `pixelarticons`

**Custom Colors:**

```
title_color=fff&text_color=aaa&bg_color=000&border_color=333
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

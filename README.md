# BunUI

BunUI is a reduced open-source fork of the HeroUI v3 React design system. This repository intentionally keeps only the shell and infrastructure needed to grow the library from a single component.

## Development

```bash
pnpm install
pnpm dev
```

Run the full local validation with:

```bash
pnpm check
```

## Structure

- `packages/react/` - public React components
- `packages/styles/` - public design tokens and component styles
- `src/demos/` - live docs demos and their displayed source code
- `src/app/components/` - component index and detail pages
- `src/components/` - minimal docs shell (topbar, sidebar, TOC, search, code previews)

Currently included: `Button`.

## Adding a component

1. Add its React implementation under `packages/react/src/components/`.
2. Add its CSS and variant styles under `packages/styles/`.
3. Export it from the package indexes.
4. Add live examples under `src/demos/en/<component>/` and register them in `src/demos/en/index.ts`.
5. Add the component to `src/components/component-tree.ts` and the Components page.
6. Add its detail route under `src/app/components/<component>/` using `ComponentPreview` so the rendered demo and displayed source stay in sync.

The `LICENSE` file is intentionally kept because this is an open-source project and the retained HeroUI-derived source needs its licensing notice preserved.
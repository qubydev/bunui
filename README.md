# BunUI

BunUI is a shadcn-style component registry for cute, animated React components.

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

- `registry/default/ui/` - installable shadcn registry components
- `packages/styles/` - public design tokens and component styles
- `src/demos/` - live docs demos and their displayed source code
- `src/app/components/` - component index and detail pages
- `src/components/` - minimal docs shell (topbar, sidebar, TOC, search, code previews)
- `registry.json` - shadcn registry manifest
- `src/app/r/[name]/route.ts` - hosted shadcn registry JSON endpoint

Currently included: `Button`.

## Adding a component

1. Add its installable implementation under `registry/default/ui/`.
2. Add the component entry to `registry.json` with its dependencies and files.
3. Update `src/app/r/[name]/route.ts` if the component needs a custom install target.
4. Add live examples under `src/demos/en/<component>/` and register them in `src/demos/en/index.ts`.
5. Add the component to `src/components/component-tree.ts` and the Components page.
6. Add its detail route under `src/app/components/<component>/` using `ComponentPreview` so the rendered demo and displayed source stay in sync.

The `LICENSE` file is intentionally kept because this is an open-source project and the retained HeroUI-derived source needs its licensing notice preserved.

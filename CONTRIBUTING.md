# Contributing

Thanks for helping improve Bunui.

## Development

Install dependencies:

```bash
pnpm install
```

Start the docs site:

```bash
pnpm dev
```

Run local validation:

```bash
pnpm check
```

## Project Structure

- `registry/default/ui/` - installable shadcn registry components
- `src/app/globals.css` - Tailwind import, global color tokens, Fumadocs overrides, and truly shared custom classes
- `src/demos/` - live docs demos and their displayed source code
- `src/app/components/` - component index and detail pages
- `src/components/` - docs shell, previews, navigation, search, and shared UI
- `registry.json` - shadcn registry manifest
- `src/app/r/[name]/route.ts` - hosted shadcn registry JSON endpoint

## Adding a Component

1. Add its installable implementation under `registry/default/ui/`.
2. Add the component entry to `registry.json` with its dependencies and files.
3. Update `src/app/r/[name]/route.ts` if the component needs a custom install target.
4. Add live examples under `src/demos/en/<component>/` and register them in `src/demos/en/index.ts`.
5. Add the component to `src/components/component-tree.ts` and the Components page.
6. Add its detail route under `src/app/components/<component>/` using `ComponentPreview` so the rendered demo and displayed source stay in sync.

## Notes

The `LICENSE` file is intentionally kept because Bunui is an open-source project.

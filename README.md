# Bun UI

A shadcn registry and demo site for Bun UI components.

## Development

```bash
npm install
npm run dev
```

## Registry

Components live in `components/ui`. Add each installable item to `registry.json`, then rebuild the static registry payloads:

```bash
npm run registry:build
```

The generated files are written to `public/r`.

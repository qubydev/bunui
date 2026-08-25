<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Fumadocs UI customization rules

When changing Fumadocs UI, follow the official customization hierarchy and stick to it consistently:

1. Prefer Fumadocs component/layout props and exposed options first.
2. If styling cannot be expressed cleanly through props, customize via `src/app/globals.css` using Fumadocs-owned stable `id` and `data-*` selectors.
3. Avoid selectors that depend on fragile internal DOM structure such as child-position selectors or deeply nested element selectors.
4. Only install/customize Fumadocs source with the Fumadocs CLI when props and stable CSS hooks are insufficient.
5. Do not disable or remove intended product features (for example search, sidebar behavior, or theme support) just to work around a visual/layout issue. Fix the presentation through the supported customization path instead.
6. Treat old CSS preserved in `BACKUP.md` as reference only; never copy it into the fresh app unless explicitly requested.

Reference: https://www.fumadocs.dev/docs/guides/customize-ui

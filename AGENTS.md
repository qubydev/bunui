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

## Styling ownership rules

Keep styling ownership clear:

1. Custom app components should be styled with Tailwind classes in their own JSX. Do not add `bunui-*` classes or other one-off global classes in `globals.css` for app-owned components such as previews, code blocks, cards, and page-local UI.
2. Fumadocs UI overrides belong in `src/app/globals.css`, but use smart selectors based on Fumadocs-owned stable IDs, attributes, and semantic element attributes, such as `#nd-page table code` or `#nd-sidebar-mobile button[aria-controls="nd-sidebar-mobile"]`.
3. Avoid inventing custom data hooks or custom class hooks only to style Fumadocs output, unless there is no stable selector and no supported prop-based option.
4. Components intended to be installed through shadcn-style distribution must be self-contained. They must not depend on `globals.css` or any external stylesheet. Use Tailwind classes in the component; if custom CSS is required, keep it inside the component file and scope it to that component only.
5. Global CSS is for design tokens, base element behavior, Fumadocs overrides, and truly global browser behavior such as scrollbars. It is not a dumping ground for styling local custom components.

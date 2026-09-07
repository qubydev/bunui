import {
  components,
  installCommand,
  REGISTRY_HOMEPAGE,
  REGISTRY_REPO,
} from "@/lib/components";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const componentSections = components.map((item) => {
    const lines = [`### ${item.name}`, "", `- Page: ${SITE_URL}${item.href}`];
    if (item.description) lines.push(`- Description: ${item.description}`);
    const install = installCommand(item);
    if (install) lines.push(`- Install: \`${install}\``);
    if (item.source) lines.push(`- Source: ${item.source}`);
    if (item.dependencies?.length) {
      lines.push(
        `- Dependencies: ${item.dependencies.map((d) => d.name).join(", ")}`,
      );
    }
    return lines.join("\n");
  });

  const body = [
    `# ${SITE_NAME}`,
    "",
    "> A shadcn registry of animated React components built with Tailwind CSS and Motion.",
    "",
    "Install any component into a React / Next.js project:",
    "",
    "```",
    `npx shadcn@latest add ${REGISTRY_REPO}/<component-name>`,
    "```",
    "",
    `Source code for all components: ${REGISTRY_HOMEPAGE}`,
    "",
    "## Components",
    "",
    componentSections.join("\n\n") || "No components have been published yet.",
    "",
    "## Notes",
    "",
    "- Components follow shadcn/ui conventions: cn helper, className merging, prop spreading, and data-slot attributes.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

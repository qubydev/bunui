import fs from "node:fs/promises";
import path from "node:path";

import {NextResponse} from "next/server";

import {siteConfig} from "@/config/site";

import registry from "../../../../registry.json";

export const dynamic = "force-static";
export const runtime = "nodejs";

type RegistryItem = (typeof registry.items)[number];

const jsonHeaders = {
  "Cache-Control": "public, max-age=0, s-maxage=86400",
};

function cleanName(name: string) {
  return name.replace(/\.json$/, "");
}

async function withFileContent(item: RegistryItem) {
  const files = await Promise.all(
    item.files.map(async (file) => ({
      ...file,
      target: `@components/bunui/${item.name}.tsx`,
      content: await fs.readFile(path.join(process.cwd(), file.path), "utf-8"),
    })),
  );

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files,
  };
}

export async function GET(_request: Request, {params}: {params: Promise<{name: string}>}) {
  const {name} = await params;
  const itemName = cleanName(name);

  if (itemName === "registry") {
    return NextResponse.json({...registry, homepage: siteConfig.url}, {headers: jsonHeaders});
  }

  const item = registry.items.find((entry) => entry.name === itemName);

  if (!item) {
    return NextResponse.json({error: "Registry item not found."}, {status: 404});
  }

  return NextResponse.json(await withFileContent(item), {headers: jsonHeaders});
}

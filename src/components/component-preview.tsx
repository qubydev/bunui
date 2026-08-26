import fs from "node:fs/promises";
import path from "node:path";

import {CodeBlock} from "@/components/code-block";
import {demos} from "@/demos";

export async function ComponentPreview({
  align = "center",
  hideCode = false,
  name,
}: {
  align?: "center" | "start" | "end";
  hideCode?: boolean;
  name: string;
}) {
  const demo = demos[name];

  if (!demo) {
    return (
      <div className="my-5 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
        Component demo &quot;{name}&quot; not found.
      </div>
    );
  }

  const Demo = demo.component;
  const alignment = {
    center: "items-center justify-center",
    end: "items-end justify-end",
    start: "items-start justify-start",
  }[align];
  const code = await fs.readFile(path.join(process.cwd(), "src", "demos", demo.file), "utf-8");

  return (
    <div className="my-5 overflow-hidden rounded-lg border bg-background">
      <div className={`flex min-h-72 sm:min-h-87 p-6 ${alignment}`}>
        <Demo />
      </div>
      {!hideCode ? (
        <div className="border-t">
          <CodeBlock code={code} title={demo.file} flushTop />
        </div>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

const groups = [
  {
    title: "Overview",
    items: [{title: "All Components", href: "/components"}],
  },
  {
    title: "Components",
    items: [{title: "Button", href: "/components/button"}],
  },
];

export function ComponentsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <nav className="sticky top-14 flex max-h-[calc(100vh-3.5rem)] flex-col gap-6 overflow-y-auto px-5 py-6">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground/60">{group.title}</p>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-3 h-10 flex items-center text-sm transition-colors ${
                      active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

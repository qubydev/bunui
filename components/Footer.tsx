
const SOCIAL_LINKS = [
  {
    label: "X",
    href: "https://x.com/qubydev",
    icon: "/icons/social/x.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/qubydev",
    icon: "/icons/social/linkedin.svg",
  },
  {
    label: "Mail",
    href: "mailto:malay77patra@gmail.com",
    icon: "/icons/social/mail.svg",
  },
  {
    label: "GitHub",
    href: "https://github.com/qubydev",
    icon: "/icons/social/github.svg",
  },
] as const;

export default function Footer() {
  return (
    <footer className="mx-auto mt-16 flex w-full max-w-5xl flex-col gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} Bun UI</p>

      <div className="flex items-center gap-1">
        {SOCIAL_LINKS.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            aria-label={label}
            className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              aria-hidden="true"
              className="size-[18px] shrink-0 bg-current"
              style={{
                WebkitMask: `url(${icon}) center / contain no-repeat`,
                mask: `url(${icon}) center / contain no-repeat`,
              }}
            />
          </a>
        ))}
      </div>
    </footer>
  );
}

import {BunUILogo} from "@/components/bunui-logo";
import {GitHubLinkSmall} from "@/components/github-link";
import {LargeSearchToggle, SearchToggle} from "@/components/fumadocs/ui/search-toggle";
import {ThemeToggle} from "@/components/fumadocs/ui/theme-toggle";

export function Topbar() {
  return (
    <header className="bun-topbar sticky top-0 z-20 bg-background [grid-area:header]">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center gap-3 px-6">
        <div className="flex min-w-0 flex-1 items-center">
          <a className="inline-flex items-center font-semibold" href="/">
            <BunUILogo />
          </a>
        </div>

        <LargeSearchToggle
          hideIfDisabled
          className="bun-topbar-search h-9 w-[400px] max-w-[40vw] shrink-0 max-md:hidden"
        />

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <div className="md:hidden">
            <SearchToggle hideIfDisabled className="p-2" />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle mode="light-dark-system" />
            <GitHubLinkSmall />
          </div>
        </div>
      </div>
    </header>
  );
}
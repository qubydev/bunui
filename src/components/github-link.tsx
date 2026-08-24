"use client";

import {useEffect, useState} from "react";
import {buttonVariants} from "@/registry/default/ui/button";
import {cn} from "@/utils/cn";

const REPO = "facebook/react";
const REPO_URL = `https://github.com/${REPO}`;
const API_URL = `https://api.github.com/repos/${REPO}`;

function formatStars(count: number) {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toLocaleString();
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.41-1.27.74-1.56-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.75 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.06.79 2.15v3.19c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z"/>
    </svg>
  );
}

export function GitHubLinkSmall() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch(API_URL)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active && typeof data?.stargazers_count === "number") setStars(data.stargazers_count);
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  return (
    <a
      aria-label="React on GitHub"
      className={cn(buttonVariants({size: "sm", variant: "secondary"}), "no-underline")}
      href={REPO_URL}
      rel="noreferrer"
      target="_blank"
    >
      <GitHubIcon />
      <span className="tabular-nums">{stars === null ? "—" : formatStars(stars)}</span>
    </a>
  );
}

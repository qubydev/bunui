"use client";

import { useEffect, useState } from "react";
import { REGISTRY_REPO } from "@/lib/components";

const STARS_API = `https://api.github.com/repos/${REGISTRY_REPO}`;

export function useStarCount(seed?: number | null) {
  const [stars, setStars] = useState(seed);

  useEffect(() => {
    let cancelled = false;

    fetch(STARS_API, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        const count = data?.stargazers_count;
        if (typeof count === "number") setStars(count);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return stars;
}

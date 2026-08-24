"use client";

import {createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  theme: Theme;
}

const storageKey = "theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(theme: Theme) {
  const resolved = resolveTheme(theme);
  const root = document.documentElement;

  root.classList.toggle("dark", resolved === "dark");
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;

  return resolved;
}

export function ThemeProvider({children}: {children: ReactNode}) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    setResolvedTheme(applyTheme(nextTheme));

    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch {}
  }, []);

  useEffect(() => {
    let storedTheme: Theme = "system";

    try {
      const value = localStorage.getItem(storageKey);
      if (value === "light" || value === "dark" || value === "system") {
        storedTheme = value;
      }
    } catch {}

    setThemeState(storedTheme);
    setResolvedTheme(applyTheme(storedTheme));
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      if (theme === "system") {
        setResolvedTheme(applyTheme("system"));
      }
    };

    query.addEventListener("change", handleSystemThemeChange);
    return () => query.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  const value = useMemo(() => ({resolvedTheme, setTheme, theme}), [resolvedTheme, setTheme, theme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

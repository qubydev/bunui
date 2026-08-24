import {NextResponse} from "next/server";

const REPO = "qubydev/bunui";
const GITHUB_REPO_URL = `https://api.github.com/repos/${REPO}`;

export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      {error: "Missing GITHUB_TOKEN."},
      {status: 500},
    );
  }

  const response = await fetch(GITHUB_REPO_URL, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "bunui.dev",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: {revalidate},
  });

  if (!response.ok) {
    return NextResponse.json(
      {error: "Unable to fetch GitHub stars."},
      {status: response.status},
    );
  }

  const data = await response.json();

  return NextResponse.json(
    {stars: data.stargazers_count},
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}

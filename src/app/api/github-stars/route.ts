const REPO_OWNER = "qubydev";
const REPO_NAME = "bunui";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;

type GitHubRepoResponse = {
  stargazers_count?: unknown;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimit = new Map<string, RateLimitEntry>();

function getClientId(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function checkRateLimit(clientId: string) {
  const now = Date.now();

  for (const [key, entry] of rateLimit) {
    if (entry.resetAt <= now) {
      rateLimit.delete(key);
    }
  }

  const entry = rateLimit.get(clientId);

  if (!entry) {
    rateLimit.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return {limited: false, retryAfter: 0};
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;

  return {limited: false, retryAfter: 0};
}

export async function GET(request: Request) {
  const limit = checkRateLimit(getClientId(request));

  if (limit.limited) {
    return Response.json(
      {stars: null},
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(limit.retryAfter),
        },
      },
    );
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "bunui-docs",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers,
        next: {
          revalidate: 300,
        },
      },
    );

    if (!response.ok) {
      return Response.json(
        {stars: null},
        {
          status: 502,
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        },
      );
    }

    const repo = (await response.json()) as GitHubRepoResponse;
    const stars =
      typeof repo.stargazers_count === "number" ? repo.stargazers_count : null;

    return Response.json(
      {stars},
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
        },
      },
    );
  } catch {
    return Response.json(
      {stars: null},
      {
        status: 502,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  }
}

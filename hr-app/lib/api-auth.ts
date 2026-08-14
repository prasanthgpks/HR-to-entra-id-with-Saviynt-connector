import { NextResponse } from "next/server";

function configuredKey(): string | undefined {
  const key = process.env.HR_API_KEY?.trim();
  return key || undefined;
}

function fromRequest(request: Request): string | undefined {
  const headerKey = request.headers.get("x-api-key")?.trim();
  if (headerKey) return headerKey;

  const auth = request.headers.get("authorization");
  if (!auth) return undefined;

  if (auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }

  if (auth.toLowerCase().startsWith("basic ")) {
    try {
      const decoded = atob(auth.slice(6).trim());
      const sep = decoded.indexOf(":");
      return sep >= 0 ? decoded.slice(sep + 1) : decoded;
    } catch {
      return undefined;
    }
  }

  return undefined;
}

export function requireApiKey(request: Request): NextResponse | null {
  const expected = configuredKey();
  if (!expected) {
    return NextResponse.json(
      { error: "HR_API_KEY is not configured" },
      { status: 503 },
    );
  }
  if (fromRequest(request) !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return null;
}

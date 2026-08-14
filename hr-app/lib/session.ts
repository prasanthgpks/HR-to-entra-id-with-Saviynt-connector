import { cookies } from "next/headers";

const COOKIE = "contoso_hr";

export async function isSignedIn(): Promise<boolean> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;
  const jar = await cookies();
  return jar.get(COOKIE)?.value === secret;
}

export async function signIn(password: string): Promise<boolean> {
  const expected = process.env.HR_DEMO_PASSWORD;
  const secret = process.env.SESSION_SECRET;
  if (!expected || !secret || password !== expected) {
    return false;
  }
  const jar = await cookies();
  jar.set(COOKIE, secret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return true;
}

export async function signOut(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function sessionCookieValid(value: string | undefined): boolean {
  const secret = process.env.SESSION_SECRET;
  return Boolean(secret && value === secret);
}

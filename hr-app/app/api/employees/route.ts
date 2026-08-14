import { NextResponse } from "next/server";
import { requireApiKey } from "@/lib/api-auth";
import { listEmployees } from "@/lib/employees";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = requireApiKey(request);
  if (denied) return denied;
  try {
    const people = await listEmployees();
    return NextResponse.json(people);
  } catch (error) {
    const message = error instanceof Error ? error.message : "error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

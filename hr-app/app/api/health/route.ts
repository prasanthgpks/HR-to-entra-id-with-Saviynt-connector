import { NextResponse } from "next/server";
import { listEmployees } from "@/lib/employees";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const people = await listEmployees();
    return NextResponse.json({
      status: "ok",
      source: "contoso-people",
      count: people.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "error";
    return NextResponse.json({ status: "error", error: message }, { status: 500 });
  }
}

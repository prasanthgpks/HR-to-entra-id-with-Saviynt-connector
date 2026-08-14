import { NextResponse } from "next/server";
import { requireApiKey } from "@/lib/api-auth";
import { getEmployee } from "@/lib/employees";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const denied = requireApiKey(request);
  if (denied) return denied;
  const { id } = await context.params;
  try {
    const person = await getEmployee(id);
    if (!person) {
      return NextResponse.json({ error: "not found", employeeId: id }, { status: 404 });
    }
    return NextResponse.json(person);
  } catch (error) {
    const message = error instanceof Error ? error.message : "error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

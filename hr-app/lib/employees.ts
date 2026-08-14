import { getServiceClient } from "./supabase";
import {
  localPart,
  toPublic,
  type DbEmployee,
  type PublicEmployee,
} from "./types";

const COLS =
  "employee_id, first_name, last_name, email, department, title, manager_employee_id, hire_date, status";

function emailDomain(): string {
  const raw = process.env.TENANT_EMAIL_DOMAIN?.trim().replace(/^@/, "") ?? "";
  return raw || "lab.onmicrosoft.com";
}

export async function listEmployees(): Promise<PublicEmployee[]> {
  const { data, error } = await getServiceClient()
    .from("employees")
    .select(COLS)
    .order("employee_id");
  if (error) throw error;
  return ((data ?? []) as DbEmployee[]).map(toPublic);
}

export async function getEmployee(id: string): Promise<PublicEmployee | null> {
  const { data, error } = await getServiceClient()
    .from("employees")
    .select(COLS)
    .eq("employee_id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? toPublic(data as DbEmployee) : null;
}

export async function nextEmployeeId(): Promise<string> {
  const people = await listEmployees();
  const nums = people
    .map((p) => Number.parseInt(p.employeeId, 10))
    .filter((n) => Number.isFinite(n));
  const max = nums.length ? Math.max(...nums) : 10000;
  return String(max + 1);
}

export async function hireEmployee(input: {
  firstName: string;
  lastName: string;
  department: string;
  title: string;
  managerEmployeeId: string | null;
  hireDate: string;
}): Promise<PublicEmployee> {
  const employeeId = await nextEmployeeId();
  const email = `${localPart(input.firstName, input.lastName)}@${emailDomain()}`;
  const { data, error } = await getServiceClient()
    .from("employees")
    .insert({
      employee_id: employeeId,
      first_name: input.firstName.trim(),
      last_name: input.lastName.trim(),
      email,
      department: input.department,
      title: input.title.trim(),
      manager_employee_id: input.managerEmployeeId,
      hire_date: input.hireDate,
      status: "Active",
    })
    .select(COLS)
    .single();
  if (error) throw error;
  return toPublic(data as DbEmployee);
}

export async function moveEmployee(
  id: string,
  department: string,
  title: string,
): Promise<PublicEmployee> {
  const { data, error } = await getServiceClient()
    .from("employees")
    .update({ department, title: title.trim() })
    .eq("employee_id", id)
    .select(COLS)
    .single();
  if (error) throw error;
  return toPublic(data as DbEmployee);
}

export async function terminateEmployee(id: string): Promise<PublicEmployee> {
  const { data, error } = await getServiceClient()
    .from("employees")
    .update({ status: "Terminated" })
    .eq("employee_id", id)
    .select(COLS)
    .single();
  if (error) throw error;
  return toPublic(data as DbEmployee);
}

export async function rewriteEmailDomain(domain: string): Promise<number> {
  const cleaned = domain.trim().replace(/^@/, "");
  if (!/^[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?\.[A-Za-z0-9.-]+$/.test(cleaned)) {
    throw new Error("Domain looks invalid.");
  }
  const people = await listEmployees();
  const db = getServiceClient();
  for (const person of people) {
    const local = person.email.split("@")[0];
    const { error } = await db
      .from("employees")
      .update({ email: `${local}@${cleaned}` })
      .eq("employee_id", person.employeeId);
    if (error) throw error;
  }
  return people.length;
}

"use server";

import { redirect } from "next/navigation";
import { hireEmployee, moveEmployee, terminateEmployee, rewriteEmailDomain } from "@/lib/employees";
import { signIn, signOut } from "@/lib/session";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await signIn(password);
  if (!ok) {
    redirect("/login?error=1");
  }
  redirect("/people");
}

export async function logoutAction() {
  await signOut();
  redirect("/login");
}

export async function hireAction(formData: FormData) {
  const manager = String(formData.get("managerEmployeeId") ?? "").trim();
  await hireEmployee({
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    department: String(formData.get("department") ?? ""),
    title: String(formData.get("title") ?? ""),
    managerEmployeeId: manager || null,
    hireDate: String(formData.get("hireDate") ?? new Date().toISOString().slice(0, 10)),
  });
  redirect("/people");
}

export async function moveAction(formData: FormData) {
  const id = String(formData.get("employeeId") ?? "");
  await moveEmployee(
    id,
    String(formData.get("department") ?? ""),
    String(formData.get("title") ?? ""),
  );
  redirect(`/people/${id}`);
}

export async function terminateAction(formData: FormData) {
  const id = String(formData.get("employeeId") ?? "");
  await terminateEmployee(id);
  redirect(`/people/${id}`);
}

export async function domainAction(formData: FormData) {
  await rewriteEmailDomain(String(formData.get("domain") ?? ""));
  redirect("/people");
}

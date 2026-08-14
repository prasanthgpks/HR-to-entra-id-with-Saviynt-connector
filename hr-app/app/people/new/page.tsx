import { hireAction } from "@/app/actions";
import { Field, Shell } from "@/components/shell";
import { listEmployees } from "@/lib/employees";
import { DEPARTMENTS } from "@/lib/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewHirePage() {
  const managers = (await listEmployees()).filter((p) => p.status === "Active");
  const today = new Date().toISOString().slice(0, 10);

  return (
    <Shell kicker="Joiner" title="Hire someone">
      <p className="mb-6 max-w-xl text-sm text-muted">
        Creates a person in HR only. Saviynt decides whether they get an Entra account. Use
        this for extra joiners; Priya (10042) is already in the seed data.
      </p>
      <form action={hireAction} className="grid max-w-lg gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name" name="firstName" required />
          <Field label="Last name" name="lastName" required />
        </div>
        <Field label="Department" name="department" required>
          <select
            name="department"
            required
            className="rounded-md border border-border bg-bg px-3 py-2"
            defaultValue="Finance"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Title" name="title" required defaultValue="Accountant" />
        <Field label="Manager" name="managerEmployeeId">
          <select
            name="managerEmployeeId"
            className="rounded-md border border-border bg-bg px-3 py-2"
            defaultValue="10011"
          >
            <option value="">None</option>
            {managers.map((m) => (
              <option key={m.employeeId} value={m.employeeId}>
                {m.firstName} {m.lastName} ({m.department})
              </option>
            ))}
          </select>
        </Field>
        <Field label="Hire date" name="hireDate" type="date" required defaultValue={today} />
        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast"
          >
            Create in HR
          </button>
          <Link href="/people" className="px-4 py-2 text-sm text-muted">
            Cancel
          </Link>
        </div>
      </form>
    </Shell>
  );
}

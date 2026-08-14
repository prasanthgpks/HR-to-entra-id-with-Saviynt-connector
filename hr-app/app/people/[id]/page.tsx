import { moveAction, terminateAction } from "@/app/actions";
import { Field, Shell, StatusPill } from "@/components/shell";
import { getEmployee } from "@/lib/employees";
import { DEPARTMENTS } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const person = await getEmployee(id);
  if (!person) notFound();

  const demoHint =
    id === "10042"
      ? "Joiner — she should not exist in Entra until Saviynt provisions her."
      : id === "10001"
        ? "Mover — change department on stage, then let Saviynt reconcile."
        : id === "10012"
          ? "Leaver — terminate here. Do not delete the row."
          : null;

  return (
    <Shell
      kicker={person.employeeId}
      title={`${person.firstName} ${person.lastName}`}
      actions={<StatusPill status={person.status} />}
    >
      <p className="mb-8 text-sm text-muted">
        <Link href="/people">People</Link>
        {demoHint ? ` · ${demoHint}` : null}
      </p>

      <dl className="mb-10 grid max-w-lg gap-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-border pb-2">
          <dt className="text-muted">Email (Entra UPN)</dt>
          <dd>{person.email}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border pb-2">
          <dt className="text-muted">Department</dt>
          <dd>{person.department}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border pb-2">
          <dt className="text-muted">Title</dt>
          <dd>{person.title}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border pb-2">
          <dt className="text-muted">Manager</dt>
          <dd>{person.managerEmployeeId ?? "—"}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border pb-2">
          <dt className="text-muted">Hire date</dt>
          <dd>{person.hireDate}</dd>
        </div>
      </dl>

      {person.status === "Active" ? (
        <div className="grid max-w-lg gap-10">
          <section>
            <h2 className="font-display text-lg font-bold">Mover</h2>
            <p className="mb-4 text-sm text-muted">
              Change department in HR. Saviynt adds and removes Entra groups. Do not edit
              groups in Entra.
            </p>
            <form action={moveAction} className="grid gap-4">
              <input type="hidden" name="employeeId" value={person.employeeId} />
              <Field label="Department" name="department">
                <select
                  name="department"
                  defaultValue={person.department}
                  className="rounded-md border border-border bg-bg px-3 py-2"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Title" name="title" defaultValue={person.title} required />
              <button
                type="submit"
                className="w-fit cursor-pointer rounded-md border border-border bg-bg px-4 py-2 text-sm font-semibold"
              >
                Save department
              </button>
            </form>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold">Leaver</h2>
            <p className="mb-4 text-sm text-muted">
              Sets status to Terminated. The person stays in HR so an auditor can see them.
            </p>
            <form action={terminateAction}>
              <input type="hidden" name="employeeId" value={person.employeeId} />
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-danger px-4 py-2 text-sm font-semibold text-white"
              >
                Terminate
              </button>
            </form>
          </section>
        </div>
      ) : (
        <p className="text-sm text-muted">Terminated. HR keeps the history. Re-seed to reset a demo.</p>
      )}
    </Shell>
  );
}

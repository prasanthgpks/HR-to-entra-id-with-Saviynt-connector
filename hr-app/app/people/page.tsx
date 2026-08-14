import { domainAction } from "@/app/actions";
import { Shell, StatusPill } from "@/components/shell";
import { listEmployees } from "@/lib/employees";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PeoplePage() {
  const people = await listEmployees();
  const active = people.filter((p) => p.status === "Active").length;
  const sampleDomain = people[0]?.email.split("@")[1] ?? "lab.onmicrosoft.com";

  return (
    <Shell
      kicker="Workforce"
      title="People"
      actions={
        <Link
          href="/people/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast no-underline"
        >
          Hire someone
        </Link>
      }
    >
      <p className="mb-6 text-sm text-muted">
        {people.length} people · {active} active. Priya Sharma (10042) is the joiner. Alice
        (10001) is the mover. Liam (10012) is the leaver.
      </p>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Department</th>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.employeeId} className="border-t border-border">
                <td className="px-4 py-3 font-mono text-xs">{person.employeeId}</td>
                <td className="px-4 py-3">
                  <Link href={`/people/${person.employeeId}`} className="font-medium">
                    {person.firstName} {person.lastName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{person.email}</td>
                <td className="px-4 py-3">{person.department}</td>
                <td className="px-4 py-3 text-muted">{person.title}</td>
                <td className="px-4 py-3">
                  <StatusPill status={person.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-10 rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide">
          Email domain (off stage)
        </h2>
        <p className="mt-1 text-sm text-muted">
          Rewrites every address to match the Entra tenant UPN suffix. Saviynt imports this
          field as the cloud sign-in name.
        </p>
        <form action={domainAction} className="mt-4 flex max-w-lg items-end gap-2">
          <label className="grid flex-1 gap-1 text-sm">
            <span className="font-medium">Domain</span>
            <input
              name="domain"
              required
              defaultValue={sampleDomain}
              className="rounded-md border border-border bg-bg px-3 py-2"
            />
          </label>
          <button
            type="submit"
            className="h-[42px] shrink-0 cursor-pointer rounded-md border border-border bg-bg px-3 text-sm font-semibold"
          >
            Apply
          </button>
        </form>
      </section>
    </Shell>
  );
}

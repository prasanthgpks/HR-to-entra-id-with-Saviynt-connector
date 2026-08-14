import { logoutAction } from "@/app/actions";
import Link from "next/link";

export function Shell({
  children,
  kicker,
  title,
  actions,
}: {
  children: React.ReactNode;
  kicker?: string;
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/people" className="no-underline">
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Contoso People
            </p>
            <p className="text-sm text-muted">HRIS · who exists</p>
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="cursor-pointer border-0 bg-transparent text-sm text-muted"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          {kicker}
        </p>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-3xl font-extrabold tracking-tight">{title}</h1>
          {actions}
        </div>
        {children}
      </main>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const active = status === "Active";
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
        active ? "bg-accent/15 text-fg" : "bg-surface text-muted"
      }`}
    >
      {status}
    </span>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  children,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      {children ?? (
        <input
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          className="rounded-md border border-border bg-bg px-3 py-2"
        />
      )}
    </label>
  );
}

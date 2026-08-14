import { loginAction } from "@/app/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-full items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">
          Contoso People
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Demo HRIS. Saviynt reads people from <code className="text-fg">/api/employees</code>{" "}
          with an API key — this password is only for the UI.
        </p>
        <form action={loginAction} className="mt-8 grid gap-4">
          <label className="grid gap-1 text-sm">
            <span className="font-medium">Demo password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded-md border border-border px-3 py-2"
            />
          </label>
          {error ? <p className="text-sm text-danger">That password is wrong.</p> : null}
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

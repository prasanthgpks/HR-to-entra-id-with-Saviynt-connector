# Contoso People (HR app)

HRIS for this demo. Live: [https://contoso-people.vercel.app](https://contoso-people.vercel.app). The UI is what you click. `GET /api/employees` is what Saviynt imports.

## What Saviynt calls

| Method | Path | Auth |
|---|---|---|
| GET | `/api/health` | none (deploy check) |
| GET | `/api/employees` | `x-api-key` or `Authorization: Bearer` or HTTP Basic (password = key) |
| GET | `/api/employees/{employeeId}` | same |

JSON fields: `employeeId`, `firstName`, `lastName`, `email`, `department`, `title`, `managerEmployeeId`, `hireDate`, `status`.

## Once (operator)

1. Create a [Supabase](https://supabase.com) project. Copy **Project URL** and **service_role** key (not `anon`).
2. SQL editor: run `supabase/migrations/001_employees.sql`, then `supabase/seed.sql`.
3. [Vercel](https://vercel.com) → import this GitHub repo → **Root Directory** `hr-app`.
4. Environment variables from `env.example`. `TENANT_EMAIL_DOMAIN` is the Entra `onmicrosoft.com` prefix. `HR_API_KEY` is what you paste into the Saviynt REST connection.
5. Deploy. Open `/api/health`. Sign in at `/login`. **Email domain → Apply** if seed still says `lab.onmicrosoft.com`.

Local:

```powershell
cd hr-app
copy env.example .env.local
npm install
npm run dev
```

Fill `.env.local` before `dev`. Never commit keys. Never use an employer Supabase project.

## Demo clicks

| Scene | In this app |
|---|---|
| HR source of truth | People list — Priya 10042 Active, Finance |
| Joiner | Leave Priya as she is; Saviynt creates Entra |
| Extra hire | **Hire someone** |
| Mover | Alice 10001 → change department |
| Leaver | Liam 10012 → **Terminate** (row stays) |

-- Contoso People — source of truth for humans, not accounts.
-- Run in the Supabase SQL editor. Service role bypasses RLS; the anon key cannot read rows.

create table if not exists public.employees (
  employee_id text primary key,
  first_name text not null,
  last_name text not null,
  email text not null unique,
  department text not null,
  title text not null,
  manager_employee_id text references public.employees (employee_id),
  hire_date date not null,
  status text not null check (status in ('Active', 'Terminated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists employees_department_idx on public.employees (department);
create index if not exists employees_status_idx on public.employees (status);

alter table public.employees enable row level security;

create or replace function public.set_employees_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists employees_updated_at on public.employees;
create trigger employees_updated_at
before update on public.employees
for each row execute procedure public.set_employees_updated_at();

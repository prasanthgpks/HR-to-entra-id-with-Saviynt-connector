-- Seed the demo workforce. Emails use @lab.onmicrosoft.com until you rewrite
-- the domain in the UI (People → Email domain) or:
--   update public.employees
--   set email = split_part(email, '@', 1) || '@yourprefix.onmicrosoft.com';

insert into public.employees (
  employee_id, first_name, last_name, email, department, title,
  manager_employee_id, hire_date, status
) values
  ('10002', 'Brian', 'Kelly', 'bkelly@lab.onmicrosoft.com', 'Sales', 'Sales Manager', null, '2021-06-01', 'Active'),
  ('10006', 'Farid', 'Haidari', 'fhaidari@lab.onmicrosoft.com', 'IT', 'IT Manager', null, '2020-09-15', 'Active'),
  ('10008', 'Hassan', 'Ali', 'hali@lab.onmicrosoft.com', 'HR', 'HR Manager', null, '2021-01-18', 'Active'),
  ('10011', 'Karin', 'Bakker', 'kbakker@lab.onmicrosoft.com', 'Finance', 'Finance Manager', null, '2020-04-06', 'Active')
on conflict (employee_id) do nothing;

insert into public.employees (
  employee_id, first_name, last_name, email, department, title,
  manager_employee_id, hire_date, status
) values
  ('10001', 'Alice', 'Nguyen', 'anguyen@lab.onmicrosoft.com', 'Sales', 'Sales Representative', '10002', '2023-03-14', 'Active'),
  ('10003', 'Carla', 'Mendes', 'cmendes@lab.onmicrosoft.com', 'Sales', 'Account Executive', '10002', '2022-11-08', 'Active'),
  ('10004', 'Derek', 'Osei', 'dosei@lab.onmicrosoft.com', 'IT', 'Systems Administrator', '10006', '2022-02-21', 'Active'),
  ('10005', 'Elena', 'Petrova', 'epetrova@lab.onmicrosoft.com', 'IT', 'Help Desk Technician', '10006', '2024-01-09', 'Active'),
  ('10007', 'Grace', 'Lindqvist', 'glindqvist@lab.onmicrosoft.com', 'HR', 'HR Generalist', '10008', '2023-07-03', 'Active'),
  ('10009', 'Isabel', 'Ruiz', 'iruiz@lab.onmicrosoft.com', 'Finance', 'Accountant', '10011', '2022-05-30', 'Active'),
  ('10010', 'Jacob', 'Weiss', 'jweiss@lab.onmicrosoft.com', 'Finance', 'Financial Analyst', '10011', '2023-10-12', 'Active'),
  ('10012', 'Liam', 'O''Connor', 'loconnor@lab.onmicrosoft.com', 'Sales', 'Sales Representative', '10002', '2024-08-19', 'Active'),
  ('10042', 'Priya', 'Sharma', 'psharma@lab.onmicrosoft.com', 'Finance', 'Accountant', '10011', '2026-08-17', 'Active')
on conflict (employee_id) do nothing;

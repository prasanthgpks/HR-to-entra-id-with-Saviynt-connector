export const DEPARTMENTS = ["Sales", "IT", "HR", "Finance"] as const;

export type Department = (typeof DEPARTMENTS)[number];
export type EmployeeStatus = "Active" | "Terminated";

export type DbEmployee = {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  title: string;
  manager_employee_id: string | null;
  hire_date: string;
  status: EmployeeStatus;
};

/** Shape Saviynt (and the old lab API) already expect. */
export type PublicEmployee = {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  title: string;
  managerEmployeeId: string | null;
  hireDate: string;
  status: EmployeeStatus;
};

export function toPublic(row: DbEmployee): PublicEmployee {
  return {
    employeeId: row.employee_id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    department: row.department,
    title: row.title,
    managerEmployeeId: row.manager_employee_id,
    hireDate: row.hire_date,
    status: row.status,
  };
}

export function localPart(firstName: string, lastName: string): string {
  const first = firstName.trim().toLowerCase().replace(/[^a-z]/g, "");
  const last = lastName.trim().toLowerCase().replace(/[^a-z]/g, "");
  if (!first || !last) {
    throw new Error("First and last name need letters.");
  }
  return `${first[0]}${last}`;
}

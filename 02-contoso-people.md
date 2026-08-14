---
title: "Lab 02 — Contoso People"
series: "HR to Entra ID"
order: 2
difficulty: "Beginner"
estimated_time: "20–30 min"
tags: [contoso-people, hris, csv, joiner-mover-leaver]
---

# Lab 02 — Contoso People

Entra ID knows about accounts. It does not know who was hired on Monday. That fact lives in the HRIS.

This lab is the same **Contoso People** roster as the hybrid series — a CSV of **people**, not accounts — retargeted at the tenant from Lab 01. There is no APP1 VM. Saviynt will import this file in Lab 04. Nothing here creates an Entra user.

**⏱ ~20–30 min · 📶 Beginner · 🖥 host · 🔑 Result: thirteen people, emails on your tenant domain**

---

## Prerequisites

| | |
|---|---|
| **Prior lab** | Lab 01 — you know `<yourprefix>.onmicrosoft.com` |
| **Files** | [`02-employees.csv`](scripts/02-employees.csv), [`02-Set-HrDomain.ps1`](scripts/02-Set-HrDomain.ps1) |

---

## Why HR is a separate system

```mermaid
flowchart LR
  HR["Contoso People<br/>who exists"]
  SAV["Saviynt<br/>what they should have"]
  ENTRA["Entra ID<br/>the account"]

  HR -->|"employeeId, department, status"| SAV
  SAV -->|"create / update / disable"| ENTRA
```

The CSV has no passwords and no licences. It has an **employeeId**, a department, a manager, a hire date, and `Active` or `Terminated`.

Twelve people match the hybrid-lab names. Row **10042** is **Priya Sharma** — Finance, Active, not in Entra yet. She is the joiner Lab 05 will provision.

The shipped file uses `@lab.onmicrosoft.com` as a dummy suffix. You replace it with the real tenant domain before anyone imports it.

---

## Steps

### 1. Stamp the tenant domain onto every email
On the host, in this repo’s `scripts` folder:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
Set-Location <this-repo>\scripts
.\02-Set-HrDomain.ps1 -TenantDomain "yourprefix.onmicrosoft.com"
```

Use the domain from Lab 01, no `https://`, no trailing slash. The script rewrites only the part after `@`. Alice becomes `anguyen@yourprefix.onmicrosoft.com`. Safe to re-run.

Open the CSV in Notepad. Confirm twelve Active rows plus Priya (`10042`). Close Notepad before any later import.

### 2. Know the columns
Saviynt will treat these as identity attributes, then map them onto Entra.

| Column | Meaning | Later |
|---|---|---|
| `employeeId` | Durable HR key | Correlation; Entra `employeeId` |
| `email` | Becomes the Entra UPN | Must match Lab 01 domain |
| `department` | Birthright input | Entra group `G-Finance` etc. |
| `status` | `Active` / `Terminated` | Enable vs disable |
| `managerEmployeeId` | Manager in HR | Entra manager, once both exist |

Do **not** correlate on display name. Two Liam O'Connors can exist. Two `10012` values cannot.

### 3. Joiner, mover, leaver are CSV edits
Do not save a mover or leaver today. Lab 04 imports the twelve plus Priya as they are.

| Event | What you change |
|---|---|
| **Joiner** | Priya is already there. A real extra hire is a new `employeeId` and `Active` |
| **Mover** | Change `department` (Lab 06) |
| **Leaver** | Set `status` to `Terminated` — do not delete the row (Lab 07) |

### 4. Optional: inspect as JSON
[`02-Start-HrApi.ps1`](scripts/02-Start-HrApi.ps1) serves the CSV on `http://127.0.0.1:8080` so you can `GET /employees`. Saviynt in the cloud **cannot** reach that URL. It is for you, not for the connector.

```powershell
.\02-Start-HrApi.ps1
Invoke-RestMethod http://127.0.0.1:8080/employees/10042
```

`Ctrl+C` stops it. No firewall rule, no elevation, if you keep the `127.0.0.1` prefix.

---

## What you have now

A source of truth that is not Entra ID: people, identified by `employeeId`, with UPNs that will be valid in your tenant. Lab 03 registers an application so Saviynt can write those people into Entra as a connected application.

Do **not** start the Saviynt 14-day instance until you are ready to sit through Labs 03–08.

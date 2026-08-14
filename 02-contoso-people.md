---
title: "Lab 02 — Contoso People"
series: "HR to Entra ID"
order: 2
difficulty: "Beginner"
estimated_time: "3 min"
tags: [demo, contoso-people, hris]
---

# Lab 02 — Contoso People

HR decides who exists. Entra is not allowed to know that Priya was hired until Saviynt says so.

**⏱ ~3 min · ☁ [contoso-people.vercel.app](https://contoso-people.vercel.app)**

| Field | Role |
|---|---|
| `employeeId` | Correlation key |
| `email` | Entra sign-in name |
| `department` | Birthright |
| `status` | `Active` or `Terminated` |

## What the audience should see

Open [https://contoso-people.vercel.app](https://contoso-people.vercel.app). Sign in.

| employeeId | Name | Department | Status | Scene |
|---|---|---|---|---|
| `10042` | Priya Sharma | Finance | Active | Joiner |
| `10001` | Alice Nguyen | Sales | Active | Mover |
| `10012` | Liam O'Connor | Sales | Active | Leaver |

Line: “Thirteen people. Microsoft 365 has not heard of Priya. HR already has.”

Click Priya. Do not hire, move, or terminate yet.

## Operator

Live app: [`hr-app/`](hr-app/) at [https://contoso-people.vercel.app](https://contoso-people.vercel.app).

Before the talk: **Email domain → Apply** so addresses match the Lab 01 suffix. Leave Priya Active, Alice in Sales, Liam Active.

Saviynt calls `GET https://contoso-people.vercel.app/api/employees` with `x-api-key`. `GET /api/health` should return `"count": 13`.

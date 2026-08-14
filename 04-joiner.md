---
title: "Lab 04 — Joiner"
series: "HR to Entra ID"
order: 4
difficulty: "Beginner"
estimated_time: "5 min"
tags: [demo, joiner, saviynt, entra-id]
---

# Lab 04 — Joiner

HR says Priya exists and is Active. Entra does not have her. Saviynt creates the account.

**⏱ ~5 min · 👤 Priya Sharma `10042`**

| Before | After |
|---|---|
| Priya Active in Contoso People | Still there |
| No `psharma@…` in Entra | Cloud user |
| No Finance group | Member of Finance |

## What the audience should see

1. **HR** — Priya, Finance, Active.
2. **Entra Users** — `psharma` missing, then present (UPN = her HR email).
3. **Entra Groups** — Finance includes Priya.
4. Optional mailbox: skip on Entra Free. The account existing is the joiner.

Line: “HR hired her. Saviynt decided Finance. Entra stored it.”

## Operator

Import `GET /api/employees` into `ContosoPeople`. Correlate on email = UPN, stamp `employeeId`. Birthright: `department = Finance` → Finance group. Security system = `ContosoEntra`.

On stage: leave Priya **Active**. Run provisioning. Do not create her by hand in Entra.

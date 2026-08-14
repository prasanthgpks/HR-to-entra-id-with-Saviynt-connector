---
title: "Lab 06 — Leaver"
series: "HR to Entra ID"
order: 6
difficulty: "Beginner"
estimated_time: "3 min on stage"
tags: [demo, leaver, saviynt, entra-id]
---

# Lab 06 — Leaver

A leaver is **not** a deleted row. HR keeps the person as `Terminated`. Saviynt **disables** the Entra account and strips birthright. The object remains so an auditor can see it.

**⏱ ~3 min on stage · 👤 Liam O'Connor `10012`**

---

## What this demonstrates

| | Wrong | This demo |
|---|---|---|
| HR | Delete the row | `status = Terminated` |
| Entra | Delete the user | **Account enabled = No** |
| Access | Hope someone remembers | Groups removed by the same birthright rules |

Deleting in Entra while HR still says Active is how the next import **recreates** them. The audience should hear that once.

## What the audience should see

1. **HR** — Liam still listed, status **Terminated**.
2. **Entra** — Liam present, **sign-in blocked / account disabled**, Sales group gone.
3. Optional: try [office.com](https://www.office.com) as Liam in InPrivate — rejected.

Line: “Terminated in HR. Disabled in Microsoft 365. Still a row, still an object, no access.”

Do not terminate Priya in the same demo if you just hired her; the room will think joiners are immediately fired. Liam is the spare Sales hire.

## Operator

Set Liam to **Terminated** in Contoso People (do not delete). Re-import from `ContosoPeople`. Confirm Saviynt’s leaver policy is **disable**, not **delete**. Re-seed after rehearsal.

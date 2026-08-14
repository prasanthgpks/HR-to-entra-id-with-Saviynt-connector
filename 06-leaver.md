---
title: "Lab 06 — Leaver"
series: "HR to Entra ID"
order: 6
difficulty: "Beginner"
estimated_time: "3 min"
tags: [demo, leaver, saviynt, entra-id]
---

# Lab 06 — Leaver

A leaver is **Terminated** in HR, not deleted. Saviynt **disables** the Entra account and strips birthright.

**⏱ ~3 min · 👤 Liam O'Connor `10012`**

| | Wrong | This demo |
|---|---|---|
| HR | Delete the row | `status = Terminated` |
| Entra | Delete the user | Account disabled |
| Access | Hope someone remembers | Groups removed |

## What the audience should see

1. **HR** — Liam listed, **Terminated**.
2. **Entra** — Liam present, sign-in blocked, Sales group gone.
3. Optional: [office.com](https://www.office.com) as Liam — rejected.

Line: “Terminated in HR. Disabled in Microsoft 365. Still a row, no access.”

Do not terminate Priya in the same demo.

## Operator

Terminate Liam in Contoso People (do not delete). Re-import. Leaver policy = **disable**, not delete. Re-seed after rehearsal.

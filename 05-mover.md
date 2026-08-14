---
title: "Lab 05 — Mover"
series: "HR to Entra ID"
order: 5
difficulty: "Beginner"
estimated_time: "3 min"
tags: [demo, mover, saviynt, entra-id]
---

# Lab 05 — Mover

Alice’s **department** changes in HR. Old birthright comes off. New birthright goes on. You do not edit her in Entra.

**⏱ ~3 min · 👤 Alice Nguyen `10001`**

| | Before | After |
|---|---|---|
| HR `department` | Sales | IT |
| Entra groups | Sales | IT; Sales **removed** |

## What the audience should see

1. Alice in Entra, member of Sales.
2. In Contoso People, set Alice’s department to `IT`, save.
3. After Saviynt runs, her Entra groups flipped.

Line: “Nobody opened Alice in Entra and clicked Groups.”

Do not also move Priya in the same take.

## Operator

Flip Alice back in the UI (or re-run `seed.sql`) before the next rehearsal. Same import / provision as the joiner.

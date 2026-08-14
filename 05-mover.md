---
title: "Lab 05 — Mover"
series: "HR to Entra ID"
order: 5
difficulty: "Beginner"
estimated_time: "3 min on stage"
tags: [demo, mover, saviynt, entra-id]
---

# Lab 05 — Mover

A mover is the same pipeline as a joiner. The row already correlated; **department** changed. Old birthright comes off. New birthright goes on. You do not edit Alice in Entra.

**⏱ ~3 min on stage · 👤 Alice Nguyen `10001`**

---

## What this demonstrates

Alice is Sales. The business moved her to IT. Contoso People is the only place that fact is allowed to change.

| | Before | After |
|---|---|---|
| HR `department` | Sales | IT |
| Entra groups | Sales birthright | IT birthright, Sales **removed** |

AGDLP-style lesson, cloud edition: grant via **groups**, not by painting permissions on the user. Saviynt adds/removes group membership. Entra just holds the groups.

## What the audience should see

1. **Before** — Alice in Entra, member of Sales, not IT.
2. **HR** — open Alice in Contoso People, set department to `IT`, save.
3. **After Saviynt runs** — Alice’s Entra groups flipped. Department on the user matches HR if you mapped it.

Line: “Nobody opened Alice in Entra and clicked Groups. That is the point of a mover.”

Do not also move Priya in the same take. One human, one lesson.

## Operator

Keep a copy of the seed (re-run `seed.sql` or flip Alice back in the UI) if you will run this again. Import / recon / provision against `ContosoPeople` then `ContosoEntra` the same way as the joiner.

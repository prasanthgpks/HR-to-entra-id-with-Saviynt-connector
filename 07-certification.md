---
title: "Lab 07 — Access certification"
series: "HR to Entra ID"
order: 7
difficulty: "Beginner"
estimated_time: "optional encore"
tags: [demo, certification, saviynt, entra-id]
---

# Lab 07 — Access certification

Joiner / mover / leaver are automated birthright. Certification is a **human** saying the extra (or leftover) access is still justified. Encore only — the core demo is Labs 04–06.

**⏱ optional · ☁ Saviynt campaign against Entra groups**

---

## What this demonstrates

Saviynt can show a manager **what** Alice has in Entra (groups) and record **keep or revoke**. Revoke writes back through the same **connected** connector. That is governance on top of provisioning, not a spreadsheet emailed at quarter-end.

## What the audience should see

1. A campaign (or a single user access view) listing Alice’s Entra groups.
2. One revoke — group disappears in Entra after the job.
3. Line: “Birthright put her in Sales. A manager can take it off. Entra is still not the place they decide.”

Skip if the 14-day tenant has no campaign UI ready. Do not build a certification programme on stage.

## Operator

Use a small campaign: one reviewer, one user, Entra groups on `ContosoEntra`. IdentCentrix entitlements are the wrong audience.

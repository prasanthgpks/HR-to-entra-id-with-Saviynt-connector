---
title: "Lab 01 — Entra tenant"
series: "HR to Entra ID"
order: 1
difficulty: "Beginner"
estimated_time: "3 min"
tags: [demo, entra-id]
---

# Lab 01 — Entra tenant

Accounts live in **Microsoft Entra ID**. Saviynt creates them here over Graph.

**⏱ ~3 min · ☁ Entra admin center**

## What the audience should see

[entra.microsoft.com](https://entra.microsoft.com)

| Open | Point at | Line |
|---|---|---|
| **Overview** | `yourprefix.onmicrosoft.com` | Contoso’s directory for this demo |
| **Users** | Admin + `Cloud Only Test` only | Priya is not here. She exists only in HR |
| **Groups** | Demo groups, or empty | Groups carry access |

Do not open Billing or App registrations on stage.

## Operator

Use a tenant **you** own. Never an employer directory. Entra ID Free is enough (no mailbox).

1. New personal Microsoft account (not your existing Azure login, not work email).
2. [Azure free account](https://azure.microsoft.com/free/) — phone + card for identity. Entra Free is not billed; do not create VMs or other Azure resources.
3. Record **tenant domain** (`….onmicrosoft.com`), **tenant ID**, and the admin UPN. MFA on the admin.
4. Create `cloudonly@<prefix>.onmicrosoft.com`, display name `Cloud Only Test`.

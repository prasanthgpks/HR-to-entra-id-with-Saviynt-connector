---
title: "Lab 01 — The directory the demo uses"
series: "HR to Entra ID"
order: 1
difficulty: "Beginner"
estimated_time: "5 min on stage"
tags: [demo, entra-id, microsoft-365]
---

# Lab 01 — The directory the demo uses

This scene proves the accounts live in **Microsoft Entra ID**, not in Active Directory. Everything Saviynt creates here is **cloud-only**. A licence, not a sync engine, turns on the mailbox.

**⏱ ~5 min on stage · ☁ Entra admin center**

---

## What this demonstrates

```mermaid
flowchart LR
  ENTRA["Entra ID<br/>the account"]
  M365["Microsoft 365<br/>mailbox"]

  ENTRA -->|"licence"| M365
```

- There is no OU tree. Birthright is **groups**.
- `On-premises sync enabled = No` means this tenant is not being fed by Entra Connect.
- Creating a user does not create a mailbox. Assigning E5 does.

## What the audience should see

[entra.microsoft.com](https://entra.microsoft.com) (or [admin.microsoft.com](https://admin.microsoft.com) if Entra refuses the browser).

| Open | Point at | Line |
|---|---|---|
| **Overview** | Primary domain `yourprefix.onmicrosoft.com` | “This is Contoso’s cloud directory for the demo.” |
| **Users** | Admin + `Cloud Only Test` only, **before** the joiner | “Priya is not here yet. She exists only in HR.” |
| **Cloud Only Test** | **On-premises sync enabled = No**, fields editable | “After Saviynt runs, Priya will look like this — born in the cloud.” |
| **Groups** | Empty, or only demo groups you created | “No Sales/Finance folders. Groups carry access.” |

Do not open Billing, App registrations, or Graph PowerShell on stage.

## What you do not say

How you signed up for the E5 trial, which card you used, or why the prefix cannot be renamed. That is operator work below.

---

## Operator: once, off stage

Use a tenant **you** own. Never an employer directory. Never the hybrid-lab tenant Entra Connect already syncs (`GpkLabs.onmicrosoft.com` or equivalent) — those users are `On-premises sync = Yes` and Graph will fight Connect.

1. Start a [Microsoft 365 E5 trial](https://www.microsoft.com/en-us/microsoft-365/enterprise/e5). Choose a **new** `onmicrosoft.com` prefix. The first account is Global Administrator — MFA on, keep it.
2. Record **tenant domain**, **tenant ID** (GUID), and the admin UPN.
3. Create `cloudonly@<prefix>.onmicrosoft.com`, display name `Cloud Only Test`. Confirm sync = **No**.
4. Confirm E5 seats exist. You need one spare for Priya if you show a mailbox.

Cancel the paid conversion before day 30. The tenant remains; the demo still works without P2 extras.

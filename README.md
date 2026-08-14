# HR to Entra ID with Saviynt connector

Private lab notes: **Contoso People → Saviynt → Microsoft Entra ID**.

Saviynt talks to Entra over **Microsoft Graph** (OAuth app registration). That is a **connected application** — import and provisioning run in the cloud. There is no Active Directory, no VirtualBox, and no VPN.

This is the sibling of the hybrid series (`IDAM-Labs`: People → Saviynt → AD → Entra Connect). Same twelve people plus Priya. Different target. **Do not use the hybrid tenant** (`GpkLabs.onmicrosoft.com` or any directory Entra Connect is already writing to).

These notes are **not published**. No GitHub Pages.

## Local preview

```powershell
npm install
npx @11ty/eleventy --serve
```

## Reused from the hybrid lab

| This repo | From hybrid lab |
|---|---|
| Site shell (Eleventy, layouts, CSS) | `iam-lab-notes` |
| [`scripts/02-employees.csv`](scripts/02-employees.csv) | Contoso People roster (emails retargeted) |
| Lab 01 | Entra tenant walkthrough (rewritten: no AD, no Connect) |
| Saviynt tour screenshots | University L200 IdentCentrix UI |

## Labs

See [`00-plan.md`](00-plan.md). Start at Lab 01 (a **new** Microsoft 365 tenant), then stamp the HR CSV with that domain in Lab 02.

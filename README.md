# HR to Entra ID with Saviynt connector

**Demo notes** (private): a hire in the **Contoso People** web app becomes a Microsoft 365 account because Saviynt reads HR over HTTPS and writes Entra over Graph.

What you show: **HR UI → Saviynt → Entra**, joiner / mover / leaver, two connected apps.

- Notes: start at [`00-plan.md`](00-plan.md)
- HR app source: [`hr-app/`](hr-app/)
- Live HR: [https://contoso-people.vercel.app](https://contoso-people.vercel.app)

Sibling hybrid series (`IDAM-Labs`) is the AD story. Separate tenant. Not published.

## Local preview (notes)

```powershell
npm install
npx @11ty/eleventy --serve
```

## Local preview (HR app)

```powershell
cd hr-app
copy env.example .env.local
npm install
npm run dev
```

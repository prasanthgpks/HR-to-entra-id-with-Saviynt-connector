# Saviynt REST JSON — Contoso People

How the **Add/Update Connection** form maps onto Contoso People. Paste values live in `LabSetup.md`. Do not put the real `HR_API_KEY` in git.

The REST type has **no Username / Password**. Those boxes exist on AD. Here everything is JSON.

---

## Form fields (top of the page)

| Field | What to do | Why |
|---|---|---|
| **Connection Name** | `ContosoPeople` | Object name in the Connections list |
| **Connection Description** | `Contoso People HR` | Comment only |
| **Connection Type** | `REST` | Tells Saviynt to use these JSON boxes, not LDAP |
| **Email Template** | leave **Select** | Would email someone on connection events. Not needed |
| **SSL Certificate** | leave **Select** | Vercel already has a public TLS cert. Only upload a cert if you were calling a private host with a lab CA |
| **Default SAV Role** | leave empty | Would grant a Saviynt admin role to imported users. HR people must not become admins |
| **Save Template** | ignore | Saves this JSON as a reusable template |
| **Add Certificate** | ignore | Same as SSL Certificate |

---

## The four JSON boxes

| Box | Used now? | Job |
|---|---|---|
| **ConnectionJSON** | **Yes — required** | How Saviynt **authenticates** and how **Test Connection** calls the API |
| **ImportUserJSON** | Yes, before you import people | How Saviynt **maps** each JSON person onto a Saviynt **user** |
| **ImportAccountEntJSON** | **Leave empty** | Accounts and entitlements on a *target* (Entra groups, AD accounts). HR is the *source of people*, not a target |
| **STATUS_THRESHOLD_CONFIG** | **Leave empty** | Safety rails on account import (e.g. “if the feed shrinks by 50%, abort”). Not for this HR user import |

**Test Connection** only reads **ConnectionJSON**. Import jobs read **ImportUserJSON**.

---

## ConnectionJSON — field by field

Saviynt expects this shape:

```text
authentications → <name> → how to call the HTTP API
```

We named the auth block `userAuth`. **ImportUserJSON** must use the same name in `"connection": "userAuth"`.

| JSON key | Our value | Meaning |
|---|---|---|
| `authentications` | object | One or more named login methods. REST can have several; we only need one |
| `userAuth` | (name we chose) | Handle other JSON refers to. Any name is fine if it matches ImportUserJSON |
| `authType` | `Basic` | Saviynt’s **connector** auth class. We are **not** sending HTTP Basic to Contoso People. The connector still wants a type; `Basic` is the simplest stub when the real secret is a header |
| `url` | `https://contoso-people.vercel.app/api/employees` | Default URL for this auth block |
| `httpMethod` | `GET` | Contoso People only lists people with GET |
| `httpParams` | `{}` | Query/body params. **Must be an object, even if empty.** Saviynt calls `.put()` on this map; omitting it causes `Cannot invoke method put() on null object` |
| `httpHeaders` | `x-api-key`, `Accept` | Headers on every call that uses this auth. **`x-api-key` is the real login.** `Accept` asks for JSON |
| `httpContentType` | `application/json` | Body type. GET has no body; Saviynt still wants the field |
| `properties` | `{}` | Extra auth properties (username/password for some apps). **Must be `{}` if unused** — same `.put()` crash if missing |
| `expiryError` | `ExpiredAuthenticationToken` | If the API ever returned this string, Saviynt would refresh a token. Our API does not use OAuth tokens; this is unused boilerplate |
| `retryFailureStatusCode` | `[401]` | HTTP statuses that mean “try auth again” |
| `authError` | `unauthorized`, `Unauthorized` | Response text that means “key is wrong”. Matches `{ "error": "unauthorized" }` from our API |
| `timeOutError` | `Read timed out` | Treat a hang as a timeout, not a successful empty import |
| `errorPath` | `error` | JSON path of the error message (`{ "error": "…" }`) |
| `maxRefreshTryCount` | `1` | How many times to retry token refresh. We do not refresh; keep it at 1 |
| `tokenResponsePath` | `access_token` | Where an OAuth token would sit. Unused for API key; Saviynt still expects the key |
| `tokenType` | `Basic` | Must sit with `authType`. Unused for the API key header |
| `accessToken` | `Basic xx` | Placeholder. Saviynt REST often requires *some* token string. The API key in `x-api-key` is what Contoso People checks |
| `testConnectionParams` | object | **Only used by Save & Test Connection** |
| `testConnectionParams.http.url` | same employees URL | The test GET. Use `/api/employees` (needs the key), not `/api/health` (no key — a green test would not prove auth) |
| `testConnectionParams.http.httpHeaders` | same `x-api-key` | Test must send the key or you get 401 |
| `testConnectionParams.http.httpMethod` | `GET` | Same as a real import |

`${password}` would work **if** the REST form had a Password box. This form does not, so the key is written in the JSON.

Replace `YOUR_HR_API_KEY` in **every** `x-api-key` line (ConnectionJSON has two; ImportUserJSON has one).

---

## ImportUserJSON — field by field

Used when you run a **user import** job, not by Test Connection.

| JSON key | Our value | Meaning |
|---|---|---|
| `connection` | `userAuth` | Reuse the auth block from ConnectionJSON |
| `url` | employees URL | Feed to import |
| `httpMethod` | `GET` | Same as Test |
| `httpHeaders` | `x-api-key`, `Accept` | Import must send the key too. Saviynt does not always copy headers from ConnectionJSON |
| `httpContentType` | `application/json` | Same as above |
| `listField` | `""` (empty) | JSON path of the **array of people**. Empty means the HTTP body **is** the array: `[ {...}, {...} ]`. If the API were `{ "employees": [ ... ] }`, this would be `employees` |
| `keyField` | `username` | Saviynt unique key for the person. We set username = HR **email**, which will match Entra UPN |
| `colsToPropsMap` | map | Each Saviynt user attribute ← one field from the JSON person |

### `colsToPropsMap` syntax

Each line is:

```text
saviyntAttribute: jsonField~#~type
```

- Left: Saviynt user property
- Right, before `~#~`: field name on each person in the API (`employeeId`, `email`, …)
- After `~#~`: `char` = text. Use `bool` / `date` only if you know Saviynt wants that type

| Saviynt attribute | JSON field | Why |
|---|---|---|
| `username` | `email` | Login name in Saviynt. Same as Entra UPN after **Email domain → Apply** |
| `systemUserName` | `email` | Secondary system name; keep aligned |
| `displayname` | `email` | List label. Email is unambiguous (two people can share a first name) |
| `firstname` | `firstName` | |
| `lastname` | `lastName` | |
| `email` | `email` | |
| `employeeid` | `employeeId` | Durable HR key (`10042`). Correlation later |
| `departmentname` | `department` | Birthright input (Finance / Sales / IT / HR) |
| `jobdescription` | `title` | Job title from HR |
| `customproperty1` | `department` | Spare copy of department if a rule cannot see `departmentname` |
| `customproperty2` | `status` | `Active` or `Terminated` |
| `customproperty3` | `managerEmployeeId` | Manager’s HR id |
| `customproperty4` | `hireDate` | |
| `statuskey` | `status` | Saviynt active/inactive. If import leaves everyone inactive, we will add an explicit Active/Terminated map |

Our API person looks like:

```json
{
  "employeeId": "10042",
  "firstName": "Priya",
  "lastName": "Sharma",
  "email": "psharma@yourprefix.onmicrosoft.com",
  "department": "Finance",
  "title": "Financial Analyst",
  "managerEmployeeId": "10011",
  "hireDate": "2026-08-03",
  "status": "Active"
}
```

---

## What Contoso People actually checks

| Call | Auth | Use |
|---|---|---|
| `GET /api/health` | none | Browser check that the app is up. Do not use this as Test Connection |
| `GET /api/employees` | `x-api-key` **or** `Authorization: Bearer <key>` **or** HTTP Basic (password = key) | Saviynt import and Test Connection |
| UI password `contoso-demo` | session cookie | Website only. Saviynt never uses it |

---

## Test Connection failures

| Result | Likely cause |
|---|---|
| **Successful** | GET `/api/employees` returned 200 with the key |
| 401 / unauthorized | `YOUR_HR_API_KEY` not replaced, or not the value from `.env.local` / Vercel |
| Timeout / DNS | Typo in the host. Must be `https://contoso-people.vercel.app` |
| JSON parse error | Smart quotes, a trailing comma, or a missing comma after an edit |
| `Cannot invoke method put() on null object` | Missing `"httpParams": {}` or `"properties": {}` (Saviynt Groovy, not the HR API) |
| SSL error | Do not add a cert. Leave SSL Certificate on Select |

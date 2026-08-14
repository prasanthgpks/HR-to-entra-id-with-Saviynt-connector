# Lab setup

Operator log for **HR → Saviynt → Entra**. Not a demo scene. Tick boxes as we go. Do not put client secrets, API keys, or the Graph secret **Value** in this file.

Last updated: 14 Aug 2026 (`ContosoPeople` + `ContosoEntra` tests Successful)

---

## Recorded values

| Item | Value |
|---|---|
| Entra primary domain | `_yourprefix.onmicrosoft.com_` |
| Entra tenant ID | |
| Admin UPN | |
| App registration name | `Saviynt Contoso Entra` |
| Application (client) ID | |
| Contoso People | https://contoso-people.vercel.app |
| UI password | `contoso-demo` (password only, no username) |
| Saviynt REST URL | `https://contoso-people.vercel.app/api/employees` |
| `HR_API_KEY` | from `hr-app/.env.local` or Vercel env — not this file |
| Graph client secret | Certificates & secrets **Value** — not this file |

---

## Done

- [x] Private GitHub repo: [HR-to-entra-id-with-Saviynt-connector](https://github.com/prasanthgpks/HR-to-entra-id-with-Saviynt-connector)
- [x] Contoso People web app (Vercel + Supabase), live at the URL above
- [x] Demo notes recast as this series (no hybrid lab)
- [x] Azure Free signup → new Entra ID tenant (Entra Free, no mailbox)
- [x] Signed in to Contoso People UI
- [x] Saviynt `ContosoPeople` REST — **Save & Test Connection** Successful
- [x] Saviynt `ContosoEntra` Azure AD — **Save & Test Connection** Successful

---

## In progress — Lab 01 / 02 leftovers

- [ ] MFA on the Entra admin
- [ ] Create `Cloud Only Test` (`cloudonly@<prefix>.onmicrosoft.com`)
- [ ] Security groups: `Finance`, `Sales`, `IT`, `HR`
- [ ] Contoso People **Email domain → Apply** = the Entra `onmicrosoft.com` suffix
- [ ] Confirm Priya `10042` is Active, Alice `10001` in Sales, Liam `10012` Active
- [ ] Priya is **not** in Entra Users

---

## In progress — Lab 03 app registration

In the **new** tenant ([entra.microsoft.com](https://entra.microsoft.com)):

- [ ] **App registrations → New registration** → `Saviynt Contoso Entra`, single tenant, no redirect
- [ ] Copy **Application (client) ID** and **Directory (tenant) ID** into the table above
- [ ] **Certificates & secrets** → client secret (copy **Value** once; keep it out of git)
- [ ] Graph **application** permissions: `User.ReadWrite.All`, `Group.ReadWrite.All`, `Directory.Read.All`, `Organization.Read.All`
- [ ] **Grant admin consent** — every row green

---

## In progress — Saviynt connections

Sign in to **your** EIC URL. **Admin → Identity Repository → Connections**. Leave any existing rows. **Actions → Create Connection** (twice).

### A. `ContosoPeople` (REST → HR)

This form has **no Username / Password**. Leave **Email Template** and **SSL Certificate** on **Select**. Leave **Default SAV Role** empty. Leave **ImportAccountEntJSON** and **STATUS_THRESHOLD_CONFIG** empty.

Field-by-field: [`saviynt-rest-json.md`](saviynt-rest-json.md).

Copy `HR_API_KEY` from `hr-app/.env.local`. Not `contoso-demo`. Replace every `YOUR_HR_API_KEY` below (three places).

- [ ] Connection name `ContosoPeople`, type **REST** (already set)

**ConnectionJSON** (required for Test Connection). Saviynt requires empty `httpParams` and `properties` objects — omitting them causes `Cannot invoke method put() on null object`.

```json
{
  "authentications": {
    "userAuth": {
      "authType": "Basic",
      "url": "https://contoso-people.vercel.app/api/employees",
      "httpMethod": "GET",
      "httpParams": {},
      "httpHeaders": {
        "x-api-key": "YOUR_HR_API_KEY",
        "Accept": "application/json"
      },
      "httpContentType": "application/json",
      "properties": {},
      "expiryError": "ExpiredAuthenticationToken",
      "authError": ["unauthorized", "Unauthorized"],
      "timeOutError": "Read timed out",
      "errorPath": "error",
      "retryFailureStatusCode": [401],
      "maxRefreshTryCount": 1,
      "tokenResponsePath": "access_token",
      "tokenType": "Basic",
      "accessToken": "Basic xx",
      "testConnectionParams": {
        "http": {
          "url": "https://contoso-people.vercel.app/api/employees",
          "httpHeaders": {
            "x-api-key": "YOUR_HR_API_KEY",
            "Accept": "application/json"
          },
          "httpParams": {},
          "httpContentType": "application/json",
          "httpMethod": "GET"
        },
        "successResponses": {
          "statusCode": [200]
        },
        "successResponsePath": "",
        "errors": ["unauthorized"],
        "errorPath": "error"
      }
    }
  }
}
```

**ImportUserJSON** (HR people → Saviynt users). Paste this on the existing `ContosoPeople` connection, same `YOUR_HR_API_KEY` as ConnectionJSON. Include `"httpParams": {}` so import does not hit the same `put()` error.

```json
{
  "connection": "userAuth",
  "url": "https://contoso-people.vercel.app/api/employees",
  "httpMethod": "GET",
  "httpHeaders": {
    "x-api-key": "YOUR_HR_API_KEY",
    "Accept": "application/json"
  },
  "httpParams": {},
  "httpContentType": "application/json",
  "listField": "",
  "keyField": "username",
  "colsToPropsMap": {
    "username": "email~#~char",
    "systemUserName": "email~#~char",
    "displayname": "email~#~char",
    "firstname": "firstName~#~char",
    "lastname": "lastName~#~char",
    "email": "email~#~char",
    "employeeid": "employeeId~#~char",
    "departmentname": "department~#~char",
    "jobdescription": "title~#~char",
    "customproperty1": "department~#~char",
    "customproperty2": "status~#~char",
    "customproperty3": "managerEmployeeId~#~char",
    "customproperty4": "hireDate~#~char",
    "statuskey": "status~#~char"
  }
}
```

- [x] Scroll to **Save & Test Connection** → **Successful** (14 Aug 2026)
- [ ] 401 = wrong key. Timeout = wrong URL. Health (no key): https://contoso-people.vercel.app/api/health

### B. `ContosoEntra` (Azure AD → Graph)

Use the **new** Entra tenant (app registration), not any other directory.

- [ ] Connection name: `ContosoEntra`
- [ ] Connection type: **AzureAD** / **Azure AD** / **Entra ID** (whatever the list shows). **Not** AD, **not** REST
- [ ] **CLIENT_ID**: Application (client) ID
- [ ] **CLIENT_SECRET**: secret **Value** (not Secret ID)
- [ ] **AZURE_TENANT_ID** / **AAD_TENANT_ID** / **TENANT_ID**: Directory (tenant) ID
- [ ] Authentication endpoint: `https://login.microsoftonline.com`
- [ ] Microsoft Graph endpoint: `https://graph.microsoft.com`
- [ ] Azure management endpoint (if the form asks): `https://management.azure.com`
- [ ] Create users: **YES** if the field exists
- [x] **Save & Test Connection** → **Successful** (14 Aug 2026)
- [ ] Click **Yes** on “import your Azure AD objects” (small demo tenant — seconds). Then **Admin → Job Control Panel** until the job finishes
- [ ] Confirm Entra groups `Finance`, `Sales`, `IT`, `HR` appear as entitlements. Confirm Priya is still **not** an Entra user

---

## In progress — Import HR users

This is **people from Contoso People into Saviynt**. It is not the Entra import you already ran.

- [ ] **Admin → Identity Repository → Connections → ContosoPeople**
- [ ] Paste **ImportUserJSON** (block above). Same API key as ConnectionJSON
- [ ] **Save**. Re-test only if you want; it can stay Successful
- [ ] **Admin → Job Control Panel → + Add New Job**
The **first** Job Type dropdown must be **User Import**. Do not use Application Data Import (Single or Multi Threaded). Those only offer Import Type **Accounts** or **Access** (Entra). `ACCOUNTS_ContosoEntra` already did that.
- [ ] Name: `UserImport_ContosoPeople`
- [ ] Connection / External connection: `ContosoPeople`. Do **not** set System to `ContosoEntra`
- [ ] Schedule: leave a dummy (e.g. hourly). You will **Run Now** from the job list
- [ ] **Save** → on the job row, **Actions → Run Now** (or equivalent)
- [ ] Wait until the job is **Success** in Job Control Panel
- [ ] **Admin → Identity Repository → Users** — find Priya (`10042` / `psharma@…`). She must exist here and still **not** in Entra

If **User Import** is not in the first Job Type list, screenshot that dropdown (or list the names) before saving.

---

## Next

- [ ] HR User Import job Success — Priya in Saviynt Users, not in Entra
- [ ] Birthright: department → group (`Finance`, `Sales`, `IT`, `HR`) on `ContosoEntra`
- [ ] Lab 04 joiner — Priya
- [ ] Lab 05 mover — Alice
- [ ] Lab 06 leaver — Liam
- [ ] Lab 07 certification (optional)

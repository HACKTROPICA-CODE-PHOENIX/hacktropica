# 🏢 NGO + Campaign Creation Flow (Zod आधारित)

## ✅ Current Status

* Wallet connection is working
* MongoDB connection exists
* Upload/API logic already implemented
* Zod schemas exist in `validators` folder

---

## 🎯 Objective

Implement:

1. NGO Creation (via Navbar button)
2. NGO Dashboard
3. Campaign Creation under NGO

---

# 🧩 FEATURE 1: NGO Creation

## 📍 Entry Point

Navbar → Button: **"Create NGO"**

Route:

```
/create-ngo
```

---

## 📦 Form Requirements

Use Zod schema from:

```
src/validators/ngo.schema.ts
```

Fields must match schema EXACTLY.

---

## 🧠 Behaviour

* User must connect wallet
* Wallet address is part of NGO data
* On submit:

  * Validate using Zod
  * Call existing backend upload API
  * Save NGO in MongoDB

---

## 📁 Files to Create

```
src/app/create-ngo/page.tsx
src/components/forms/ngo-form.tsx
```

---

## 🎨 UI

Use shadcn:

* Card
* Input
* Button
* Form
* Label

---

## 🔁 After Success

* Redirect to:

```
/dashboard
```

---

# 🧩 FEATURE 2: NGO Dashboard

## 📍 Route

```
/dashboard
```

---

## 🧠 Behaviour

* Fetch NGO using wallet address
* If NGO not found:

  * Show: "Create NGO first"

---

## 📦 Display

* NGO Name
* Basic details
* List of campaigns (if any)

---

## ➕ Add Button

Button: **"Add Campaign"**

---

# 🧩 FEATURE 3: Campaign Creation

## 📍 Trigger

Dashboard → "Add Campaign"

---

## 📦 Form Requirements

Use Zod schema from:

```
src/validators/campaign.schema.ts
```

---

## 🧠 Behaviour

* Form fields must match schema
* NGO ID or wallet should be linked
* On submit:

  * Validate via Zod
  * Call existing upload API
  * Save campaign in MongoDB

---

## 📁 Files to Create

```
src/components/forms/campaign-form.tsx
```

---

## 🎨 UI

Use shadcn:

* Dialog (recommended) OR separate page
* Input
* Textarea
* Button

---

## 🔁 After Success

* Close modal / redirect
* Refresh campaign list

---

# 🔌 API Usage

IMPORTANT:

* Do NOT create new APIs
* Reuse existing upload logic
* Search project for:

  * campaign upload
  * ngo upload
  * database insert functions

---

# 🧠 Data Flow

1. Wallet connects
2. User creates NGO → stored in DB
3. Dashboard fetches NGO
4. User creates campaigns
5. Campaigns linked to NGO

---

# ⚠️ Rules

* DO NOT change Zod schemas
* DO NOT hardcode fields
* DO NOT bypass validation
* DO NOT duplicate API logic

---

# 🧪 Validation Flow

Use:

* react-hook-form
* zodResolver

---

# 🚫 Out of Scope

* Authentication system
* Editing NGO
* Deleting campaigns
* File/image uploads (unless already implemented)

---

# ✅ Completion Criteria

* Navbar has "Create NGO"
* NGO form works with Zod validation
* NGO stored in MongoDB
* Dashboard fetches NGO
* Campaign form works
* Campaign saved in MongoDB
* Campaign visible in dashboard

---

# 🔥 Final Goal

User can:

1. Create NGO
2. Open dashboard
3. Add campaigns

All using validated schema + existing backend

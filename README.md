# Live Project : https://student-management-system-frontend-hzg2.onrender.com

# Student Management System —  README

A concise, **content‑only** README for your Node.js + Apollo GraphQL backend that powers the Student Management System. This document explains what the service does, 
how to run it, how it’s deployed, and how to work with it—without embedding source code.

---

## Overview

* **Purpose:** Provide a clean GraphQL API for managing student records (create, read, update, delete), export student data.
* **Frontend (Render):** React
* **Backend GraphQL Endpoint:** GraphQl, Node.js,Apollo Server
* **Primary Users:** Currently not focued on login functionality .

---

## Core Features

* **GraphQL CRUD** for students (add, update, delete, list, get by ID).
* **Filtering & Search** by name, branch, section, batch (case‑insensitive where relevant).
* **Bulk Operations:**
* **CORS** locked to approved origins (Render frontend + localhost for dev).
* **MongoDB (Atlas)** with Mongoose for schema/validation and indexes.
* **Deploy‑ready for Render** (frontend as Static Site, backend as Web Service).

---

## Architecture (High Level)

* **Client (React + Apollo Client):** Queries/mutations to `/graphql`;.
* **API (Node.js + Apollo Server v4):** Standalone Apollo server configured with CORS and request context for auth.
* **Database (MongoDB Atlas + Mongoose):** One `Student` collection with indexes (e.g., unique email) for data integrity and quick lookups.
---

## Data Model (Conceptual)

**Student**

* `id` (ObjectID) — unique identifier
* `name` (String, required)
* `email` (String, required, unique, lowercase)
* `branch` (String, required)
* `section` (String, required)
* `batch` (Number, required)
* `createdAt` / `updatedAt` (timestamps)

> **Notes**
>
> * Keep `email` unique to avoid duplicates.
> * Consider indexes for frequent filters: `{ name: 1 }, { branch: 1 }, { section: 1 }, { batch: 1 }`.

---

## GraphQL Surface (What’s Available)

* **Types:** `Student`, input type for creating/updating students.
* **Queries:**

  * `students(name, branch, section, batch): [Student!]!` — list with optional filters.
  * `student(id: ID!): Student` — fetch a single record by ID.
* **Mutations:**

  * `addStudent(input: StudentInput!): Student!`
  * `updateStudent(id: ID!, input: StudentInput!): Student!`
  * `deleteStudent(id: ID!): Student!`

---

## Environment Variables

Create a `.env` file at the backend root with:

* `PORT` — API port (e.g., `4000`)
* `MONGO_URI` — MongoDB Atlas connection string (use the `mongodb+srv://` URI)

---

## Running Locally (Quick Guide)

1. **Install Node.js 18+** (Node 20 supported).
2. **Install dependencies:** `npm install`.
3. **Configure `.env`** with `MONGO_URI`, `PORT`
4. **Start the server:** `npm run dev` (nodemon) or `npm start`.
5. **Open GraphQL:** `http://localhost:<PORT>/graphql`.
6. **Frontend (dev):** Ensure CORS includes `http://localhost:3000`.

---

## Deployment (Render)

**Frontend (Static Site):**

* **Type:** Static Site
* **Build Command:** `npm run build`
* **Publish Directory:** `build`
* **Root Directory:** Your `client/` folder

**Backend (Web Service):**

* **Type:** Web Service (Node)
* **Start Command:** `node server.js` (or your entry file)
* **Environment:** set `MONGO_URI`, `PORT`
* **Health & Logs:** Use Render dashboard to view logs for connection or CORS issues

> Ensure the backend’s CORS `origin` list contains your Render frontend URL and any local dev origins you need.

---

## Bulk Import / Export (How It Works)

**Export (Excel):**

* For admin UI downloads, generate Excel in the **frontend** from the currently filtered list and trigger a download (e.g., via `xlsx`).

---

## Troubleshooting

* **`MongooseServerSelectionError` / TLS errors:**

  * Confirm Atlas Network Access (IP allowlist or “Allow access from anywhere”).
  * Verify your `MONGO_URI` is correct and uses `+srv`.
  * Check cluster status and node version (Node 18+/TLS supported).
* **CORS blocked:** Add your exact frontend origin to `ALLOWED_ORIGINS` and redeploy.
* **GraphQL 404 on Render:** Double‑check service URL and that the path is `/graphql`. 
---

## Roadmap
* Soft delete & audit logs
* Attendance and marks modules
* Improved CSV/XLSX templates & validation feedback
* Automated tests (unit/integration) and CI

---

## Contributing

* Open an issue for feature requests/bugs.
* Use a feature branch for PRs; keep commits scoped and descriptive.
* Follow conventional commit messages if possible.


---

## Acknowledgements

* Apollo Server & GraphQL ecosystem
* MongoDB Atlas
* Render (hosting)
* Open‑source libraries for CSV/XLSX handling

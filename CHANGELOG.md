# 📦 Changelog

All notable changes to **create-node-spark** will be documented in this file.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

# Phase 1: The Sparking Phase (Completed)

## [2.3.0] - 2025-05-10

## Added

**MySQL Support**
- Introduced MySQL compatibility for backend apps.
- Added support for MySQL databases.
- Integrated `knex`, and `mysql2` packages to manage MySQL connections and queries.

### Changed

- Updated database connection handling to support both MongoDB and MySQL.
- Minor bug fixes related to database connection handling.


---

# [2.2.0] - 2025-05-09

## Added:

- Multiple file upload support (Multer integrated)

- Public folder structure:

```bash
/public

  /images

  /css

  /js

  /temp
```

## 🛠️ Improvements:

- Added /services folder inside /src

- Added /utils folder inside /src

Cleaned up and enhanced overall folder structure for clarity & scalability

---

## [2.1.0] — 2025-05-08

**🌱 Database Selection Added:**

- Choose between None (no DB setup) or MongoDB when scaffolding your project.

**🔗 Smart DB Bootstrapping:**

- When MongoDB is selected, the generated index.js ensures:

- The server only starts after a successful DB connection.

- If no DB (None), it starts immediately as before.

**🛠 Environment Config Improved:**

- ENV variables now live in a dedicated config/env.config.js file for better organization.

- 🔧 Minor code cleanups & internal improvements.

---

## [2.0.0] — 2025-05-06

### 🚀 Major Upgrade

- **Added TypeScript support**
- Option to scaffold in **JavaScript** or **TypeScript**
- Kept detailed folder structure from 1.1.0
- **Removed built-in auth and Multer installation** (focus on clean, unopinionated scaffolding)
- **Added “None” option** — if no framework is selected, uses native Node.js `http` module to set up a basic server
- Improved CLI prompts and **terminal UI**

---

## [1.1.0] — 2025-05-04

### ✨ Features

- Added **ESLint** option
- Improved output folder structure:
  - `src/controllers`
  - `src/models`
  - `src/routes`
  - `src/middlewares`
  - `src/utils`
  - `src/config`

---

## [1.0.1] — 2025-05-03

### 🎉 Fixed a minor Bug

---

## [1.0.0] — 2025-05-03

### 🎉 Initial Release

- Supports **JavaScript** scaffolding
- Built-in installation for:
  - **Authentication setup**
  - **Multer** for file uploads
- Basic Express server setup

---

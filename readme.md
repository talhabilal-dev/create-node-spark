# 🚀 create-node-spark

The fastest way to scaffold production-ready Node.js backends — no manual setup, no headaches.

![npm](https://img.shields.io/npm/v/create-node-spark)
![License](https://img.shields.io/github/license/talhabilal-dev/create-node-spark)
![Downloads](https://img.shields.io/npm/dm/create-node-spark)

---

## ✨ Features

✅ **Interactive CLI Setup**  
Answer just **three questions**:

- Enable auth?
- Enable multer?
- Enable ESLint?  
  → Boom! Your backend is ready.

✅ **Production-Ready Folder Structure**  
No more messy files — get a scalable layout:

```bash my-app/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
├── .env
├── eslint.config.js (if selected)
├── package.json (ESM ready)
└── package-lock.json
```

✅ **Auto Installs Key Dependencies**

Sets up:

- Express
- dotenv
- jsonwebtoken
- nodemon (for development)

✅ **ESM Conversion Out of the Box**  
Skip CommonJS headaches — enjoy modern ES modules.

✅ **Multer File Upload Integration**  
 → **No more lost files**. Your backend can accept file uploads.

✅ **ESLint Config Generator**  
Auto-generates a clean `eslint.config.js` for code quality.

✅ **Minimal Setup, Maximum Power**  
Stop wasting time on boilerplate — start building immediately.

---

## 📦 Installation

```bash
npm install -g create-node-spark
```

# ⚙️ Usage

```bash
create-node-spark
```

# Use directly (no install)

```bash
npx create-node-spark
```

This will launch the interactive CLI and ask:

    porject name :

    include auth? (y/n)

    include multer? (y/n)

    Enable ESLint? (y/n)

After answering, it generates:

    A complete folder structure

    Installed dependencies

    Configured .env and eslint.config.js

    ESM-ready package.json

# 🛠 CLI Options

If you prefer non-interactive mode (coming soon), you’ll be able to pass flags like:

```bash
create-node-spark --auth --multer --eslint
```

**Note: This is planned for future versions!**

# 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check issues or submit a pull request.

- Fork the project

- Create your feature branch (git checkout -b feature/my-feature)

- Commit your changes (git commit -m 'Add awesome feature')

- Push to the branch (git push origin feature/my-feature)

- Open a pull request

# 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

# 🌟 Show Your Support

If you like this project, please ⭐ star the repo to help others discover it!

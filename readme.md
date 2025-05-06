# 🚀 create-node-spark

> The fastest way to scaffold production-ready Node.js backends — no manual setup, no headaches.

![npm](https://img.shields.io/npm/v/create-node-spark)
![License](https://img.shields.io/github/license/talhabilal-dev/create-node-spark)
![Downloads](https://img.shields.io/npm/dm/create-node-spark)

---

# 🛠️ Introduction

> ⚡ Spark your Node.js backend, skip the boilerplate.

**create-node-spark** is a powerful CLI (Command Line Interface) tool designed to scaffold production-ready Node.js backend projects with ease. Inspired by tools like Create Next App and Vite, this tool removes the boilerplate pain by generating a clean, structured, and configurable Node.js project — so you can focus on building features, not setting up folders and configs.

Whether you’re a beginner wanting a head start or a seasoned developer tired of setting up the same repetitive structure, create-node-spark helps you spark your next backend project in seconds.

# ❓ What is Create-Node-Spark?

create-node-spark is a flexible scaffolding tool built specifically for Node.js backend projects, focusing on REST API development.

Here’s what it sets up for you under the hood:

- ✅ Choose between JavaScript or TypeScript at scaffold time

- ✅ Uses modern ESM (ECMAScript Modules) — no old CommonJS clutter

- ✅ Built on Express.js, one of the most popular and battle-tested Node.js frameworks

- ✅ Includes an optional ESLint setup to keep your codebase clean and consistent

- ✅ Depends only on Inquirer (for CLI prompts) — keeping external dependencies light and minimal

> **Note** :We plan to support additional frameworks (like Fastify) in the future to give developers even more flexibility.

This tool helps developers skip the boring setup work and jump straight into coding their REST API, with a project structure and tooling that fits both beginners and advanced teams.

# 🤔 Why Use Create-Node-Spark?

`create-node-spark` makes setting up a Node.js backend project quick and painless, so you can focus on the features that matter, not the boilerplate. Here’s why you should choose it:

### ⚡ Save Time

No more manually setting up project structure, dependencies, or config files. With just a single command, you get a fully scaffolded backend project ready to go.

### 🛠️ Flexible

Whether you're working with JavaScript or TypeScript, this tool adapts to your needs. Choose your preferred language when creating your project, and create-node-spark will scaffold accordingly.

### 🌍 Minimal Dependencies

Unlike many other tools that bring along bulky dependencies, create-node-spark only relies on Inquirer, keeping your project lean and focused. No unnecessary bloat.

### 🔧 Customizable Setup

Not only can you choose between JavaScript or TypeScript, but you also have the option to enable or skip ESLint setup based on your project needs.

### 🌱 Future-Proof

We’re continuously working to add more features, including support for other frameworks like Fastify. The tool is built to grow alongside the Node.js ecosystem.

### 🔥 Easy for Beginners & Experts

Whether you’re just starting out or you're an experienced developer, create-node-spark offers a clean, organized starting point with flexibility. It's the best of both worlds — beginner-friendly yet flexible enough for advanced users.

# 🔑 Key Features

- **Choice of JavaScript or TypeScript**

  Choose your preferred language for your backend project.Whether you want the simplicity of JavaScript or the power of TypeScript, create-node-spark handles both.

- **REST API Scaffold**

  Pre-configured for building REST APIs, giving you all the essentials to start developing your backend right away.

- **Modern JavaScript with ESM**

  Uses ECMAScript Modules (ESM), so you don’t need to worry about CommonJS quirks. Clean, modern code out of the box.

- **Express Framework**

  Scaffolds your project with Express.js, a fast, unopinionated, and minimal web framework that’s perfect for building scalable REST APIs.

- **Optional ESLint Setup**

  Ensure your code stays clean and consistent with the optional ESLint setup. You can skip it if you prefer not to use it.

- **Minimal Dependencies**

  Relies on just Inquirer, keeping the tool lightweight and avoiding unnecessary bloat. It does exactly what you need — and no more.

- **Customizable Prompts**

  Get options for language choice, ESLint setup, and more during project creation, giving you full control over the final scaffolded project.

- **Future-Ready**

  With plans to add more frameworks like Fastify, this tool is always evolving to meet developers' needs.

# 📦 Installation

There are three easy ways to install create-node-spark. Choose the method that works best for you:

**1. Using Direct NPX**

The quickest way to get started is by running the following command directly from your terminal. This method does not require any installation:

```bash
npx create-node-spark@latest
```

This will always use the latest version of the tool without needing to install anything globally.

**2. Using npm install**

If you prefer to install it globally, you can use npm. Run the following command to install create-node-spark globally:

```bash
npm install -g create-node-spark
```

Once installed, you can run the tool from anywhere on your system using:

```bash
create-node-spark
```

**3. Cloning the Repository**

- If you want to have full control over the source code or contribute to the project, you can clone the repository. Here’s how:

Clone the repository to your local machine:

```bash
git clone https://github.com/talhabilal-dev/create-node-spark.git
```

- Navigate to the project directory:

```bash
cd create-node-spark
```

- Run the following commands to link the project globally and install dependencies:

```bash
npm link
npm install -g
```

After this, you can use the tool globally just like the other installation methods.

# 🚀 Usage

Once create-node-spark is installed, using it is a breeze. Here’s how you can get started with scaffolding your new Node.js backend project:

1. Run the Tool

To create a new Node.js backend project, simply run the following command:

```bash
create-node-spark
```

You’ll be prompted with a few configuration options:

**Choose the language**: Select either JavaScript or TypeScript for your project.

**Enable ESLint:** Choose whether or not to include ESLint for linting your code.

Follow the Prompts

The CLI tool will walk you through the setup, asking for:

Language selection (JavaScript or TypeScript)

> ESLint configuration (Press space to select, a to toggle all, i to invert selection)

After answering these prompts, the tool will automatically scaffold your new project, creating all necessary files and folder structure. 3. Start Developing

Once the project has been generated, you can immediately start developing your API. The scaffolding includes a ready-to-go Express setup, with all the necessary configurations in place to help you hit the ground running.

# 🎨 Example Output

When you run create-node-spark, the tool scaffolds your project based on the choices you make. Here’s what the generated project will look like for different configurations:

## JavaScript / TypeScript with Express

If you choose Express as the framework, the tool will scaffold your project as follows:

```bash
my-node-project/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js (or index.ts)
├── package.json
├── .eslint.config.json (if ESLint is enabled)
└── README.md
```

- src/index.js (or index.ts): This is the entry point to your app, where the Express server will be set up and started.

- src/config/: Holds configuration files (e.g., database setup, environment variables).

- src/controllers/: Contains your controller functions for handling business logic.

- src/middlewares/: Custom middlewares that can be applied to your routes.

- src/models/: Where your database models are stored (e.g., Mongoose models).

- src/routes/: All your API route definitions.

- src/utils/: Utility functions that can be used throughout the app.

If ESLint is enabled, you’ll also get an .eslint.config.json file for code quality.

## JavaScript / TypeScript without Framework (HTTP server only)

If you choose None (no framework), your project will be scaffolded as follows:

```bash
my-node-project/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js (or index.ts)
├── package.json
├── .eslint.config.json (if ESLint is enabled)
└── README.md
```

- src/index.js (or index.ts): This is the entry point where a simple HTTP server will be set up using the built-in http module (not Express).

- src/config/, src/controllers/, src/middlewares/, src/models/, src/routes/, src/utils/: These folders remain the same as the Express version, allowing you to follow the same structure and best practices without the complexity of a framework.
- No server-side framework is included, so you’ll have to manually set up routing, request handling, etc.

# 🛣️ Project Roadmap

We’re not just stopping at scaffolding Express + REST APIs — create-node-spark is built with the future in mind. Here’s what’s planned:

## ✅ Completed

- Scaffold projects with JavaScript or TypeScript

- Optional ESLint configuration

- Express support for REST APIs

- ESM module system support

- Lightweight, minimal dependency (inquirer only)

## 🚀 In Progress

- Add Fastify support (alternative to Express)

- Support for setting up environment variables (.env) out of the box

- Improve folder structure customization (let users decide what they want scaffolded)

## 🛠 Planned / Future Features

- GraphQL API scaffold option

- MongoDB integration setup (with Mongoose)

- PostgreSQL + Prisma integration setup

- Docker support (generate Dockerfile + docker-compose)

- Optional CI/CD pipeline configuration (GitHub Actions templates)

- Extendable plugin system so users can write their own scaffolding extensions

- Interactive project templates (e.g., pick between “Basic REST API,” “Auth API,” “CRUD API,” etc.)

> We’re committed to making create-node-spark a go-to CLI tool for modern Node.js backend development, and the roadmap will grow as the community brings in feedback and ideas.

# 🤝 Contributing

We welcome contributions to create-node-spark — whether you’re fixing a bug, improving the docs, or adding a brand-new feature!

### 🛑 Before You Start

- Check the Issues tab: See if your bug/feature is already reported or requested.

- Open a Discussion or Issue: Before working on big changes, open an issue or discussion so we can align on the approach.

- Follow the roadmap: If you want to help with something already planned, comment on the related issue!

### 🛠 How to Contribute

#### 1️⃣ Fork the repository

Click the fork button at the top of this repo to create your own copy.

#### 2️⃣ Clone your fork

```bash
git clone https://github.com/talhabilal-dev/create-node-spark.git
```

#### 3️⃣ Create a new branch

```bash
git checkout -b feature/your-feature-name
```

#### 4️⃣ Install dependencies

```bash
npm install
```

#### 5️⃣ Make your changes

Write clean, well-commented code. If you’re unsure about style or structure, look at the existing codebase for guidance.

#### 6️⃣ Run tests (if available)

If the project has tests, make sure they pass before submitting.

#### 7️⃣ Commit and push

```bash
git add .
git commit -m "Add: Your descriptive commit message"
git push origin feature/your-feature-name
```

#### 8️⃣ Open a Pull Request

Go to the GitHub repo and open a new pull request. Describe what you did and why.

#### **💡 Tips for a Good Contribution**

- ✅ Keep commits small and focused
- ✅ Write clear, descriptive PR titles
- ✅ Be respectful in reviews and discussions
- ✅ Remember: We’re all here to improve the tool together!

# 📄 License

This project is licensed under the MIT License.

📬 Contact & Community

We’d love to connect with developers using or contributing to create-node-spark!
🌎 Where to Reach Us

- GitHub Issues → <https://github.com/talhabilal-dev/create-node-spark/issues>

- Email → <contact@talhabilal.dev>

If this project gets a lot of community traction, we plan to set up:

- A Discord server or Slack group for real-time discussions

- A newsletter or changelog updates for big releases

We’re open to feedback, suggestions, and even just hearing how you’re using the tool!

# 🙏 Acknowledgements

This project stands on the shoulders of some amazing tools and libraries:

- **Node.js** — The heart of backend development.

- **Express** — The flexible, minimal framework we support out of the box.

- **Inquirer** — For building interactive CLI prompts.

- **ESLint** — Helping keep your code clean (if you choose to include it).

- **The open-source community** — For constant inspiration and pushing the ecosystem forward.

> Special thanks to everyone who has contributed issues, discussions, or pull requests — you make create-node-spark better every day!

## 📜 Changelog

For detailed version history, check the [CHANGELOG.md](./CHANGELOG.md).

<div align="center">

# 🚀 create-node-spark

### The fastest way to scaffold production-ready Node.js backends

**Zero configuration • TypeScript ready • Multiple databases • Developer-friendly**

[![npm version](https://img.shields.io/npm/v/create-node-spark?style=flat-square&color=00d8ff)](https://www.npmjs.com/package/create-node-spark)
[![npm downloads](https://img.shields.io/npm/dm/create-node-spark?style=flat-square&color=00d8ff)](https://www.npmjs.com/package/create-node-spark)
[![license](https://img.shields.io/github/license/talhabilal-dev/create-node-spark?style=flat-square&color=00d8ff)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/talhabilal-dev/create-node-spark?style=flat-square&color=00d8ff)](https://github.com/talhabilal-dev/create-node-spark)

![CreateNodeSpark Demo](https://res.cloudinary.com/dvdktrhsz/image/upload/v1755154754/2025-08-1410-59-54-ezgif.com-video-to-gif-converter_afyoyo.gif)

[Quick Start](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🎉 Exciting News: Phase 2 Development Has Begun

> **We're thrilled to announce that Phase 2 development is now underway!** Phase 1 has been successfully completed with all core features implemented. Phase 2 brings exciting new capabilities including **PostgreSQL + Prisma integration**, **Fastify framework support**, and **enhanced project customization**. Stay tuned for groundbreaking updates!

---

## ✨ What is create-node-spark?

**create-node-spark** is a powerful, developer-focused CLI tool that eliminates the tedious setup process for Node.js backend projects. Inspired by industry leaders like Create React App and Vite, it provides instant scaffolding for production-ready REST APIs with modern best practices built-in.

Whether you're a **beginner seeking guidance** or a **seasoned developer avoiding repetitive setup**, create-node-spark gets you coding in seconds, not hours.

### 🎯 Perfect For

- 🚀 **Rapid prototyping** and MVP development
- 👨‍💻 **Solo developers** and small teams
- 🏢 **Enterprise teams** needing consistent project structure
- 📚 **Learning projects** with industry-standard setup
- 🔄 **API-first development** workflows

## 🚀 Quick Start

Get up and running in under 30 seconds:

```bash
# Using npx (recommended - always latest version)
npx create-node-spark@latest

# Or install globally
npm install -g create-node-spark
create-node-spark
```

**That's it!** Follow the interactive prompts and you'll have a fully configured backend ready for development.

## ✨ Features

<table>
<tr>
<td width="50%">

### 🛠️ **Core Capabilities**

- **Language Choice**: JavaScript or TypeScript
- **Package Manager**: npm or pnpm support
- **Modern ES Modules**: No CommonJS legacy
- **Framework Ready**: Express.js pre-configured
- **Database Integration**: MongoDB & MySQL support
- **File Uploads**: Optional Multer configuration

</td>
<td width="50%">

### 🔧 **Developer Experience**

- **Smart ESLint**: Balanced rules for productivity
- **Prettier Integration**: Consistent code formatting
- **Environment Setup**: `.env` configuration ready
- **Organized Structure**: Professional folder layout
- **Zero Dependencies**: Lightweight and fast
- **Directory Safety**: Prevents accidental overwrites

</td>
</tr>
</table>

## 📦 Installation Methods

<details>
<summary><strong>📱 Method 1: NPX (Recommended)</strong></summary>

```bash
npx create-node-spark@latest
```

✅ Always uses the latest version  
✅ No global installation required  
✅ Perfect for one-time usage  

</details>

<details>
<summary><strong>🌍 Method 2: Global Installation</strong></summary>

```bash
npm install -g create-node-spark
create-node-spark
```

✅ Available from anywhere  
✅ Faster subsequent usage  
✅ Ideal for frequent use  

</details>

<details>
<summary><strong>🔧 Method 3: Development Setup</strong></summary>

```bash
git clone https://github.com/talhabilal-dev/create-node-spark.git
cd create-node-spark
npm install
npm link
```

✅ Full source code access  
✅ Contributing ready  
✅ Latest development features  

</details>

## 🎮 Interactive Setup Process

![CreateNodeSpark Demo](https://res.cloudinary.com/dvdktrhsz/image/upload/v1755154752/img1_puiryt.png)

The CLI guides you through a seamless setup process:

1. **📝 Project Name**: Choose your project identifier
2. **📦 Package Manager**: Select npm or pnpm
3. **💻 Language**: JavaScript or TypeScript
4. **🚀 Framework**: Express.js or vanilla Node.js
5. **🗄️ Database**: MongoDB, MySQL, or none
6. **⚙️ Features**: ESLint, Multer, and more

## 📁 Generated Project Structure

# 🛠️ Introduction

> ⚡ Spark your Node.js backend, skip the boilerplate.

![CreateNodeSpark Demo](https://res.cloudinary.com/dvdktrhsz/image/upload/v1755154754/2025-08-1410-59-54-ezgif.com-video-to-gif-converter_afyoyo.gif)

**create-node-spark** is a powerful CLI (Command Line Interface) tool designed to scaffold production-ready Node.js backend projects with ease. Inspired by tools like Create Next App and Vite, this tool removes the boilerplate pain by generating a clean, structured, and configurable Node.js project — so you can focus on building features, not setting up folders and configs.

Whether you’re a beginner wanting a head start or a seasoned developer tired of setting up the same repetitive structure, create-node-spark helps you spark your next backend project in seconds.

# ❓ What is Create-Node-Spark?

create-node-spark is a flexible scaffolding tool built specifically for Node.js backend projects, focusing on REST API development.

Here’s what it sets up for you under the hood:

- ✅ Choose between JavaScript or TypeScript at scaffold time

- ✅ Uses modern ESM (ECMAScript Modules) — no old CommonJS clutter

- ✅ Built on Express.js, one of the most popular and battle-tested Node.js frameworks

- ✅ Pre-configured for MongoDB integration with Mongoose

- ✅ Pre-configured for MySQL integration with Knex.js and mysql2

- ✅ Sets up environment variables (.env) out of the box

- ✅ Includes an optional Multer setup to handle file uploads

- ✅ Includes an optional ESLint setup to keep your codebase clean and consistent

- ✅ Depends only on Inquirer (for CLI prompts) — keeping external dependencies light and minimal

> **Note** :We plan to support additional frameworks (like Fastify) in the future to give developers even more flexibility.

## 📁 Generated Project Structure

![CreateNodeSpark Demo](https://res.cloudinary.com/dvdktrhsz/image/upload/v1746865259/create-node-spark/sk1h7rrj0cynfgcshtcc.png)

Every project follows a professional, scalable structure:

```
my-awesome-api/
├── 📁 public/                 # Static assets
│   ├── css/                   # Stylesheets
│   ├── js/                    # Client-side scripts
│   ├── images/                # Image assets
│   └── temp/                  # Temporary files
├── 📁 src/                    # Source code
│   ├── config/                # Configuration files
│   ├── controllers/           # Route handlers & business logic
│   ├── middlewares/           # Custom middleware functions
│   ├── models/                # Database models (Mongoose/Knex)
│   ├── routes/                # API route definitions
│   ├── services/              # Business logic services
│   ├── utils/                 # Utility functions
│   └── index.js/.ts           # Application entry point
├── 📄 package.json            # Dependencies & scripts
├── 📄 .env                    # Environment variables
├── 📄 .eslintrc.js            # Code quality rules (if enabled)
├── 📄 .prettierrc             # Code formatting (if enabled)
└── 📄 README.md               # Project documentation
```

## 🗄️ Database Integration Options

<table>
<tr>
<td width="50%">

### 🍃 **MongoDB + Mongoose**

- Pre-configured connection setup
- Schema models ready to use
- Async/await best practices
- Error handling included

</td>
<td width="50%">

### 🐬 **MySQL + Knex.js**

- Query builder configured
- Migration support ready
- Connection pooling setup
- SQL best practices included

</td>
</tr>
</table>

## 🛣️ Development Roadmap

<div align="center">

### ✅ **Phase 1 - COMPLETED**

*Foundation & Core Features*

</div>

- ✅ **Multi-language Support**: JavaScript & TypeScript
- ✅ **Package Manager Choice**: npm & pnpm
- ✅ **Framework Integration**: Express.js
- ✅ **Database Support**: MongoDB & MySQL  
- ✅ **Developer Tools**: ESLint & Prettier
- ✅ **File Handling**: Multer integration
- ✅ **Modern Standards**: ESM modules
- ✅ **Environment Setup**: Automatic .env configuration

<div align="center">

### 🚧 **Phase 2 - IN PROGRESS**

*Advanced Features & Expansion*

</div>

- 🔄 **PostgreSQL Integration**: Prisma ORM support
- 🔄 **Fastify Framework**: High-performance alternative
- 🔄 **Enhanced Customization**: Granular folder structure control
- 🔄 **Template System**: Pre-built project templates
- 🔄 **Testing Setup**: Automated test configuration

<div align="center">

### 🔮 **Phase 3 - PLANNED**

*Enterprise & Advanced Features*

</div>

- 📋 **GraphQL Support**: Complete GraphQL API scaffolding
- 🐳 **Docker Integration**: Containerization out-of-the-box
- 🔄 **CI/CD Templates**: GitHub Actions & deployment configs
- 🔌 **Plugin System**: Extensible architecture
- 🏗️ **Project Templates**: Industry-specific starter templates

## 🚀 Why Choose create-node-spark?

<table>
<tr>
<td width="33%">

### ⚡ **Speed**

Get from idea to coding in under 30 seconds. No more hours spent on project setup.

</td>
<td width="33%">

### 🎯 **Focused**

Built specifically for Node.js backend development with modern best practices.

</td>
<td width="33%">

### 🔧 **Flexible**

Choose your stack: TypeScript/JavaScript, npm/pnpm, MongoDB/MySQL.

</td>
</tr>
<tr>
<td width="33%">

### 📦 **Lightweight**

Minimal dependencies keep your projects fast and maintainable.

</td>
<td width="33%">

### 🏗️ **Production-Ready**

Professional folder structure and configurations from day one.

</td>
<td width="33%">

### 🌱 **Future-Proof**

Regular updates and new features based on community feedback.

</td>
</tr>
</table>

## 📖 Documentation

### Quick Examples

<details>
<summary><strong>🚀 Create a TypeScript API with MongoDB</strong></summary>

```bash
npx create-node-spark@latest
# Select: TypeScript → Express → MongoDB → ESLint
cd my-api
npm run dev
```

Your API is now running with TypeScript, MongoDB connection, and ESLint configured!

</details>

<details>
<summary><strong>⚡ Create a JavaScript API with MySQL</strong></summary>

```bash
npx create-node-spark@latest  
# Select: JavaScript → Express → MySQL → Skip ESLint
cd my-api
npm start
```

Perfect for rapid prototyping with MySQL database integration!

</details>

<details>
<summary><strong>🛠️ Create a minimal Node.js server</strong></summary>

```bash
npx create-node-spark@latest
# Select: JavaScript → None → No Database → Skip all features
cd my-server
npm start
```

Clean Node.js HTTP server ready for custom implementation!

</details>

### Available Scripts

Every generated project includes these npm scripts:

```bash
npm start          # Start the production server
npm run dev        # Start development server with auto-reload
npm run build      # Build TypeScript to JavaScript (TS projects)
npm run lint       # Check code quality with ESLint
npm run lint:fix   # Auto-fix ESLint issues
npm run format     # Format code with Prettier
```

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Here's how you can help make create-node-spark even better:

### 🎯 **Ways to Contribute**

- 🐛 **Bug Reports**: Found an issue? Let us know!
- ✨ **Feature Requests**: Have ideas? We'd love to hear them!
- 📝 **Documentation**: Help improve our guides and examples
- 💻 **Code Contributions**: Submit PRs for new features or fixes
- 🧪 **Testing**: Help us test new features and report feedback

### 🚀 **Quick Contribution Setup**

```bash
# 1. Fork & clone the repository
git clone https://github.com/YOUR_USERNAME/create-node-spark.git
cd create-node-spark

# 2. Install dependencies
npm install

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes and test
npm run build
npm start

# 5. Submit a pull request
git add .
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

### 💡 **Contribution Guidelines**

- ✅ Follow the existing code style and structure
- ✅ Write clear, descriptive commit messages  
- ✅ Test your changes thoroughly
- ✅ Update documentation if needed
- ✅ Be respectful and collaborative

## 🌟 Community & Support

<div align="center">

**Join our growing community of developers!**

[![GitHub Issues](https://img.shields.io/github/issues/talhabilal-dev/create-node-spark?style=flat-square)](https://github.com/talhabilal-dev/create-node-spark/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/talhabilal-dev/create-node-spark?style=flat-square)](https://github.com/talhabilal-dev/create-node-spark/discussions)

📧 **Email**: [contact@talhabilal.dev](mailto:contact@talhabilal.dev)  
🐛 **Issues**: [GitHub Issues](https://github.com/talhabilal-dev/create-node-spark/issues)  
💬 **Discussions**: [GitHub Discussions](https://github.com/talhabilal-dev/create-node-spark/discussions)

</div>

### 📊 **Project Stats**

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/talhabilal-dev/create-node-spark?style=social)
![GitHub forks](https://img.shields.io/github/forks/talhabilal-dev/create-node-spark?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/talhabilal-dev/create-node-spark?style=social)

</div>

## 🙏 Acknowledgments

This project is built with love and powered by these amazing technologies:

<table>
<tr>
<td align="center" width="20%">
<img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="50"><br>
<strong>Node.js</strong><br>
<em>Runtime Engine</em>
</td>
<td align="center" width="20%">
<img src="https://expressjs.com/images/express-facebook-share.png" alt="Express" width="50"><br>
<strong>Express.js</strong><br>
<em>Web Framework</em>
</td>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" alt="TypeScript" width="50"><br>
<strong>TypeScript</strong><br>
<em>Type Safety</em>
</td>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongodb/mongodb.png" alt="MongoDB" width="50"><br>
<strong>MongoDB</strong><br>
<em>Database</em>
</td>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mysql/mysql.png" alt="MySQL" width="50"><br>
<strong>MySQL</strong><br>
<em>Database</em>
</td>
</tr>
</table>

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

<div align="center">

**Made with ❤️ by developers, for developers**

---

⭐ **Found this helpful? Consider giving us a star!** ⭐

</div>

## 📜 Changelog

For detailed version history and updates, check the [CHANGELOG.md](./CHANGELOG.md).

---

# 🤔 Why Use Create-Node-Spark?

`create-node-spark` makes setting up a Node.js backend project quick and painless, so you can focus on the features that matter, not the boilerplate. Here’s why you should choose it:

### ⚡ Save Time

No more manually setting up project structure, dependencies, or config files. With just a single command, you get a fully scaffolded backend project ready to go.

### 🛠️ Flexible

Whether you're working with JavaScript or TypeScript, this tool adapts to your needs. Choose your preferred language when creating your project, and create-node-spark will scaffold accordingly.

### 🌍 Minimal Dependencies

Unlike many other tools that bring along bulky dependencies, create-node-spark only relies on Inquirer, keeping your project lean and focused. No unnecessary bloat.

### 🔧 Customizable Setup

Not only can you choose between JavaScript or TypeScript, but you also have the option to enable or skip ESLint and Multer setup based on your project needs.

### 🚀 Quick Start

Spend less time setting up your backend and more time coding. With create-node-spark, you can quickly jump into building your REST API, without the need for manual setup.

### DataBase Integration

create-node-spark supports MongoDB and MySQL integration. You can choose to set up MongoDB or MySQL integration with Mongoose or Knex.js and mysql2 respectively.

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

- **DataBase Integration**

  Support for MongoDB integration with Mongoose and MySQL integration with Knex.js and mysql2

- **Optional ESLint Setup**

  Ensure your code stays clean and consistent with the optional ESLint setup. You can skip it if you prefer not to use it.

- **Optional Multer Setup**

  Configure Multer for file uploads, so you can quickly add file upload capabilities to your REST API.

- **Minimal Dependencies**

  Relies on just Inquirer, keeping the tool lightweight and avoiding unnecessary bloat. It does exactly what you need — and no more.

- **Customizable Prompts**

  Get options for language choice, ESLint setup , multer setup , and more during project creation, giving you full control over the final scaffolded project.

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

![CreateNodeSpark Demo](https://res.cloudinary.com/dvdktrhsz/image/upload/v1755154754/2025-08-1410-59-54-ezgif.com-video-to-gif-converter_afyoyo.gif)

Once create-node-spark is installed, using it is a breeze. Here’s how you can get started with scaffolding your new Node.js backend project:

1. Run the Tool

To create a new Node.js backend project, simply run the following command:

```bash
create-node-spark
```

You’ll be prompted with a few configuration options:

**Choose the language**: Select either JavaScript or TypeScript for your project.

**Enable additional features:** Choose whether or not to include ESLint for linting your code and multer for file upload.

**Follow the Prompts**

The CLI tool will walk you through the setup, asking for:

Language selection (JavaScript or TypeScript)

FrameWork selection (None or Express)

DataBase selection (None or Mongodb or Mysql)

> Additional Features (Press space to select, a to toggle all, i to invert selection)

- Eslint
- Multer

After answering these prompts, the tool will automatically scaffold your new project, creating all necessary files and folder structure. 3. Start Developing

![CreateNodeSpark Demo](https://res.cloudinary.com/dvdktrhsz/image/upload/v1755154752/img1_puiryt.png)

Once the project has been generated, you can immediately start developing your API. The scaffolding includes a ready-to-go Express setup, with all the necessary configurations in place to help you hit the ground running.

# 🎨 Example Output

![CreateNodeSpark Demo](https://res.cloudinary.com/dvdktrhsz/image/upload/v1746865259/create-node-spark/sk1h7rrj0cynfgcshtcc.png)

When you run create-node-spark, the tool scaffolds your project based on the choices you make. Here’s what the generated project will look like for different configurations:

## JavaScript / TypeScript with Express

If you choose Express as the framework, the tool will scaffold your project as follows:

```bash
my-node-project/
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── temp/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── services/
│   └── index.js (or index.ts)
├── package.json
├── eslint.config.json (if ESLint is enabled)
└── README.md
```

- src/index.js (or index.ts): This is the entry point to your app, where the Express server will be set up and started.

- src/config/: Holds configuration files (e.g., database setup, environment variables).

- src/controllers/: Contains your controller functions for handling business logic.

- src/middlewares/: Custom middlewares that can be applied to your routes.

- src/models/: Where your database models are stored (e.g., Mongoose models).

- src/routes/: All your API route definitions.

- src/utils/: Utility functions that can be used throughout the app.

If ESLint is enabled, you’ll also get an eslint.config.json file for code quality.

## JavaScript / TypeScript without Framework (HTTP server only)

If you choose None (no framework), your project will be scaffolded as follows:

```bash
my-node-project/
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── temp/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── services/
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

## ✅ Phase 1 Completed

- Scaffold projects with JavaScript or TypeScript

- Optional ESLint configuration

- Express support for REST APIs

- ESM module system support

- Lightweight, minimal dependency (inquirer only)

- MongoDB integration setup (with Mongoose)

- Mysql integration setup (with Knex.js and mysql2)

- Support for setting up environment variables (.env) out of the box

- Multer file upload integration setup

## Phase 2 (In Progress)

- PostgreSQL + Prisma integration setup

- Add Fastify support (alternative to Express)

- Improve folder structure customization (let users decide what they want scaffolded)

## 🛠 Planned / Future Features

- GraphQL API scaffold option

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

- **Mongoose** — For MongoDB integration.

- **Knex.js and mysql2** — For MySQL integration.

- **Multer** — For file upload support.

- **The open-source community** — For constant inspiration and pushing the ecosystem forward.

> Special thanks to everyone who has contributed issues, discussions, or pull requests — you make create-node-spark better every day!

## 📜 Changelog

For detailed version history, check the [CHANGELOG.md](./CHANGELOG.md).

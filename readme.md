<div align="center">

# 🚀 create-node-spark

### The fastest way to scaffold production-ready Node.js backends

**Zero configuration • TypeScript ready • Multiple databases • Developer-friendly**

**[📚 Documentation](https://talhabilal-dev.github.io/create-node-spark.github.io/)**

[![npm version](https://img.shields.io/npm/v/create-node-spark?style=flat-square&color=00d8ff)](https://www.npmjs.com/package/create-node-spark)
[![npm downloads](https://img.shields.io/npm/dm/create-node-spark?style=flat-square&color=00d8ff)](https://www.npmjs.com/package/create-node-spark)
[![license](https://img.shields.io/github/license/talhabilal-dev/create-node-spark?style=flat-square&color=00d8ff)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/talhabilal-dev/create-node-spark?style=flat-square&color=00d8ff)](https://github.com/talhabilal-dev/create-node-spark)

![CreateNodeSpark Demo](https://res.cloudinary.com/dvdktrhsz/image/upload/v1755154754/2025-08-1410-59-54-ezgif.com-video-to-gif-converter_afyoyo.gif)

[Quick Start](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [Roadmap](#%EF%B8%8F-development-roadmap) • [Contributing](#-contributing)

</div>

---

## 🎉 What's New in Phase 2

> **Phase 2 development is now underway!** After successfully completing Phase 1 with all core features, we're excited to introduce powerful new capabilities:

- ✨ **PostgreSQL + Prisma ORM** - Modern database integration with full type safety
- ⚡ **Fastify Framework** - High-performance alternative to Express
- 🎨 **Enhanced Customization** - More control over your project structure
- 📦 **Advanced Templates** - Pre-configured project templates for common use cases

[See full roadmap →](#%EF%B8%8F-development-roadmap)

---

## 💡 What is create-node-spark?

**create-node-spark** is a powerful CLI tool that eliminates the tedious setup process for Node.js backend projects. Get from zero to production-ready REST API in under 30 seconds.

Inspired by industry leaders like Create React App and Vite, it provides instant scaffolding with modern best practices built-in — so you can focus on building features, not configuring boilerplate.

### 🎯 Perfect For

| Use Case | Why Choose Us |
|----------|---------------|
| 🚀 **Rapid Prototyping** | Skip setup, start coding immediately |
| 👨‍💻 **Solo Developers** | Professional structure without the complexity |
| 🏢 **Team Projects** | Consistent architecture across all projects |
| 📚 **Learning** | Industry-standard practices from day one |
| 🔄 **API Development** | Pre-configured REST API patterns |

---

## 🚀 Quick Start

Get up and running in **under 30 seconds**:

```bash
# Using npx (recommended - always latest version)
npx create-node-spark@latest

# Or install globally
npm install -g create-node-spark
create-node-spark
```

**That's it!** Follow the interactive prompts and you'll have a fully configured backend ready for development.

### 📹 See it in action

![Setup Process](https://res.cloudinary.com/dvdktrhsz/image/upload/v1755154752/img1_puiryt.png)

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🛠️ Core Capabilities

- ✅ **Language Choice**: JavaScript or TypeScript
- ✅ **Package Manager**: npm or pnpm support
- ✅ **Modern ES Modules**: No CommonJS legacy
- ✅ **Framework Options**:
  - Express.js (stable & popular)
  - Fastify (high-performance)
  - Vanilla Node.js (custom setup)
- ✅ **Database Integration**:
  - MongoDB + Mongoose
  - MySQL + Knex.js
  - PostgreSQL + Prisma
- ✅ **File Uploads**: Optional Multer configuration

</td>
<td width="50%" valign="top">

### 🔧 Developer Experience

- ✅ **Smart ESLint**: Balanced rules for productivity
- ✅ **Prettier Integration**: Consistent code formatting
- ✅ **Environment Setup**: `.env` configuration ready
- ✅ **Organized Structure**: Professional folder layout
- ✅ **Zero Config**: Works out of the box
- ✅ **Safety First**: Prevents accidental overwrites
- ✅ **Minimal Dependencies**: Fast and lightweight
- ✅ **Auto-reload**: Development mode with hot reload

</td>
</tr>
</table>

---

## 📦 Installation Methods

### 📱 Method 1: NPX (Recommended)

```bash
npx create-node-spark@latest
```

✅ Always uses the latest version  
✅ No global installation required  
✅ Perfect for one-time usage

### 🌍 Method 2: Global Installation

```bash
npm install -g create-node-spark
create-node-spark
```

✅ Available from anywhere  
✅ Faster subsequent usage  
✅ Ideal for frequent use

### 🔧 Method 3: Development Setup

```bash
git clone https://github.com/talhabilal-dev/create-node-spark.git
cd create-node-spark
npm install
npm link
```

✅ Full source code access  
✅ Contributing ready  
✅ Latest development features

---

## 🎮 Interactive Setup Process

The CLI guides you through a seamless setup with these choices:

| Step | Options | Description |
|------|---------|-------------|
| 📝 **Project Name** | Custom name | Your project identifier |
| 📦 **Package Manager** | npm, pnpm | Choose your preferred manager |
| 💻 **Language** | JavaScript, TypeScript | Pick your language |
| 🚀 **Framework** | Express, Fastify, None | Select your framework |
| 🗄️ **Database** | MongoDB, MySQL, PostgreSQL, None | Choose database integration |
| ⚙️ **Developer Tools** | ESLint, Prettier, Multer | Optional enhancements |

---

## 📁 Generated Project Structure

Every project follows a professional, scalable architecture:

```
my-awesome-api/
├── 📁 public/                 # Static assets & uploads
│   ├── css/                   # Stylesheets
│   ├── js/                    # Client-side scripts
│   ├── images/                # Image assets
│   └── temp/                  # Temporary files
│
├── 📁 src/                    # Source code (your work lives here)
│   ├── config/                # Configuration files
│   │   ├── database.js        # Database connection
│   │   └── environment.js     # Environment variables
│   │
│   ├── controllers/           # Route handlers & business logic
│   │   └── example.controller.js
│   │
│   ├── middlewares/           # Custom middleware functions
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── models/                # Database models
│   │   └── example.model.js   # (Mongoose/Knex/Prisma)
│   │
│   ├── routes/                # API route definitions
│   │   └── example.routes.js
│   │
│   ├── services/              # Business logic services
│   │   └── example.service.js
│   │
│   ├── utils/                 # Utility functions & helpers
│   │   └── logger.js
│   │
│   └── index.js/.ts           # Application entry point
│
├── 📄 .env                    # Environment variables (DO NOT COMMIT)
├── 📄 .env.example            # Environment template
├── 📄 .eslintrc.js            # Code quality rules
├── 📄 .prettierrc             # Code formatting config
├── 📄 .gitignore              # Git ignore patterns
├── 📄 package.json            # Dependencies & scripts
└── 📄 README.md               # Project documentation
```

### 🎨 Structure Benefits

- **Clear Separation**: Each folder has a single, clear purpose
- **Scalable**: Grows naturally as your project expands
- **Maintainable**: Easy to find and modify code
- **Team-Friendly**: Consistent structure across developers
- **Best Practices**: Industry-standard organization

---

## 🗄️ Database Integration Options

<table>
<tr>
<td width="33%" valign="top">

### 🍃 MongoDB + Mongoose

**Best for:** Flexible schemas, rapid prototyping

```javascript
// Pre-configured connection
mongoose.connect(process.env.MONGODB_URI)

// Ready-to-use models
const User = mongoose.model('User', schema)
```

**Features:**

- ✅ Async/await patterns
- ✅ Schema validation
- ✅ Middleware hooks
- ✅ Population & refs

</td>
<td width="33%" valign="top">

### 🐘 PostgreSQL + Prisma

**Best for:** Type safety, complex relations

```typescript
// Auto-generated client
const prisma = new PrismaClient()

// Full TypeScript support
const users = await prisma.user.findMany()
```

**Features:**

- ✅ Type-safe queries
- ✅ Auto-generated types
- ✅ Migration system
- ✅ Studio GUI

</td>
<td width="33%" valign="top">

### 🐬 MySQL + Knex.js

**Best for:** SQL control, migrations

```javascript
// Query builder ready
const users = await knex('users')
  .where('active', true)
```

**Features:**

- ✅ SQL query builder
- ✅ Transaction support
- ✅ Migration tools
- ✅ Connection pooling

</td>
</tr>
</table>

---

## 🗺️ Development Roadmap

### ✅ Phase 1 - Foundation (COMPLETED)

<details open>
<summary><strong>🎉 All core features delivered</strong></summary>

| Feature | Status | Description |
|---------|--------|-------------|
| Multi-language Support | ✅ Done | JavaScript & TypeScript |
| Package Managers | ✅ Done | npm & pnpm support |
| Express Framework | ✅ Done | Full Express.js integration |
| MongoDB Integration | ✅ Done | Mongoose ORM setup |
| MySQL Integration | ✅ Done | Knex.js query builder |
| Developer Tools | ✅ Done | ESLint & Prettier |
| File Handling | ✅ Done | Multer configuration |
| Modern Standards | ✅ Done | ESM modules throughout |
| Environment Setup | ✅ Done | Automatic .env generation |

</details>

---

### 🚧 Phase 2 - Advanced Features (IN PROGRESS)

<details open>
<summary><strong>⚡ Current development focus</strong></summary>

| Feature | Status | Target | Description |
|---------|--------|--------|-------------|
| PostgreSQL + Prisma | ✅ Done | Q1 2025 | Modern ORM with type safety |
| Fastify Framework | ✅ Done | Q1 2025 | High-performance alternative |
| Enhanced Customization | 🔄 In Progress | Q1 2025 | Granular project structure control |
| Template System | 🔄 In Progress | Q2 2025 | Pre-built project templates |
| Testing Setup | 📋 Planned | Q2 2025 | Jest/Vitest configuration |
| Authentication Templates | 📋 Planned | Q2 2025 | JWT, OAuth, Passport.js |
| API Documentation | 📋 Planned | Q2 2025 | Swagger/OpenAPI integration |

**Timeline:** Q1-Q2 2025

</details>

---

### 🔮 Phase 3 - Enterprise & Ecosystem (PLANNED)

<details>
<summary><strong>🚀 Future vision</strong></summary>

#### 🏗️ Advanced Architecture (Q3 2025)

| Feature | Description | Impact |
|---------|-------------|--------|
| GraphQL Support | Complete GraphQL API scaffolding | High |
| Microservices Templates | Multi-service architecture | High |
| Message Queues | Redis, RabbitMQ integration | Medium |
| Caching Strategies | Redis, Memcached setup | Medium |

#### 🐳 DevOps & Deployment (Q3-Q4 2025)

| Feature | Description | Impact |
|---------|-------------|--------|
| Docker Integration | Containerization out-of-the-box | High |
| Docker Compose | Multi-container development | Medium |
| CI/CD Templates | GitHub Actions, GitLab CI | High |
| Kubernetes Configs | Production orchestration | Medium |
| Cloud Deployment | AWS, GCP, Azure templates | High |

#### 🔌 Extensibility (Q4 2025)

| Feature | Description | Impact |
|---------|-------------|--------|
| Plugin System | Community plugin architecture | High |
| Custom Templates | User-defined project templates | High |
| Template Marketplace | Share and discover templates | Medium |
| CLI Extensions | Third-party command support | Medium |

#### 📦 Industry Templates (Q4 2025 - Q1 2026)

Pre-configured templates for common use cases:

- 🛒 **E-commerce API** - Product catalog, cart, orders, payments
- 📱 **Social Media Backend** - Posts, likes, comments, followers
- 📚 **Content Management** - CMS with media handling
- 🏦 **Financial Services** - Transactions, accounts, compliance
- 🏥 **Healthcare** - HIPAA-compliant templates
- 🎓 **Education Platform** - Courses, students, assessments
- 🎮 **Gaming Backend** - Leaderboards, matchmaking, chat

**Timeline:** Q3 2025 - Q1 2026

</details>

---

### 📊 Roadmap Progress

```
Phase 1: ████████████████████ 100% ✅
Phase 2: ████████░░░░░░░░░░░░  45% 🚧
Phase 3: ░░░░░░░░░░░░░░░░░░░░   0% 📋
```

**Want to influence our roadmap?** [Vote on features →](https://github.com/talhabilal-dev/create-node-spark/discussions)

---

## 📖 Documentation

### 🎯 Quick Examples

<details>
<summary><strong>🚀 TypeScript REST API with MongoDB</strong></summary>

```bash
npx create-node-spark@latest my-api

# Interactive prompts:
# ✓ Language: TypeScript
# ✓ Framework: Express.js
# ✓ Database: MongoDB
# ✓ Features: ESLint + Prettier

cd my-api
npm run dev
```

**What you get:**

- ✅ TypeScript with strict mode
- ✅ MongoDB connection ready
- ✅ Express server configured
- ✅ ESLint rules active
- ✅ Auto-reload on changes

</details>

<details>
<summary><strong>⚡ High-Performance API with Fastify + PostgreSQL</strong></summary>

```bash
npx create-node-spark@latest fast-api

# Interactive prompts:
# ✓ Language: TypeScript
# ✓ Framework: Fastify
# ✓ Database: PostgreSQL
# ✓ Features: Prisma + ESLint

cd fast-api
npm run dev
```

**What you get:**

- ✅ Fastify for maximum performance
- ✅ PostgreSQL + Prisma ORM
- ✅ Full TypeScript type safety
- ✅ Auto-generated Prisma client
- ✅ Database migrations ready

</details>

<details>
<summary><strong>🎨 Custom Node.js Server (Minimal Setup)</strong></summary>

```bash
npx create-node-spark@latest custom-server

# Interactive prompts:
# ✓ Language: JavaScript
# ✓ Framework: None
# ✓ Database: None
# ✓ Features: Skip all

cd custom-server
npm start
```

**What you get:**

- ✅ Clean Node.js HTTP server
- ✅ Professional folder structure
- ✅ Environment variables setup
- ✅ Ready for custom implementation

</details>

<details>
<summary><strong>🛒 E-commerce API with MySQL</strong></summary>

```bash
npx create-node-spark@latest shop-api

# Interactive prompts:
# ✓ Language: TypeScript
# ✓ Framework: Express.js
# ✓ Database: MySQL
# ✓ Features: ESLint + Multer

cd shop-api
npm run dev
```

**What you get:**

- ✅ MySQL + Knex.js query builder
- ✅ File upload handling (Multer)
- ✅ Transaction support ready
- ✅ Migration system configured

</details>

---

### 🎮 Available Scripts

Every generated project includes these npm scripts:

```bash
# Development
npm run dev          # Start development server with auto-reload
npm start            # Start production server

# TypeScript (TS projects only)
npm run build        # Compile TypeScript to JavaScript
npm run type-check   # Check types without building

# Code Quality
npm run lint         # Check code with ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes

# Database (if applicable)
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with test data
npm run db:studio    # Open Prisma Studio (PostgreSQL only)
```

---

### 📚 Framework-Specific Guides

<details>
<summary><strong>Express.js Projects</strong></summary>

**Starting your server:**

```javascript
// src/index.js
import express from 'express'
import routes from './routes/index.js'

const app = express()
app.use(express.json())
app.use('/api', routes)

app.listen(3000, () => console.log('Server running on port 3000'))
```

**Adding a new route:**

```javascript
// src/routes/users.routes.js
import { Router } from 'express'
import { getUsers, createUser } from '../controllers/users.controller.js'

const router = Router()
router.get('/', getUsers)
router.post('/', createUser)

export default router
```

</details>

<details>
<summary><strong>Fastify Projects</strong></summary>

**Starting your server:**

```javascript
// src/index.js
import Fastify from 'fastify'
import routes from './routes/index.js'

const fastify = Fastify({ logger: true })
fastify.register(routes, { prefix: '/api' })

await fastify.listen({ port: 3000 })
```

**Adding a new route:**

```javascript
// src/routes/users.routes.js
export default async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    return { users: [] }
  })
}
```

</details>

---

## 🚀 Why Choose create-node-spark?

<table>
<tr>
<td width="50%" valign="top">

### 💎 For Individual Developers

- ⚡ **Save Hours**: No more repetitive setup
- 🎯 **Stay Focused**: Jump straight to features
- 📚 **Learn Best Practices**: Industry-standard patterns
- 🔧 **Full Control**: Customize everything
- 💰 **Free Forever**: Open source, no hidden costs

</td>
<td width="50%" valign="top">

### 🏢 For Teams & Organizations

- 🎨 **Consistent Architecture**: Same structure across all projects
- 👥 **Faster Onboarding**: New developers productive immediately
- 🔒 **Security**: Built-in best practices
- 📈 **Scalable**: Grows with your needs
- 🔄 **Maintainable**: Clean, organized codebase

</td>
</tr>
</table>

---

### 📊 Comparison with Alternatives

| Feature | create-node-spark | Manual Setup | Express Generator |
|---------|-------------------|--------------|-------------------|
| TypeScript Support | ✅ Built-in | ❌ Manual config | ❌ Not included |
| Modern ESM | ✅ Yes | ❌ Manual setup | ❌ CommonJS |
| Database Integration | ✅ 3 options | ❌ Manual | ❌ None |
| Multiple Frameworks | ✅ Express, Fastify | ❌ DIY | ✅ Express only |
| Developer Tools | ✅ ESLint, Prettier | ❌ Manual | ❌ Basic only |
| File Uploads | ✅ Optional | ❌ Manual | ❌ None |
| Setup Time | ⚡ 30 seconds | 🐌 2-3 hours | ⏱️ 5-10 minutes |
| Production Ready | ✅ Yes | ❓ Depends | ⚠️ Basic |

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Here's how you can help make create-node-spark even better.

### 🎯 Ways to Contribute

<table>
<tr>
<td width="50%" valign="top">

#### 🐛 Found a Bug?

1. Check [existing issues](https://github.com/talhabilal-dev/create-node-spark/issues)
2. Create a detailed bug report
3. Include reproduction steps
4. Add system information

[Report a bug →](https://github.com/talhabilal-dev/create-node-spark/issues/new?template=bug_report.md)

#### ✨ Have a Feature Idea?

1. Search existing requests
2. Describe your use case
3. Explain the benefits
4. Suggest implementation

[Request a feature →](https://github.com/talhabilal-dev/create-node-spark/issues/new?template=feature_request.md)

</td>
<td width="50%" valign="top">

#### 💻 Want to Code?

1. Pick an issue or create one
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

[View good first issues →](https://github.com/talhabilal-dev/create-node-spark/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

#### 📝 Improve Documentation?

1. Fix typos or unclear sections
2. Add examples or guides
3. Translate to other languages
4. Create video tutorials

[View docs →](https://github.com/talhabilal-dev/create-node-spark/tree/main/docs)

</td>
</tr>
</table>

---

### 🚀 Quick Contribution Setup

```bash
# 1. Fork & clone the repository
git clone https://github.com/YOUR_USERNAME/create-node-spark.git
cd create-node-spark

# 2. Install dependencies
npm install

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes and test locally
npm run build
npm link
create-node-spark  # Test your changes

# 5. Run tests (when available)
npm test

# 6. Commit with a clear message
git add .
git commit -m "feat: add amazing feature"

# 7. Push and create a pull request
git push origin feature/amazing-feature
```

---

### 💡 Contribution Guidelines

#### ✅ Do's

- **Follow Code Style**: Use ESLint and Prettier configurations
- **Write Clear Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/)
- **Test Thoroughly**: Ensure your changes work across different configurations
- **Update Documentation**: Keep README and docs in sync
- **Be Descriptive**: Explain why, not just what
- **Stay Respectful**: Be kind and collaborative

#### ❌ Don'ts

- Don't submit untested code
- Don't ignore linting errors
- Don't make unrelated changes in one PR
- Don't forget to update documentation
- Don't take things personally

---

### 🏆 Contributors

Thanks to all our amazing contributors!

<a href="https://github.com/talhabilal-dev/create-node-spark/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=talhabilal-dev/create-node-spark" />
</a>

---

## 🌟 Community & Support

### 💬 Get Help

<table>
<tr>
<td width="33%" align="center">

#### 📖 Documentation

[Read the Docs](https://talhabilal-dev.github.io/create-node-spark.github.io/)

Complete guides and API reference

</td>
<td width="33%" align="center">

#### 💬 Discussions

[GitHub Discussions](https://github.com/talhabilal-dev/create-node-spark/discussions)

Ask questions, share ideas

</td>
<td width="33%" align="center">

#### 🐛 Issues

[GitHub Issues](https://github.com/talhabilal-dev/create-node-spark/issues)

Report bugs, request features

</td>
</tr>
</table>

---

### 📧 Contact

<div align="center">

**Creator & Maintainer:** Talha Bilal

📧 [contact@talhabilal.dev](mailto:contact@talhabilal.dev)  
🐦 [@talhabilal_dev](https://twitter.com/talhabilal_dev)  
💼 [LinkedIn](https://linkedin.com/in/talhabilal)  
🌐 [talhabilal.dev](https://talhabilal.dev)

</div>

---

### 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/talhabilal-dev/create-node-spark?style=social)
![GitHub forks](https://img.shields.io/github/forks/talhabilal-dev/create-node-spark?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/talhabilal-dev/create-node-spark?style=social)
![GitHub issues](https://img.shields.io/github/issues/talhabilal-dev/create-node-spark?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/talhabilal-dev/create-node-spark?style=flat-square)

</div>

---

## 🙏 Acknowledgments

This project is built with ❤️ and powered by these amazing technologies:

<div align="center">

<table>
<tr>
<td align="center" width="20%">
<img src="https://nodejs.org/static/images/logo.svg" alt="Node.js" width="50"><br>
<strong>Node.js</strong><br>
<em>Runtime Engine</em>
</td>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" alt="TypeScript" width="50"><br>
<strong>TypeScript</strong><br>
<em>Type Safety</em>
</td>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png" alt="Express" width="50"><br>
<strong>Express.js</strong><br>
<em>Web Framework</em>
</td>
<td align="center" width="20%">
<img src="https://fastify.dev/img/logos/fastify-white.svg" alt="Fastify" width="50"><br>
<strong>Fastify</strong><br>
<em>Fast Framework</em>
</td>
<td align="center" width="20%">
<img src="https://www.prisma.io/images/logo-dark.svg" alt="Prisma" width="50"><br>
<strong>Prisma</strong><br>
<em>Modern ORM</em>
</td>
</tr>
<tr>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongodb/mongodb.png" alt="MongoDB" width="50"><br>
<strong>MongoDB</strong><br>
<em>NoSQL Database</em>
</td>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mysql/mysql.png" alt="MySQL" width="50"><br>
<strong>MySQL</strong><br>
<em>SQL Database</em>
</td>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png" alt="PostgreSQL" width="50"><br>
<strong>PostgreSQL</strong><br>
<em>SQL Database</em>
</td>
<td align="center" width="20%">
<img src="https://eslint.org/icon-512.png" alt="ESLint" width="50"><br>
<strong>ESLint</strong><br>
<em>Code Quality</em>
</td>
<td align="center" width="20%">
<img src="https://prettier.io/icon.png" alt="Prettier" width="50"><br>
<strong>Prettier</strong><br>
<em>Code Formatting</em>
</td>
</tr>
</table>

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⭐ Show Your Support

If **create-node-spark** helps you build amazing projects faster, please consider:

- ⭐ Starring the repository
- 🐦 Sharing on social media
- 📝 Writing about your experience
- 🤝 Contributing code or documentation
- 💬 Helping others in discussions

Every contribution, no matter how small, makes a difference!

---

<div align="center">

**Made with ❤️ by [Talha Bilal](https://talhabilal.dev)**

⭐ Star us on GitHub — it motivates us a lot!

[⬆ Back to Top](#-create-node-spark)

</div>

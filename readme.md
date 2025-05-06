# 🚀 create-node-spark

> The fastest way to scaffold production-ready Node.js backends — no manual setup, no headaches.

![npm](https://img.shields.io/npm/v/create-node-spark)
![License](https://img.shields.io/github/license/talhabilal-dev/create-node-spark)
![Node.js Version](https://img.shields.io/node/v/create-node-spark)
![Downloads](https://img.shields.io/npm/dm/create-node-spark)

## 📋 Overview

**create-node-spark** is a powerful CLI tool designed to eliminate the tedious process of setting up Node.js backend projects from scratch. Instead of spending hours configuring your project structure, installing dependencies, and setting up common middleware, create-node-spark generates a complete, production-ready backend scaffold in seconds.

### 🤔 Why Use create-node-spark?

- **Save Development Time**: Stop rewriting the same boilerplate code for every new project
- **Standardized Structure**: Follow industry best practices with a scalable folder structure
- **Modern JavaScript**: Built for ESM out of the box, no CommonJS headaches
- **Pre-configured Essentials**: Authentication, file uploads, and code quality tools ready to go
- **Minimal Configuration**: Answer just three simple questions, and you're ready to code
- **Focus on Business Logic**: Spend time building features, not setting up infrastructure

---

## ✨ Features

### Core Features

✅ **Interactive CLI Setup**  
Answer just **three questions**:
- Enable auth?
- Enable multer?
- Enable ESLint?  
  → Boom! Your backend is ready.

✅ **Production-Ready Folder Structure**  
No more messy files — get a scalable layout designed for real-world applications.

✅ **ESM Conversion Out of the Box**  
Skip CommonJS headaches — enjoy modern ES modules syntax with full support.

✅ **Multer File Upload Integration**  
Ready-to-use file upload functionality with proper middleware configuration.

✅ **JWT Authentication**  
Secure routes with pre-configured JWT middleware and user authentication flows.

✅ **ESLint Config Generator**  
Auto-generates a clean `eslint.config.js` for consistent code quality.

✅ **Environment Variable Management**  
Pre-configured dotenv setup with sample environment variables.

✅ **Error Handling Middleware**  
Global error handler configured to properly format and respond to exceptions.

✅ **Development Mode with Nodemon**  
Auto-reload during development for a faster coding experience.

### What's Included

The generated project comes with:

#### 🛠️ Dependencies

| Package | Purpose |
|---------|---------|
| Express | Fast, unopinionated web framework |
| dotenv | Environment variable management |
| jsonwebtoken | JWT authentication implementation |
| bcrypt | Password hashing (when auth is enabled) |
| multer | File upload middleware (when selected) |
| nodemon | Development auto-reload utility |
| ESLint | Code quality and style enforcement (when selected) |

#### 📁 Generated Project Structure

```
my-app/
├── src/
│   ├── config/
│   │   ├── db.js          # Database configuration
│   │   └── env.js         # Environment variable setup
│   │
│   ├── controllers/
│   │   ├── auth.js        # Authentication logic (if enabled)
│   │   └── index.js       # Example controller
│   │
│   ├── middleware/
│   │   ├── auth.js        # JWT verification (if enabled)
│   │   ├── error.js       # Global error handler
│   │   ├── upload.js      # Multer setup (if enabled)
│   │   └── validate.js    # Request validation utilities
│   │
│   ├── models/
│   │   └── user.js        # User model (if auth enabled)
│   │
│   ├── routes/
│   │   ├── auth.js        # Auth routes (if enabled)
│   │   ├── index.js       # Main router
│   │   └── uploads.js     # Upload routes (if multer enabled)
│   │
│   └── index.js           # Application entry point
│
├── .env                   # Environment variables
├── .gitignore             # Configured Git ignore file
├── eslint.config.js       # ESLint configuration (if selected)
├── package.json           # ESM-ready package configuration
└── package-lock.json      # Dependency lock file
```

### 🎯 Output and Sample Files

#### Entry Point (src/index.js)

```javascript
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import errorHandler from './middleware/error.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
```

#### Sample Route (src/routes/index.js)

```javascript
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to your new API built with create-node-spark!' });
});

export default router;
```

---

## 📦 Installation

```bash
# Install globally for regular use
npm install -g create-node-spark

# Or use without installation
npx create-node-spark
```

## ⚙️ Usage

### Interactive Mode (Recommended)

```bash
# If installed globally
create-node-spark

# Or use without installation
npx create-node-spark
```

This will launch the interactive CLI and ask:
1. Project name:
2. Include auth? (y/n)
3. Include multer? (y/n)
4. Enable ESLint? (y/n)

### Non-Interactive Mode (Coming Soon)

```bash
create-node-spark my-app --auth --multer --eslint
```

### After Generation

```bash
# Navigate to your new project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev

# For production
npm start
```

## 🧩 Configuration Options

### Authentication (--auth)

When enabled, includes:
- JWT-based authentication
- User model with secure password hashing
- Login and registration endpoints
- Protected route middleware

### File Uploads (--multer)

When enabled, includes:
- Configured multer middleware
- File upload endpoints
- Disk storage configuration
- File type and size validation

### ESLint (--eslint)

When enabled, includes:
- Modern ESM-compatible ESLint setup
- Recommended code style rules
- Pre-configured ignores for common files

---

## 🚀 Future Plans

- **Database Integration**: Options for MongoDB, PostgreSQL, and MySQL setup
- **Testing Framework**: Jest or Mocha integration with example tests
- **TypeScript Support**: Option to scaffold with TypeScript
- **Swagger Documentation**: Auto-generated API docs
- **Docker Configuration**: Containerization setup with Docker and Docker Compose
- **CI/CD Templates**: GitHub Actions and other CI configurations
- **GraphQL Support**: Option for GraphQL API setup with Apollo Server

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/talhabilal-dev/create-node-spark/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Show Your Support

If you find create-node-spark useful, please consider giving the repo a star! It helps others discover this tool and motivates continued development.

```bash
# Get started now with:
npx create-node-spark
```
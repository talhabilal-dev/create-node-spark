import { writeFile } from "../utils/fileSystem.js";
import path from "path";
import { logDatabaseSetup, logInfo, logSuccess } from "../utils/logger.js";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export async function setupPostgresPrisma(projectName: string, language: string, packageManager: 'npm' | 'pnpm'): Promise<void> {
    try {
        logDatabaseSetup("PostgreSQL with Prisma");
        // Note: prisma and @prisma/client dependencies are now installed in installDependencies function

        const extension = language === "TypeScript" ? "ts" : "js";

        // Create Prisma schema file
        const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
        const schemaContent = `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}
`;

        // Create database configuration file
        const configDbPath = path.join(process.cwd(), "src", "config", `db.config.${extension}`);

        const configDbContent = language === "TypeScript" ? `import { PrismaClient } from '@prisma/client';
import ENV from "./env.config";

declare global {
  var __prisma: PrismaClient | undefined;
}

// Prevent multiple instances during development (hot reload)
const prisma = globalThis.__prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
` : `import { PrismaClient } from '@prisma/client';
import ENV from "./env.config.js";

// Prevent multiple instances during development (hot reload)
const prisma = globalThis.__prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
`;

        // Create example service file
        const servicePath = path.join(process.cwd(), "src", "services", `user.service.${extension}`);

        const serviceContent = language === "TypeScript" ? `import prisma from '../config/db.config';

export interface CreateUserInput {
  email: string;
  name?: string;
  bio?: string; // For profile creation
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
}

export interface CreatePostInput {
  title: string;
  content?: string;
  published?: boolean;
  authorId: number;
}

export class UserService {
  // Create a new user with optional profile
  static async createUser(data: CreateUserInput) {
    try {
      const { bio, ...userData } = data;
      const user = await prisma.user.create({
        data: {
          ...userData,
          ...(bio && {
            profile: {
              create: { bio }
            }
          })
        },
        include: {
          profile: true,
          posts: true,
        },
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Get all users with their profiles and posts
  static async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        include: {
          profile: true,
          posts: {
            where: { published: true },
            orderBy: { createdAt: 'desc' }
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Get user by ID with full relations
  static async getUserById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
          posts: {
            orderBy: { createdAt: 'desc' }
          },
        },
      });
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Update user
  static async updateUser(id: number, data: UpdateUserInput) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data,
      });
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  static async deleteUser(id: number) {
    try {
      // Delete user with cascade (Prisma will handle related records)
      const user = await prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export class PostService {
  // Create a new post
  static async createPost(data: CreatePostInput) {
    try {
      const post = await prisma.post.create({
        data,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        },
      });
      return post;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Get all published posts
  static async getPublishedPosts() {
    try {
      const posts = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Get post by ID
  static async getPostById(id: number) {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: true,
            }
          }
        },
      });
      return post;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  // Update post
  static async updatePost(id: number, data: Partial<CreatePostInput>) {
    try {
      const post = await prisma.post.update({
        where: { id },
        data,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        },
      });
      return post;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Delete post
  static async deletePost(id: number) {
    try {
      const post = await prisma.post.delete({
        where: { id },
      });
      return post;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
}
` : `import prisma from '../config/db.config.js';

export class UserService {
  // Create a new user with optional profile
  static async createUser(data) {
    try {
      const { bio, ...userData } = data;
      const user = await prisma.user.create({
        data: {
          ...userData,
          ...(bio && {
            profile: {
              create: { bio }
            }
          })
        },
        include: {
          profile: true,
          posts: true,
        },
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Get all users with their profiles and posts
  static async getAllUsers() {
    try {
      const users = await prisma.user.findMany({
        include: {
          profile: true,
          posts: {
            where: { published: true },
            orderBy: { createdAt: 'desc' }
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Get user by ID with full relations
  static async getUserById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
          posts: {
            orderBy: { createdAt: 'desc' }
          },
        },
      });
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Update user
  static async updateUser(id, data) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data,
        include: {
          profile: true,
          posts: true,
        },
      });
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  static async deleteUser(id) {
    try {
      // Delete user with cascade (Prisma will handle related records)
      const user = await prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

export class PostService {
  // Create a new post
  static async createPost(data) {
    try {
      const post = await prisma.post.create({
        data,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        },
      });
      return post;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Get all published posts
  static async getPublishedPosts() {
    try {
      const posts = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Get post by ID
  static async getPostById(id) {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              profile: true,
            }
          }
        },
      });
      return post;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  // Update post
  static async updatePost(id, data) {
    try {
      const post = await prisma.post.update({
        where: { id },
        data,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        },
      });
      return post;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Delete post
  static async deletePost(id) {
    try {
      const post = await prisma.post.delete({
        where: { id },
      });
      return post;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
}
`;

        // Create example controller file
        const controllerPath = path.join(process.cwd(), "src", "controllers", `user.controller.${extension}`);

        const controllerContent = language === "TypeScript" ? `import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  // GET /api/users
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // GET /api/users/:id
  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(parseInt(id));
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // POST /api/users
  static async createUser(req: Request, res: Response) {
    try {
      const { email, name } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      const user = await UserService.createUser({ email, name });
      
      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // PUT /api/users/:id
  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, name } = req.body;
      
      const user = await UserService.updateUser(parseInt(id), { email, name });
      
      res.status(200).json({
        success: true,
        data: user,
        message: 'User updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // DELETE /api/users/:id
  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      await UserService.deleteUser(parseInt(id));
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting user',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
` : `import { UserService } from '../services/user.service.js';

export class UserController {
  // GET /api/users
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: error.message || 'Unknown error',
      });
    }
  }

  // GET /api/users/:id
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(parseInt(id));
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching user',
        error: error.message || 'Unknown error',
      });
    }
  }

  // POST /api/users
  static async createUser(req, res) {
    try {
      const { email, name } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      const user = await UserService.createUser({ email, name });
      
      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating user',
        error: error.message || 'Unknown error',
      });
    }
  }

  // PUT /api/users/:id
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, name } = req.body;
      
      const user = await UserService.updateUser(parseInt(id), { email, name });
      
      res.status(200).json({
        success: true,
        data: user,
        message: 'User updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating user',
        error: error.message || 'Unknown error',
      });
    }
  }

  // DELETE /api/users/:id
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      
      await UserService.deleteUser(parseInt(id));
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting user',
        error: error.message || 'Unknown error',
      });
    }
  }
}
`;

        // Create example routes file
        const routesPath = path.join(process.cwd(), "src", "routes", `user.routes.${extension}`);

        const routesContent = language === "TypeScript" ? `import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

// User routes
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
` : `import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const router = Router();

// User routes
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
`;

        // Write all files
        await writeFile(schemaPath, schemaContent.trim(), "utf-8");
        await writeFile(configDbPath, configDbContent.trim(), "utf-8");
        await writeFile(servicePath, serviceContent.trim(), "utf-8");
        await writeFile(controllerPath, controllerContent.trim(), "utf-8");
        await writeFile(routesPath, routesContent.trim(), "utf-8");

        // Generate Prisma client
        logInfo("🔧 Generating Prisma client...");
        try {
            await execPromise("npx prisma generate");
            logSuccess("✅ Prisma client generated successfully!");
        } catch (error) {
            logInfo("⚠️  Prisma client generation will be available after npm install completes");
        }

    } catch (error) {
        throw error;
    }
}

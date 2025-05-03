import fs from "fs";
import path from "path";

export async function configureScripts(projectName) {
  const indexContent = `
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Hello from ${projectName} backend!'));

app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('🚀 Server running on http://localhost:' + port));
`;

  fs.writeFileSync(
    path.join(process.cwd(), "src", "index.js"),
    indexContent.trim()
  );

  const userController = `
export const getUsers = (req, res) => {
  res.json({ message: "List of users" });
};
`;
  fs.writeFileSync(
    path.join(process.cwd(), "src", "controllers", "userController.js"),
    userController.trim()
  );

  const userRoutes = `
import express from 'express';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);

export default router;
`;
  fs.writeFileSync(
    path.join(process.cwd(), "src", "routes", "userRoutes.js"),
    userRoutes.trim()
  );
}

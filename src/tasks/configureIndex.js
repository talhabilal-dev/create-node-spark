import path from "path";
import { writeFile } from "../utils/fileSystem.js";
import { logSuccess } from "../utils/logger.js";

export async function configureIndex(projectName, language, framework) {
    try {
        const isTS = language === "TypeScript";
        const extension = isTS ? "ts" : "js";

        let indexContent = "";

        if (framework === "Express") {
            indexContent = isTS
                ? `
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from ${projectName} backend!');
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log('🚀 Server running on http://localhost:' + port)
);
                `
                : `
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Hello from ${projectName} backend!'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('🚀 Server running on http://localhost:' + port));
                `;
        } else {
            indexContent = isTS
                ? `
import http, { IncomingMessage, ServerResponse } from 'http';

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from ${projectName} backend!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
                `
                : `
import http from 'http';

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from ${projectName} backend!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
                `;
        }

        const indexPath = path.join(process.cwd(), "src", `index.${extension}`);

        await writeFile(indexPath, indexContent.trim(), "utf-8");

        logSuccess(`✅ Created src/index.${extension}`);
    } catch (error) {
        throw error;
    }
}

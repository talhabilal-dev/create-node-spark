import path from "path";
import { writeFile } from "../utils/fileSystem.js";
import { logSuccess } from "../utils/logger.js";

export async function configureIndex(projectName, language, framework, database) {
    try {
        const isTS = language === "TypeScript";
        const extension = isTS ? "ts" : "js";

        let indexContent = "";

        if (framework === "Express") {
            indexContent = isTS
                ? `
import express, { Request, Response } from 'express';
import ENV from "./config/env.config";
${database ? `import connectDB from './config/db.config';` : ''}

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from ${projectName} backend!');
});

const port: number = ENV.PORT || 3000;
{{APP_LISTEN}};
                `
                : `
import express from 'express';
import ENV from "./config/env.config.js";
${database ? `import connectDB from './config/db.config.js';` : ''}

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Hello from ${projectName} backend!'));

const port = ENV.PORT || 3000;
{{APP_LISTEN}};
                `;
        } else {
            indexContent = isTS
                ? `
import http, { IncomingMessage, ServerResponse } from 'http';
import ENV from "./config/env.config";
${database ? `import connectDB from './config/db.config';` : ''}

const app = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from ${projectName} backend!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT: number = ENV.PORT || 3000;
{{APP_LISTEN}};
                `
                : `
import http from 'http';
import ENV from "./config/env.config.js";
${database ? `import connectDB from './config/db.config.js';` : ''}

const app = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from ${projectName} backend!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = ENV.PORT || 3000;
{{APP_LISTEN}}
                `;
        }

        // 🔥 NOW: inject the APP_LISTEN logic
        let appListenLogic = '';

        if (database) {
            if (framework === 'Express') {
                appListenLogic = isTS
                    ? `
connectDB().then(() => {
    app.listen(port, () => console.log(\`🚀 Server running on port \${port}\`));
}).catch((err: any) => {
    console.error('❌ Failed to connect to DB:', err);
});
                    `
                    : `
connectDB().then(() => {
    app.listen(port, () => console.log(\`🚀 Server running on port \${port}\`));
}).catch((err) => {
    console.error('❌ Failed to connect to DB:', err);
});
                    `;
            } else {
                appListenLogic = isTS
                    ? `
connectDB().then(() => {
    app.listen(PORT, () => console.log(\`🚀 Server running on port \${PORT}\`));
}).catch((err: any) => {
    console.error('❌ Failed to connect to DB:', err);
});
                    `
                    : `
connectDB().then(() => {
    app.listen(PORT, () => console.log(\`🚀 Server running on port \${PORT}\`));
}).catch((err) => {
    console.error('❌ Failed to connect to DB:', err);
});
                    `;
            }
        } else {
            if (framework === 'Express') {
                appListenLogic = `
app.listen(port, () => console.log(\`🚀 Server running on port \${port}\`));
                `;
            } else {
                appListenLogic = `
app.listen(PORT, () => console.log(\`🚀 Server running on port \${PORT}\`));
                `;
            }
        }

        // 🪄 Replace the placeholder with the actual logic
        indexContent = indexContent.replace('{{APP_LISTEN}}', appListenLogic.trim());

        const indexPath = path.join(process.cwd(), "src", `index.${extension}`);
        await writeFile(indexPath, indexContent.trim(), "utf-8");

        logSuccess(`✅ Created src/index.${extension}`);
    } catch (error) {
        throw error;
    }
}

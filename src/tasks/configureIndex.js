import path from "path";
import { writeFile } from "../utils/fileSystem.js";
import { logSuccess } from "../utils/logger.js";

export async function configureIndex(projectName, language, framework, database) {
    try {
        const isTS = language === "TypeScript";
        const extension = isTS ? "ts" : "js";

        let indexContent = "";

        // Setting up the framework logic
        if (framework === "Express") {
            indexContent = isTS
                ? `
import express, { Request, Response } from 'express';
import ENV from "./config/env.config";
${database === 'MongoDB' ? `import connectDB from './config/db.config';` : database === 'MySQL' ? `import connectDB from './config/db.config';` : ''}

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from ${projectName} backend!');
});

const port: number = ENV.PORT || 3000;
{{APP_LISTEN}};
                `
                : `
import express from 'express';
import ENV from "./config/env.config.js";
${database === 'MongoDB' ? `import connectDB from './config/db.config.js';` : database === 'MySQL' ? `import connectDB from './config/db.config.js';` : ''}

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
${database === 'MongoDB' ? `import connectDB from './config/db.config';` : database === 'MySQL' ? `import connectDB from './config/db.config';` : ''}

const app = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from ${projectName} backend!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const port: number = ENV.PORT || 3000;
{{APP_LISTEN}};
                `
                : `
import http from 'http';
import ENV from "./config/env.config.js";
${database === 'MongoDB' ? `import connectDB from './config/db.config.js';` : database === 'MySQL' ? `import connectDB from './config/db.config.js';` : ''}

const app = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from ${projectName} backend!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const port = ENV.PORT || 3000;
{{APP_LISTEN}}
                `;
        }

        // 🔥 NOW: inject the APP_LISTEN logic for MongoDB or MySQL
        let appListenLogic = '';

        if (database === 'MongoDB') {
            appListenLogic = isTS
                ? `
connectDB().then(() => {
    console.log('✅ Connected to DB');
    app.listen(port, () => console.log(\`🚀 Server running on port \${port}\`));
}).catch((err: any) => {
    console.error('❌ Failed to connect to DB:', err);
});
                `
                : `
connectDB().then(() => {
    console.log('✅ Connected to DB');
    app.listen(port, () => console.log(\`🚀 Server running on port \${port}\`));
}).catch((err) => {
    console.error('❌ Failed to connect to DB:', err);
});
                `;
        } else if (database === 'MySQL') {
            appListenLogic = isTS
                ? `
connectDB.raw('SELECT 1').then(() => {
    console.log('✅ Connected to DB');
    app.listen(port, () => console.log(\`🚀 Server running on port \${port}\`));
}).catch((err: any) => {
    console.error('❌ Failed to connect to DB:', err);
});
                `
                : `
connectDB.raw('SELECT 1').then(() => {
    console.log('✅ Connected to DB');
    app.listen(port, () => console.log(\`🚀 Server running on port \${port}\`));
}).catch((err) => {
    console.error('❌ Failed to connect to DB:', err);
});
                `;
        } else {
            appListenLogic = `
app.listen(port, () => console.log(\`🚀 Server running on port \${port}\`));
            `;
        }

        // 🪄 Replace the placeholder with the actual logic
        indexContent = indexContent.replace('{{APP_LISTEN}}', appListenLogic.trim());

        // Writing to the index file
        const indexPath = path.join(process.cwd(), "src", `index.${extension}`);
        await writeFile(indexPath, indexContent.trim(), "utf-8");

        logSuccess(`✅ Created src/index.${extension}`);
    } catch (error) {
        throw error;
    }
}

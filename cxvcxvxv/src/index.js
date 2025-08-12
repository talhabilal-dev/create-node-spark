import http from 'http';
import ENV from "./config/env.config.js";


const app = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello from cxvcxvxv backend!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const port = ENV.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
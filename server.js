/**
 * Optimized Hostinger Startup File for GoToxinFree
 * This file handles static file serving and limits the Node.js thread pool.
 */

// 1. Force the thread pool to minimum size (Crucial for Hostinger Shared Hosting)
process.env.UV_THREADPOOL_SIZE = '1';
process.env.NODE_ENV = 'production';

const http = require('http');
const path = require('path');
const fs = require('fs');

console.log('--- Starting Optimized Server for GoToxinFree ---');

// 2. Load the Next.js standalone handler
// When using output: 'standalone', Next.js creates this file
const standalonePath = path.join(__dirname, '.next', 'standalone', 'server.js');
if (!fs.existsSync(standalonePath)) {
    console.error('CRITICAL: .next/standalone/server.js not found! Ensure you have run "npm run build".');
    process.exit(1);
}

// Next.js standalone server exports a handler
const nextHandler = require(standalonePath).currentHandler || require(standalonePath);

// 3. Create a wrapper server
const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];

    // A. Check for static files in /public
    const publicDir = path.join(__dirname, 'public');
    const publicFilePath = path.join(publicDir, url);

    if (fs.existsSync(publicFilePath) && fs.lstatSync(publicFilePath).isFile()) {
        const ext = path.extname(publicFilePath).toLowerCase();
        const mimeTypes = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.otf': 'font/otf'
        };

        res.writeHead(200, { 
            'Content-Type': mimeTypes[ext] || 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000, immutable'
        });
        fs.createReadStream(publicFilePath).pipe(res);
        return;
    }

    // B. Check for static files in /.next/static
    if (url.startsWith('/_next/static/')) {
        const staticFilePath = path.join(__dirname, '.next', 'static', url.replace('/_next/static/', ''));
        if (fs.existsSync(staticFilePath) && fs.lstatSync(staticFilePath).isFile()) {
            const ext = path.extname(staticFilePath).toLowerCase();
            const mimeTypes = {
                '.css': 'text/css',
                '.js': 'text/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.woff': 'font/woff',
                '.woff2': 'font/woff2'
            };
            res.writeHead(200, { 
                'Content-Type': mimeTypes[ext] || 'application/octet-stream',
                'Cache-Control': 'public, max-age=31536000, immutable'
            });
            fs.createReadStream(staticFilePath).pipe(res);
            return;
        }
    }

    // C. Delegate everything else to Next.js
    nextHandler(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

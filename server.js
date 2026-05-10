/**
 * Optimized Hostinger Startup File (Synced with AradhanaTrust)
 * This file handles static file serving manually and limits the Node.js thread pool.
 */

// 1. Force the thread pool to minimum size (Crucial for Hostinger)
process.env.UV_THREADPOOL_SIZE = '1';
process.env.NODE_ENV = 'production';

const http = require('http');
const path = require('path');
const fs = require('fs');

console.log('--- Starting Optimized Server with Static Support  ---');

// 2. Load the Next.js standalone handler
// When building with output: 'standalone', Next.js creates this file
const standalonePath = path.join(__dirname, '.next', 'standalone', 'server.js');
if (!fs.existsSync(standalonePath)) {
    console.error('CRITICAL: .next/standalone/server.js not found!');
    console.error('Did you run "npm run build" first?');
    process.exit(1);
}

// Next.js standalone server exports a handler
const nextHandler = require(standalonePath).currentHandler || require(standalonePath);

// 3. Create a wrapper server
const server = http.createServer((req, res) => {

    // A. Serve uploaded images from the persistent UPLOAD_ROOT directory.
    //    On Hostinger this is the file_uploads folder outside the app.
    //    On local dev this falls back to public/uploads (served by Next.js directly).
    if (req.url && req.url.startsWith('/uploads/')) {
        const uploadsDir = process.env.UPLOAD_ROOT || path.join(__dirname, 'public', 'uploads');
        const fileName = req.url.replace('/uploads/', '').split('?')[0];
        const filePath = path.join(uploadsDir, fileName);

        if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
            };
            res.writeHead(200, {
                'Content-Type': mimeTypes[ext] || 'application/octet-stream',
                'Cache-Control': 'public, max-age=31536000, immutable',
            });
            fs.createReadStream(filePath).pipe(res);
            return;
        }
    }

    // B. Check for other static files in /public
    const publicDir = path.join(__dirname, 'public');
    const filePath = path.join(publicDir, req.url.split('?')[0]);

    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.json': 'application/json'
        };

        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
        return;
    }

    // B. Check for static files in /.next/static
    if (req.url.startsWith('/_next/static/')) {
        const staticFilePath = path.join(__dirname, '.next', req.url.replace('/_next/', ''));
        if (fs.existsSync(staticFilePath) && fs.lstatSync(staticFilePath).isFile()) {
            const ext = path.extname(staticFilePath).toLowerCase();
            const mimeTypes = {
                '.css': 'text/css',
                '.js': 'text/javascript',
                '.json': 'application/json'
            };
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
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

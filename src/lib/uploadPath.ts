/**
 * Centralized, consistent upload path resolution.
 *
 * Problem: In Next.js standalone mode, process.chdir() is called to switch
 * the working directory to .next/standalone/. This breaks process.cwd()-based
 * paths. Using __dirname is also unreliable because it resolves to the
 * compiled output location inside .next/, not the source tree.
 *
 * Solution: Use the UPLOAD_ROOT environment variable on Hostinger (set it to
 * the project root absolute path, e.g. /home/user/htdocs/gotoxinfreewithtina.com).
 * Falls back to process.cwd() which is correct on local dev.
 *
 * On Hostinger hPanel → Node.js → Environment Variables:
 *   UPLOAD_ROOT = /home/u123456789/htdocs/gotoxinfreewithtina.com
 */
import path from 'path';
import { existsSync } from 'fs';

function resolveProjectRoot(): string {
  // 1. Explicit env var — most reliable for production Hostinger
  if (process.env.UPLOAD_ROOT) {
    return process.env.UPLOAD_ROOT;
  }

  // 2. process.cwd() works correctly in local dev ('npm run dev')
  //    and also in Hostinger if the outer server.js is launched from the project root
  const cwd = process.cwd();

  // 3. If cwd already points to standalone dir, climb up to project root
  if (cwd.includes('.next')) {
    return path.resolve(cwd, '..', '..');
  }

  return cwd;
}

export const PROJECT_ROOT = resolveProjectRoot();

// All uploaded images land here — consistent between upload API, export, and restore
export const UPLOADS_DIR = path.join(PROJECT_ROOT, 'public', 'uploads');

export function getUploadFilePath(fileName: string): string {
  return path.join(UPLOADS_DIR, fileName);
}

// Log on startup so you can verify in Hostinger logs
console.log(`[uploadPath] PROJECT_ROOT = ${PROJECT_ROOT}`);
console.log(`[uploadPath] UPLOADS_DIR  = ${UPLOADS_DIR}`);
console.log(`[uploadPath] Dir exists   = ${existsSync(UPLOADS_DIR)}`);

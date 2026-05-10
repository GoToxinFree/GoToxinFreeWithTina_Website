/**
 * Centralized upload path resolution.
 *
 * Two modes:
 * 
 * LOCAL DEV (npm run dev):
 *   UPLOAD_ROOT is blank → files go to {cwd}/public/uploads/
 *   Next.js dev server automatically serves /public/ files, so preview works.
 *
 * HOSTINGER PRODUCTION:
 *   UPLOAD_ROOT = /home/u602836791/domains/gotoxinfreewithtina.com/file_uploads
 *   Files are saved there (a persistent folder outside the app that survives redeployments).
 *   server.js intercepts /uploads/ requests and serves from this directory.
 *
 * Set in hPanel → Node.js → Environment Variables:
 *   UPLOAD_ROOT = /home/u602836791/domains/gotoxinfreewithtina.com/file_uploads
 */
import path from 'path';
import { existsSync } from 'fs';

// If UPLOAD_ROOT env var is set, use it directly as the uploads directory.
// Otherwise fall back to public/uploads (correct for local dev).
export const UPLOADS_DIR = process.env.UPLOAD_ROOT
  ? process.env.UPLOAD_ROOT
  : path.join(process.cwd(), 'public', 'uploads');

export function getUploadFilePath(fileName: string): string {
  return path.join(UPLOADS_DIR, fileName);
}

// Startup diagnostic log — check Hostinger Node.js logs to verify
console.log(`[uploadPath] UPLOADS_DIR = ${UPLOADS_DIR}`);
console.log(`[uploadPath] Dir exists  = ${existsSync(UPLOADS_DIR)}`);

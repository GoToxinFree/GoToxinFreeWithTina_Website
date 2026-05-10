/**
 * Centralized, consistent upload path resolution.
 *
 * Problem: In Next.js standalone mode, process.chdir() is called to switch the
 * working directory to .next/standalone/. This means process.cwd() returns
 * the wrong folder at runtime, causing uploads to be saved in a different
 * location than where the static file server looks for them.
 *
 * Fix: Navigate from this file's real location (__dirname) upward to the
 * project root, then resolve to public/uploads. This is stable regardless
 * of what process.chdir() does.
 *
 * File sits at: src/lib/uploadPath.ts
 * Project root is 2 levels up from here: ../../
 */
import path from 'path';

// Go up: src/lib -> src -> project_root
export const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..', '..');

// All uploaded images land here, and the static server also reads from here
export const UPLOADS_DIR = path.join(PROJECT_ROOT, 'public', 'uploads');

export function getUploadFilePath(fileName: string): string {
  return path.join(UPLOADS_DIR, fileName);
}

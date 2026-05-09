# Hostinger Node.js Stability & Optimization Skill

## Context
Hostinger shared hosting (and similar environments) imposes strict limits on the number of processes and threads a Node.js application can spawn. Standard Next.js configurations often hit these limits, resulting in `pthread_create: Resource temporarily unavailable` errors or "malformed" layouts due to build-time CSS collisions.

## Core Principles

### 1. Architectural: Use Server Actions
**Always prioritize Next.js Server Actions over API Routes (`/api/...`).**
- **Why**: API routes trigger separate network requests and can spawn additional process threads. Server Actions are integrated into the main Node.js process, reducing memory pressure and bypass browser-specific loading issues (especially in Edge/Chrome).
- **Rule**: If a component needs to submit a form or fetch data for a mutation, use `src/app/actions/`.

### 2. Configuration: Next.js Standalone Mode
Update `next.config.ts` to minimize the deployment footprint:
```typescript
const nextConfig = {
  output: 'standalone', // Mandatory for Hostinger Node.js
  experimental: {
    workerThreads: false, // Prevents spawning extra threads during build/run
    cpus: 1,              // Limit build resource usage
  },
  images: {
    unoptimized: true,    // Reduces image processing memory spikes
  }
};
```

### 3. Thread Pool Control: custom `server.js`
Always use a wrapper entry point to set environment limits BEFORE the app starts.
- **Entry Point**: `server.js`
- **Variable**: `process.env.UV_THREADPOOL_SIZE = '1';` (Critical for preventing pthread errors).

### 4. CSS Stability: Unique Module Naming
**Never** use multiple files named `page.module.css` in the same project.
- **Why**: Hostinger’s build/optimization phase can sometimes collide files with the same name, causing pages to lose all styling in production while looking fine on localhost.
- **Rule**: Rename modules to `contact.module.css`, `about.module.css`, etc.
- **Foundation**: Move core layout classes (like `.main` for sticky footers) to a global `globals.css` file.

### 5. Dependency Management
- **Avoid Binary Dependencies**: Replace `bcrypt` (native) with `bcryptjs` (pure JS).
- **Prisma**: Ensure `engineType = "library"` in the Prisma generator to avoid spawning separate binary processes.

### 6. Hydration Mismatch
Browser extensions (Grammarly, etc.) frequently inject attributes into `<body>` on production sites, breaking React hydration.
- **Fix**: Apply `suppressHydrationWarning` to both `<html>` and `<body>` tags in `layout.tsx`.

## Troubleshooting Playbook
1. **Malformed Layout?** Check if CSS Module classes are returning `undefined`. Rename the module.
2. **Resource Temporarily Unavailable?** Check `UV_THREADPOOL_SIZE` and ensure no `child_process` is being spawned.
3. **Intermittent 429/500?** Convert the offending API route to a Server Action.
4. **Always Purge Cache**: After every deployment, the Hostinger "Cache Manager" must be purged manually via hPanel.

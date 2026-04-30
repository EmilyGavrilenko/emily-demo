# AGENTS.md

## Cursor Cloud specific instructions

This is a React + TypeScript + Vite single-page application (`emily-demo`). No backend, database, or external services required.

### Key commands

See `package.json` scripts:
- `npm run dev` — Vite dev server with HMR (default port 5173)
- `npm run build` — TypeScript type-check + production build
- `npm run lint` — ESLint
- `npm run preview` — serve production build locally

### Dev server

Start with `npm run dev -- --host 0.0.0.0` to expose on all interfaces (needed in cloud VMs). The server starts in ~100ms and supports HMR out of the box.

### Node.js

Managed via nvm. Run `nvm use` or rely on the default alias set to LTS. The update script handles `npm install` automatically.

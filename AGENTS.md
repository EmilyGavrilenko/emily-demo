# AGENTS.md

## Cloud-specific instructions

This is a React + TypeScript + Vite single-page app (`emily-demo`). No backend, database, or Docker services required.

### Commands

Standard dev commands are in `package.json`:

| Task | Command |
|------|---------|
| Dev server | `npm run dev -- --host 0.0.0.0` |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Preview prod build | `npm run preview` |

### Notes

- The dev server runs on port **5173** by default. Pass `--host 0.0.0.0` to make it accessible from the network (needed for cloud VM browser testing).
- There are no automated tests configured in this project; lint and build are the primary verification steps.

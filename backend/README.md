# PLEARN backend

Minimal TypeScript Express backend scaffold using Supabase.


Quick start (Bun)

1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `bun install` (or `npm install` if you prefer NPM)
3. Run in dev with Bun: `bun --watch src/server.ts`
	- Or run once with: `bun src/server.ts`

Notes about Docker: this backend intentionally does NOT use Docker. Dockerfile
and docker-compose have been deprecated and replaced with direct Bun runtime
instructions. Do not attempt to run Docker for the backend; use Bun instead.

Routes are available under `/rest/v1/*`:

- `/rest/v1/profiles` GET, PATCH
- `/rest/v1/plans` GET, POST, PATCH, DELETE
- `/rest/v1/ai_commands` GET, POST
- `/rest/v1/ai_history` GET, POST
- `/rest/v1/integrations` GET, POST

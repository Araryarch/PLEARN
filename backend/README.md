PLEARN backend — Quick curl snippets for testing
===============================================

This file contains ready-to-use curl commands for every REST endpoint under `/rest/v1`.
They use plain URLs (no environment variables) and are designed to be pasted directly into Hoppscotch
via Import -> Raw text / cURL. Replace IDs in the examples with the actual IDs returned from Create calls.

Base URL
--------

http://localhost:3000

How to use
----------

- Start the backend server locally so the endpoints respond on http://localhost:3000.
- Copy a curl command below and paste it into Hoppscotch (Import → Raw text/cURL) or run it locally in a terminal.
- For create/update requests note the response body and capture the created resource id to use in subsequent update/delete commands.

Health
------

Check server health

curl 'http://localhost:3000/health'

Plans
-----

List plans

curl 'http://localhost:3000/rest/v1/plans'

Create a plan

curl -X POST 'http://localhost:3000/rest/v1/plans' \
  -H 'Content-Type: application/json' \
  -d '{"title":"New Study Plan (Hoppscotch)","description":"Daily practice: 2h","start_time":"2025-10-27T08:00:00.000Z","end_time":"2025-10-27T10:00:00.000Z","user_id":1}'

Update a plan (replace 1 with the real plan id)

curl -X PATCH 'http://localhost:3000/rest/v1/plans/1' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Updated: Focused Practice","description":"Updated description"}'

Delete a plan (replace 1)

curl -X DELETE 'http://localhost:3000/rest/v1/plans/1'

Integrations
------------

List integrations

curl 'http://localhost:3000/rest/v1/integrations'

Create an integration

curl -X POST 'http://localhost:3000/rest/v1/integrations' \
  -H 'Content-Type: application/json' \
  -d '{"provider":"google","access_token":"example-access-token","refresh_token":"example-refresh-token","token_expiry":"2025-11-01T00:00:00.000Z","user_id":1}'

Update an integration (replace 1)

curl -X PATCH 'http://localhost:3000/rest/v1/integrations/1' \
  -H 'Content-Type: application/json' \
  -d '{"access_token":"new-token-value","token_expiry":"2025-12-01T00:00:00.000Z"}'

Delete an integration (replace 1)

curl -X DELETE 'http://localhost:3000/rest/v1/integrations/1'

AI Commands
-----------

List AI commands

curl 'http://localhost:3000/rest/v1/ai_commands'

Create an AI command

curl -X POST 'http://localhost:3000/rest/v1/ai_commands' \
  -H 'Content-Type: application/json' \
  -d '{"raw_text":"Generate a 5-step revision checklist for calculus","parsed_action":"generate_checklist","parsed_content":{"topic":"Calculus","points":5},"user_id":1}'

Update an AI command (replace 1)

curl -X PATCH 'http://localhost:3000/rest/v1/ai_commands/1' \
  -H 'Content-Type: application/json' \
  -d '{"parsed_content":{"topic":"Calculus","points":6}}'

Delete an AI command (replace 1)

curl -X DELETE 'http://localhost:3000/rest/v1/ai_commands/1'

AI History
----------

List AI history

curl 'http://localhost:3000/rest/v1/ai_history'

Create AI history entry

curl -X POST 'http://localhost:3000/rest/v1/ai_history' \
  -H 'Content-Type: application/json' \
  -d '{"query":"What should I study next?","response":"Practice problem sets from chapters 3 and 4.","related_plan_id":1,"user_id":1}'

Update AI history entry (replace 1)

curl -X PATCH 'http://localhost:3000/rest/v1/ai_history/1' \
  -H 'Content-Type: application/json' \
  -d '{"response":"Refined response with extra links"}'

Delete AI history entry (replace 1)

curl -X DELETE 'http://localhost:3000/rest/v1/ai_history/1'

Profiles
--------

List profiles

curl 'http://localhost:3000/rest/v1/profiles'

Get profile by id (example UUID)

curl 'http://localhost:3000/rest/v1/profiles?id=00000000-0000-0000-0000-000000000001'

Update profile (replace the UUID with the real user id)

curl -X PATCH 'http://localhost:3000/rest/v1/profiles/00000000-0000-0000-0000-000000000001' \
  -H 'Content-Type: application/json' \
  -d '{"full_name":"Student Example","bio":"I study daily"}'

Example sequence: create → use id
---------------------------------

1) Run the Create Plan command above. Note the returned plan id (e.g., 42).
2) Use that id in the Update and Delete Plan commands by replacing the example id (1) with the real id (42).

Need automation?
----------------

If you want, I can add Hoppscotch/Postman test scripts to automatically extract created IDs into variables so you don't need to copy/paste them. I can also export a single Hoppscotch import bundle (raw import) with these commands.

---
Generated on: 2025-10-27
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

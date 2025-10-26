Applying the database schema

This folder contains `schema.sql` with the tables used by the backend:

- plans
- ai_commands
- integrations
- ai_history

To apply to your Supabase project, either use the Supabase SQL editor or run locally with psql (if you have access to the Postgres DB):

Using supabase CLI (recommended):

1. Install supabase CLI and authenticate: https://supabase.com/docs/guides/cli
2. Run the SQL in the SQL editor or use `supabase db remote set` + `psql` to run `schema.sql`.

Or with psql directly:

```bash
# Example: PGPASSWORD=... psql "$DATABASE_URL" -f db/schema.sql
```

Notes:
- The schema expects `auth.users` (Supabase Auth) to exist.
- `uuid-ossp` extension is created if missing (some Supabase projects may use `gen_random_uuid()` instead).

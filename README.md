# POSE Personality Test

A single-page personality quiz (Peacock 🦚 / Owl 🦉 / Swan 🦢 / Eagle 🦅) built with React + Vite + Tailwind.

**Live site:** https://chuatzeyee.github.io/pose/

## How it works

- 20 questions, shuffled per session; each answer maps to one of four bird types.
- Results show a primary/secondary blend with a percentage breakdown.
- Completed results are saved anonymously to Supabase (`pose_results` table).
- **Admin dashboard** at [`#/admin`](https://chuatzeyee.github.io/pose/#/admin): colleagues sign in with
  Supabase email/password to review responses, see type distribution and per-day
  trends, and export CSV.

## Development

```bash
npm install
cp .env.example .env.local   # fill in Supabase values
npm run dev
```

## Tests

```bash
npm test
```

## Deploy

```bash
npm run deploy   # builds and pushes dist/ to the gh-pages branch
```

GitHub Pages must be set to serve from the `gh-pages` branch (root).

## Admin access

Results are protected by Postgres row-level security. To grant a colleague access:

1. Create a user for them in Supabase Auth (Dashboard → Authentication → Add user).
2. Add their user id to the `pose_admins` table:

```sql
insert into public.pose_admins (user_id, email)
select id, email from auth.users where email = 'colleague@example.com';
```

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key — safe to expose; RLS enforces access |

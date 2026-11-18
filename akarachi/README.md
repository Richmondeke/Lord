# akarachi

Website and Empowerment Portal for Hon. Engr. Akarachi Amadi, rebuilt as Next.js source
from the deployed site at akarachi.guava.earth (the original source was not available).

- `app/(site)` — the public site (`/`, `/system`)
- `app/portal` — the Empowerment Portal (programmes, apply, dashboard, status, beneficiaries, admin)
- `app/api` — server routes backed by the `akarachi-portal` Supabase project
- `components`, `lib/content.js` — UI and published content
- `app/globals.css` — Tailwind v4 theme and component classes

## Run

    npm install
    cp .env.example .env.local   # fill in the values
    npm run dev

Without the Supabase variables the portal still works, but keeps accounts and
applications in the visitor's browser only (`/api/auth` reports `backend: "local"`).
Set them in Vercel so applications reach the database.

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// if (!supabaseUrl || !supabaseKey) {
//     throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
// }

// export const db = createClient(supabaseUrl, supabaseKey);


// create table public.sessions (
//   id              uuid primary key default gen_random_uuid(),
//   user_id         uuid not null references public.users(id) on delete cascade,
//   refresh_hash    text not null,
//   expires_at      timestamptz not null,
//   revoked_at      timestamptz,
//   created_at      timestamptz not null default now()
// );

// create index sessions_user_id_idx on public.sessions(user_id);
// create index sessions_expires_idx on public.sessions(expires_at);
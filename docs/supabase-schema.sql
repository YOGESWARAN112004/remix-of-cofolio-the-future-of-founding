-- Run this in the Supabase SQL editor for your project.
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  building text not null,
  stage text not null check (stage in ('idea', 'building', 'live', 'scaling')),
  created_at timestamptz not null default now()
);

create index if not exists waitlist_email_idx on waitlist (email);

-- Row Level Security: keep this table server-only. The API route writes
-- with the service_role key, which bypasses RLS, so no public policies
-- need to be added here.
alter table waitlist enable row level security;

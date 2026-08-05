-- Run this in the Supabase SQL editor for your project.
-- Safe to run whether the `waitlist` table already exists or not.

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  building text not null,
  stage text not null check (stage in ('idea', 'building', 'live', 'scaling')),
  linkedin text not null,
  website text,
  created_at timestamptz not null default now()
);

-- In case the table already existed from before LinkedIn/Website were added.
alter table waitlist add column if not exists linkedin text;
alter table waitlist add column if not exists website text;

-- Backfill any rows submitted before `linkedin` existed, so the NOT NULL
-- constraint below doesn't fail.
update waitlist set linkedin = '' where linkedin is null;
alter table waitlist alter column linkedin set not null;

create index if not exists waitlist_email_idx on waitlist (email);

-- Row Level Security: keep this table server-only. The API route writes
-- with the service_role key, which bypasses RLS, so no public policies
-- need to be added here.
alter table waitlist enable row level security;

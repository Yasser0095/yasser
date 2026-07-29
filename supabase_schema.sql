
-- Supabase / PostgreSQL - انسخ هذا في SQL Editor
create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  avatar text,
  created_at timestamp default now()
);

create table groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid references users(id),
  created_at timestamp default now()
);

create table group_members (
  group_id uuid references groups(id),
  user_id uuid references users(id),
  role text default 'member',
  primary key (group_id, user_id)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  room_id text not null,
  sender_id uuid references users(id),
  content text,
  type text default 'text',
  created_at timestamp default now()
);

create table broadcasts (
  id uuid primary key default gen_random_uuid(),
  title text,
  broadcaster_id uuid references users(id),
  room_id text,
  is_live boolean default false,
  started_at timestamp default now()
);

-- Enable Realtime
alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table broadcasts;

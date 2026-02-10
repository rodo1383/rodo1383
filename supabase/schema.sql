-- Activer extension UUID
create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid unique not null,
  full_name text not null,
  email text unique not null,
  role text not null check (role in ('avocat','collaborateur','administrateur')),
  created_at timestamp with time zone default now()
);

create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('particulier','entreprise')),
  nom text not null,
  email text,
  telephone text,
  adresse text,
  nif text,
  notes text,
  created_by uuid references users(id),
  created_at timestamp with time zone default now()
);

create table if not exists cases (
  id uuid primary key default uuid_generate_v4(),
  reference text unique not null,
  titre text not null,
  description text,
  client_id uuid references clients(id) on delete cascade,
  statut text not null check (statut in ('ouvert','en_audience','en_negociation','clos')),
  juridiction text,
  prochaine_audience date,
  created_by uuid references users(id),
  created_at timestamp with time zone default now()
);

create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade,
  nom text not null,
  file_url text not null,
  type text,
  confidentialite text not null check (confidentialite in ('public','interne','strictement_confidentiel')),
  ocr_text text,
  version integer default 1,
  uploaded_by uuid references users(id),
  uploaded_at timestamp with time zone default now()
);

create table if not exists invoices (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade,
  numero text unique not null,
  montant numeric(12,2) not null,
  statut text not null check (statut in ('en_attente','partiellement_payee','payee')),
  date_emission date not null,
  date_echeance date,
  created_by uuid references users(id),
  created_at timestamp with time zone default now()
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid references invoices(id) on delete cascade,
  montant numeric(12,2) not null,
  mode_paiement text,
  reference text,
  date_paiement date not null,
  created_at timestamp with time zone default now()
);

create table if not exists calendar_events (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete set null,
  titre text not null,
  type text not null check (type in ('audience','rendez_vous','echeance')),
  start_at timestamp with time zone not null,
  end_at timestamp with time zone,
  reminder_minutes integer default 60,
  created_by uuid references users(id),
  created_at timestamp with time zone default now()
);

create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade,
  titre text not null,
  description text,
  assignee uuid references users(id),
  due_date date,
  status text default 'a_faire' check (status in ('a_faire','en_cours','termine')),
  created_at timestamp with time zone default now()
);

-- Row level security
alter table users enable row level security;
alter table clients enable row level security;
alter table cases enable row level security;
alter table documents enable row level security;
alter table invoices enable row level security;
alter table payments enable row level security;
alter table calendar_events enable row level security;
alter table tasks enable row level security;

create policy "Accès utilisateurs connectés" on clients for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Accès utilisateurs connectés" on cases for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Accès utilisateurs connectés" on documents for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Accès utilisateurs connectés" on invoices for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Accès utilisateurs connectés" on payments for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Accès utilisateurs connectés" on calendar_events for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Accès utilisateurs connectés" on tasks for all
using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

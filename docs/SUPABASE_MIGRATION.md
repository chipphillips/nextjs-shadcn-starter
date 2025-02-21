# Migrating to Supabase

This document outlines the steps needed to migrate from the mock implementation to Supabase.

## Current Mock Implementation

The development environment uses a mock implementation that includes:
- In-memory user storage
- Mock authentication
- Local session management

## Migration Steps

1. **Environment Setup**
   - Add Supabase project URL and anon key to `.env.local`
   - Remove mock implementation files:
     - `lib/mock-db.ts`
     - `lib/mock-auth.ts`
     - `middleware-mock.ts`

2. **Authentication**
   - Replace `mockAuth` with Supabase auth in `hooks/useAuth.ts`
   - Update middleware to use Supabase auth
   - Implement email verification if needed

3. **Database**
   - Create tables in Supabase using the migration in `supabase/migrations`
   - Enable Row Level Security (RLS)
   - Set up appropriate policies

4. **Data Migration**
   - Export any development data from mock DB
   - Import data to Supabase
   - Verify data integrity

5. **Testing**
   - Update tests to use Supabase
   - Add integration tests
   - Verify auth flows

## Required Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database Schema

The mock implementation mirrors this schema:

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  email text not null,
  full_name text,
  avatar_url text,
  updated_at timestamptz
);
```

## Authentication Flows

Current mock auth supports:
- Email/password signup
- Email/password login
- Session management

Supabase additionally provides:
- Social auth
- Magic links
- Phone auth
- Multi-factor authentication (MFA)

## API Changes

When migrating to Supabase:

1. Replace mock client calls:
```typescript
// From
const { user } = await mockAuth.getUser();

// To
const { data: { user } } = await supabase.auth.getUser();
```

2. Update auth hooks:
```typescript
// From
const { token } = await mockAuth.signIn(email, password);

// To
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});
```
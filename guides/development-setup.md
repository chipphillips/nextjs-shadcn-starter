# Development Setup Guide

## Overview

This guide details the setup process for the Constructiv AI platform development environment on Windows 11 ARM64.

## Prerequisites

### System Requirements

- Windows 11 ARM64 (Version 10.0.26100 or later)
- PowerShell Core 7.4.6 or later
- 16GB RAM recommended
- 100GB+ free disk space

### Required Tools

- Node.js v22.14.0 (ARM64)
- pnpm v9.15.3 (`npm install -g pnpm@9.15.3`)
- Git v2.47.1 (runs via x64 emulation)
- VS Code (ARM64 version)
- Supabase CLI (latest)
- OpenAI API key

### Architecture Notes

Some tools run natively on ARM64, while others use Windows x64 emulation:

Native ARM64:

- Node.js and npm-based tools
- PowerShell Core
- VS Code
- Docker Desktop

x64 Emulation:

- Git
- Some native Node.js modules
- Legacy tools without ARM64 support

## 1. Environment Setup

### 1.1 PowerShell Setup

```powershell
# Set execution policy
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Verify PowerShell version
$PSVersionTable.PSVersion  # Should show 7.4.6 or later
```

### 1.2 Repository Setup

```powershell
# Clone the repository
git clone [repository-url] constructiv-ai
cd constructiv-ai

# Create main branches
git checkout -b main
git checkout -b development

# Verify Git architecture (will show x64)
git --version
```

### 1.3 Node.js Verification

```powershell
# Verify Node.js version and architecture
node -v                    # Should show v22.14.0
node -p "process.arch"     # Should show 'arm64'

# Verify npm version
npm -v                     # Should show 11.1.0

# Verify pnpm version
pnpm -v                    # Should show 9.15.3
```

### 1.4 Next.js Project Setup

```powershell
# Create new Next.js project with App Router
pnpm create next-app@latest . --ts --tailwind --eslint --app --import-alias "@/*"

# Install core dependencies (all ARM64 compatible)
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs
pnpm add @prisma/client @tanstack/react-query zustand
pnpm add @openai/api openai-edge
pnpm add @vercel/ai
pnpm add shadcn-ui @radix-ui/react-* date-fns
pnpm add -D prisma @types/node typescript @types/react

# Install development dependencies
pnpm add -D prettier eslint-config-prettier
pnpm add -D @testing-library/react @testing-library/jest-dom jest

# Verify native module compatibility
node scripts/verify-arm64-modules.js
```

### 1.5 TypeScript Configuration

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 1.6 Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-key
```

## 2. Database Implementation

### 2.1 Supabase Project Setup

```bash
# Initialize Supabase project
supabase init
supabase start

# Link to remote project
supabase link --project-ref your-project-ref
```

### 2.2 Base Tables Creation

```sql
-- Create base tables using provided SQL scripts
-- Location: supabase/migrations/01_initial_schema.sql
-- See database-schema.md for complete SQL

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "vector";
create extension if not exists "pg_stat_statements";

-- Create schemas
create schema if not exists auth;
create schema if not exists storage;
create schema if not exists public;
```

### 2.3 Prisma Schema Setup

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// See data models documentation for complete schema
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  role      UserRole
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ... other models
```

### 2.4 RLS Policies

```sql
-- See database-schema.md for complete RLS policies
-- Location: supabase/migrations/02_rls_policies.sql

-- Enable RLS
alter table public.users enable row level security;
alter table public.projects enable row level security;

-- Create policies
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

-- ... other policies
```

## 3. Authentication Flow

### 3.1 Supabase Auth Setup

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### 3.2 Protected Routes

```typescript
// src/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}
```

### 3.3 Session Management

```typescript
// src/hooks/useAuth.ts
import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  session: Session | null
  signIn: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  session: null,
  signIn: async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    })
    if (error) throw error
  },
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, session: null })
  },
}))
```

### 3.4 Auth Middleware

```typescript
// src/lib/auth.ts
import { type NextRequest } from 'next/server'

export async function validateRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) {
    throw new Error('Missing authorization header')
  }

  // Validate JWT token
  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error) {
    throw new Error('Invalid token')
  }

  return user
}
```

## Project Structure

```project-structure
constructiv-ai/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx

│   ├── (dashboard)/
│   │   ├── projects/
│   │   ├── documents/
│   │   ├── tasks/
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── documents/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── ai/
│   │   └── webhooks/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── forms/
│   └── shared/
├── lib/
│   ├── supabase/
│   ├── utils/
│   ├── ai/
│   └── hooks/
├── styles/
├── public/
└── types/
```

Note: This structure follows Next.js 14 App Router conventions with route groups and feature-based organization.

## Getting Started

1. Clone repository and install dependencies
2. Copy `.env.example` to `.env.local` and fill in values
3. Start Supabase services locally
4. Run database migrations
5. Start development server

```bash
# Development
pnpm dev

# Database
supabase start
prisma generate
prisma db push

# Testing
pnpm test
```

## Common Issues & Solutions

1. **Supabase Connection Issues**
   - Verify environment variables
   - Check if Supabase is running locally
   - Confirm API keys are correct

2. **Prisma Schema Sync**
   - Run `prisma generate` after schema changes
   - Use `prisma db push` for development
   - Create migrations for production

3. **Next.js Build Errors**
   - Clear `.next` cache
   - Update TypeScript definitions
   - Check for missing dependencies

## Performance Considerations

### Native vs Emulated Performance

- Native ARM64 modules will offer better performance
- x64 emulated tools may have slightly slower startup times
- Use ARM64-specific builds when available
- Monitor memory usage for emulated processes

### Development Optimization

```powershell
# Configure Node.js memory limits for ARM64
$env:NODE_OPTIONS='--max-old-space-size=8192'

# Monitor process architecture
Get-Process | Where-Object { $_.ProcessName -like "*node*" } |
    Select-Object ProcessName, Path, @{
        Name="Architecture";
        Expression={ $_.StartInfo.EnvironmentVariables["PROCESSOR_ARCHITECTURE"] }
    }
```


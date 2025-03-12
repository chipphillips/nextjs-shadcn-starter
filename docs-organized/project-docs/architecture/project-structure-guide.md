# Project Structure Guide

## Root Directory Structure

After reviewing the codebase, there are several structural improvements needed:

1. Missing critical directories for scalability
2. Inconsistent component organization
3. Lack of proper type definitions
4. Missing configuration files
5. Incomplete documentation structure

## Proposed Directory Structure

constructiv-ai/
├── app/                # Next.js App Router directory
│   ├── (auth)/        # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (dashboard)/   # Dashboard routes
│   │   ├── projects/
│   │   ├── documents/
│   │   └── layout.tsx
│   ├── api/          # API routes
│   │   ├── auth/
│   │   ├── documents/
│   │   └── projects/
│   └── layout.tsx    # Root layout
├── components/       # React components
│   ├── ui/          # UI components
│   ├── forms/       # Form components
│   └── shared/      # Shared components
├── lib/             # Utility functions
│   ├── supabase/    # Supabase client & utilities
│   ├── utils/       # General utilities
│   └── hooks/       # Custom React hooks
├── config/          # Configuration files
│   ├── site.ts      # Site configuration
│   ├── auth.ts      # Auth configuration
│   └── ai.ts        # AI configuration
├── public/          # Static assets
│   ├── fonts/
│   └── images/
├── styles/          # Global styles
├── tests/           # Test files
├── types/           # TypeScript types
└── projectdocs/     # Project documentation

1. Move Existing Files

   - Move UI components to appropriate directories
   - Reorganize API routes
   - Restructure hooks and utilities

2. Create Essential Configuration Files

   ```typescript
   // config/site.ts
   export const siteConfig = {
     name: "Constructiv AI",
     description: "AI-powered construction management platform",
     url: process.env.NEXT_PUBLIC_APP_URL,
     ogImage: "https://constructiv.ai/og.jpg",
     links: {
       twitter: "https://twitter.com/constructivai",
       github: "https://github.com/constructivai"
     }
   }
      ```

3. Setup Type Definitions

   ```typescript
   // types/projects.ts
   export interface Project {
     id: string
     name: string
     description: string
     status: ProjectStatus
     progress: number
     startDate: Date
     endDate: Date
     budget: number
     team: TeamMember[]
     documents: Document[]
   }

   export enum ProjectStatus {
     PLANNING = 'planning',
     IN_PROGRESS = 'in_progress',
     ON_HOLD = 'on_hold',
     COMPLETED = 'completed'
   }
    ```

4. Create Essential Documentation

- API documentation
- Component documentation
- Development guides
- Contribution guidelines

## Database Integration with Prisma & Supabase

### Setup Steps

1. Initialize Prisma with Supabase

    ```bash
    # Install Prisma
    npm install prisma @prisma/client
    npm install supabase-prisma

    # Initialize Prisma
    npx prisma init
    ```

2. Configure Database URL in `.env`

    ```env
    DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
    ```

3. Basic Schema Structure

    ```prisma
    // lib/supabase/db/schema.prisma
    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    // Users and Authentication
    model User {
      id            String    @id @default(uuid())
      email         String    @unique
      name          String?
      role          UserRole  @default(USER)
      company       Company?  @relation(fields: [companyId], references: [id])
      companyId     String?
      projects      Project[]
      documents     Document[]
      createdAt     DateTime  @default(now())
      updatedAt     DateTime  @updatedAt

      @@map("users")
    }

    // Companies
    model Company {
      id          String    @id @default(uuid())
      name        String
      users       User[]
      projects    Project[]
      documents   Document[]
      createdAt   DateTime  @default(now())
      updatedAt   DateTime  @updatedAt

      @@map("companies")
    }

    // Projects
    model Project {
      id          String    @id @default(uuid())
      name        String
      description String?
      status      ProjectStatus @default(PLANNING)
      company     Company   @relation(fields: [companyId], references: [id])
      companyId   String
      users       User[]
      documents   Document[]
      createdAt   DateTime  @default(now())
      updatedAt   DateTime  @updatedAt

      @@map("projects")
    }

    // Documents
    model Document {
      id          String    @id @default(uuid())
      name        String
      type        DocumentType
      status      DocumentStatus @default(DRAFT)
      content     Json?
      storagePath String?
      project     Project   @relation(fields: [projectId], references: [id])
      projectId   String
      creator     User      @relation(fields: [creatorId], references: [id])
      creatorId   String
      company     Company   @relation(fields: [companyId], references: [id])
      companyId   String
      createdAt   DateTime  @default(now())
      updatedAt   DateTime  @updatedAt

      @@map("documents")
    }

    // Enums
    enum UserRole {
      ADMIN
      MANAGER
      USER
    }

    enum ProjectStatus {
      PLANNING
      IN_PROGRESS
      ON_HOLD
      COMPLETED
    }

    enum DocumentType {
      PROPOSAL
      CONTRACT
      ESTIMATE
      TIMELINE
      REPORT
    }

    enum DocumentStatus {
      DRAFT
      REVIEW
      APPROVED
      ARCHIVED
    }
    ```

4. Database Operations Location

    Database operations are organized by entity type:

    - users.ts: User-related database operations
    - projects.ts: Project-related operations  
    - documents.ts: Document operations
    - companies.ts: Company operations

    ```typescript
    // lib/supabase/db/operations/
    ├── users.ts      # User-related database operations
    ├── projects.ts   # Project-related operations
    ├── documents.ts  # Document operations
    └── companies.ts  # Company operations
    ```

### Best Practices

1. Schema Organization:
   - Keep related models together
   - Use meaningful names
   - Document relationships
   - Use appropriate field types

2. Migration Strategy:
   - Create migrations for schema changes
   - Test migrations on development first
   - Backup data before production migrations
   - Use seed data for testing

3. Security Considerations:
   - Use RLS policies
   - Implement proper access control
   - Validate input data
   - Handle sensitive data appropriately

4. Performance Optimization:
   - Index frequently queried fields
   - Use appropriate relation types
   - Implement connection pooling
   - Monitor query performance

## SECURITY CONSIDERATIONS

- Ensure proper file permissions
- Implement secure configuration handling
- Set up proper environment variable management
- Configure proper CORS settings

## SCALABILITY NOTES

- Directory structure supports microservices
- Allows for feature-based organization
- Supports multiple deployment environments
- Enables easy testing implementation

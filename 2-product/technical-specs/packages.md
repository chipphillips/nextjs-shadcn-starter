# Packages

Below is the definitive list of packages and dependencies for the Constructiv AI platform, aligned with our technical requirements and architectural decisions.

---

## 1. **Core Dependencies**

```bash
# Core Framework
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs
pnpm add @tanstack/react-query
pnpm add zustand
pnpm add @vercel/ai@4.0 openai
pnpm add react-hook-form @hookform/resolvers zod
pnpm add lucide-react
pnpm add @uploadthing/react uploadthing
pnpm add clsx tailwind-merge

# UI Components
pnpm add react-beautiful-dnd
pnpm add @fullcalendar/react @fullcalendar/core
pnpm add @roadmap-ui/gantt @roadmap-ui/kanban @roadmap-ui/list @roadmap-ui/calendar @roadmap-ui/table
pnpm add @prisma/client
pnpm add @vercel/analytics
pnpm add date-fns

# Development Dependencies
pnpm add -D @types/node @types/react @types/react-dom
pnpm add -D eslint eslint-config-next
pnpm add -D prettier prettier-plugin-tailwindcss
pnpm add -D @tailwindcss/forms @tailwindcss/typography
pnpm add -D prisma
```

## 2. **Core Framework & UI Components**

1. **Next.js 14 (App Router)**
   - Server Components and App Router architecture
   - Edge Runtime support for performance
   - API routes for backend functionality
   - Vercel Analytics integration

2. **React 18 + TypeScript**
   - Server Components
   - Streaming SSR
   - Strict TypeScript configuration

3. **UI Components & Styling**
   - Tailwind CSS with forms and typography plugins
   - shadcn/ui components for base UI elements:
     - Button, Input, Modal, Loading states
     - Form elements and validation
     - Navigation components
   - Roadmap UI components:
     - @roadmap-ui/gantt for project timelines
     - @roadmap-ui/kanban for task boards
     - @roadmap-ui/list for project/task lists
     - @roadmap-ui/calendar for scheduling
     - @roadmap-ui/table for data grids
   - lucide-react for icons
   - clsx + tailwind-merge for conditional styling

4. **Form Handling & Validation**
   - React Hook Form
   - Zod schema validation
   - @hookform/resolvers
   - Custom form layouts with shadcn/ui

## 3. **State Management & Data Fetching**

1. **Zustand**
   - Lightweight state management
   - Perfect for UI states and caching
   - TypeScript support
   - Optimistic updates handling

2. **TanStack Query**
   - Data fetching and caching
   - Server state management
   - Real-time updates support
   - Background data synchronization

## 4. **Backend & Infrastructure**

1. **Supabase Integration**
   - @supabase/supabase-js
   - @supabase/auth-helpers-nextjs
   - Magic Link authentication
   - PostgreSQL database
   - Storage buckets
   - Row Level Security (RLS)

2. **Prisma ORM**
   - @prisma/client for database operations
   - Schema management
   - Type-safe queries
   - Migration handling

3. **File Upload & Storage**
   - @uploadthing/react
   - uploadthing for large file handling
   - Integrated with Supabase Storage

## 5. **AI Integration**

1. **Vercel AI SDK 4.0**
   - @vercel/ai@4.0 for AI features
   - OpenAI integration
   - Streaming responses
   - Edge Runtime support
   - Function calling capabilities
   - Chat history management

2. **OpenAI**
   - GPT-4/3.5 for document generation
   - Whisper for voice processing (<10s response time)
   - Embeddings for search
   - Assistants API integration

## 6. **Document Processing**

1. **PDF Generation**
   - react-pdf for document generation
   - PDF processing and manipulation
   - Template system integration
   - Version control support

2. **Document Management**
   - Version control system
   - Storage organization
   - Access control integration
   - Full-text search capabilities

## 7. **Development & Quality Tools**

1. **Code Quality**
   - ESLint with Next.js config
   - Prettier with Tailwind plugin
   - TypeScript strict mode
   - Vercel Analytics for performance monitoring

2. **Development Tools**
   - @types/* packages for TypeScript
   - Development environment configurations
   - PowerShell scripts for automation
   - Prisma Studio for database management

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
DATABASE_URL=
```

## Installation

```powershell
# Initialize project
pnpm dlx shadcn-ui@latest init

# Install Roadmap UI components
pnpm dlx roadmap-ui add gantt
pnpm dlx roadmap-ui add kanban
pnpm dlx roadmap-ui add list
pnpm dlx roadmap-ui add calendar
pnpm dlx roadmap-ui add table

# Install all dependencies
pnpm install

# Setup development environment
Copy-Item .env.example .env.local

# Initialize Prisma
pnpm prisma generate
pnpm prisma db push

# Configure theme
Copy-Item styles/theme.config.ts.example styles/theme.config.ts
```

## Theme Configuration

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...},
        accent: {...}
      }
    }
  }
}
```

This package configuration provides a solid foundation for the Constructiv AI platform, enabling rapid development while maintaining scalability and performance. All packages are selected to work optimally in a Windows ARM64 environment with PowerShell Core 7+.

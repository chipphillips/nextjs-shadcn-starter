# **Constructiv AI – Detailed Development Plan**

Below is a **Detailed Development Plan** that maps each feature described in your Product Requirements Document (PRD) to distinct phases in a monorepo environment. It also describes how to manage feature branches in GitHub, merging each completed “epic” back into the main branch once stable. Finally, it clarifies why a monorepo structure is logical for your use case, given that you’re relying on AI assistants to handle much of the coding.

## Why a Feature-Based Approach

- **Clarity**: Each feature (e.g., Auth, Projects, Tasks, Documents, AI) lives in its own domain folder. This makes it easy to find all logic (hooks, components, API, etc.) for that feature.
- **Collaboration**: As you build out each epic in a separate branch (e.g., feature/authentication), you keep everything for that feature mostly in one place.
- **Maintainability**: If a feature grows large, you can keep it organized instead of scattering its logic across multiple folders.
- **Next.js Integration**: You still follow the App Router structure for your routing but move purely domain-logic or feature-specific hooks/services into a parallel features/ or components/features/ folder.

---

## 1. Overview

You have identified five major **epics** (feature sets) in your PRD:

1. **Epic 5: Authentication & User Management**  
2. **Epic 1: Project Management**  
3. **Epic 2: Task Management**  
4. **Epic 3: Document Management**  
5. **Epic 4: AI Assistant (Max)**  

> **Note**: The numbering of epics in the PRD (1–5) differs slightly, but it makes sense to start with **Authentication & User Management** because nearly every other feature depends on a secure auth layer. After that, you can implement the core project management, task management, document management, and ultimately the AI assistant.

## 2. Monorepo Structure and Logic

A **monorepo** keeps **all** of your application code (frontend, backend, shared libraries, database schema, etc.) in a single repository, but separated into logical packages or directories. This is usually the preferred approach for:

1. **Shared Code**: You can share TypeScript models or utility functions between the frontend and backend seamlessly.  
2. **Consistency**: One place to manage dependencies and scripts (e.g., running `pnpm install` or `pnpm dev`).  
3. **Simplicity**: Especially important if you’re a solo developer or small team relying on AI assistants—less overhead with managing multiple repos.

When you create **feature branches** (e.g., `feature/auth`, `feature/project-management`, etc.) in a monorepo, each branch only changes the relevant sections of the codebase. Once stable, you merge it back into the **`main`** (or **`develop`**) branch. This approach works well with your plan to add each epic in phases, because:

- You can keep each epic self-contained but still see how it interacts with the rest of the code in the same repo.  
- You (or your AI assistants) can spin up the entire application easily for testing or integration checks.  

### Recommended Repository Layout

A typical Next.js + Supabase monorepo might look like:

```file structure
constructiv-ai/
│
├── app/                                # Next.js routes (App Router)
│   ├── (auth)                          # Authentication routes (epic 5)
│   │   ├── layout.tsx                  # Possibly a layout for auth pages
│   │   ├── login/
│   │   │   └── page.tsx                # Login page
│   │   └── register/
│   │       └── page.tsx                # Register page
│   ├── (dashboard)                     # Main "dashboard" segment
│   │   ├── layout.tsx                  # Dashboard layout
│   │   ├── page.tsx                    # Dashboard home
│   │   ├── projects/                   # Project routes (epic 1)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                # Projects list
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Single project
│   │   ├── tasks/                      # Task routes (epic 2)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                # Tasks list
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Single task
│   │   ├── documents/                  # Document routes (epic 3)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                # Documents list
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Single document
│   │   ├── ai/                         # AI Assistant routes (epic 4) if needed
│   │   │   └── page.tsx                # e.g., Chat UI
│   │   └── ...other segments...
│   ├── api/                            # API routes (server-side)
│   │   ├── core/                       # Reusable server helpers
│   │   └── v1/                         # Versioned endpoints (REST or route handlers)
│   └── ...other top-level routes...
│
├── features/                           # Domain/feature-specific logic
│   ├── auth/                           # Epics in separate folders
│   │   ├── hooks/                      # e.g., useAuth()
│   │   ├── services/                   # e.g., token management
│   │   └── components/                 # e.g., AuthForm.tsx
│   ├── projects/
│   │   ├── hooks/                      # e.g., useProjects()
│   │   ├── services/                   # e.g., project CRUD
│   │   ├── components/                 # e.g., ProjectCard.tsx
│   │   └── types/                      # e.g., Project types
│   ├── tasks/
│   ├── documents/
│   ├── ai-assistant/
│   └── ...
│
├── components/                         # Shared or “global” UI components
│   ├── ui/                             # shadcn/ui wrappers, design system
│   ├── forms/                          # Reusable form primitives
│   ├── layouts/                        # Shared layout components
│   └── ...
│
├── lib/                                # Non-React utilities, configs, constants
│   ├── config/                         # e.g., app config
│   ├── constants/                      # constant values
│   ├── providers/                      # global contexts
│   ├── utils/                          # pure utility functions
│   └── ...
│
├── prisma/
│   ├── schema.prisma                   # Prisma schema for DB
│   └── migrations/                     # Migration scripts
│
├── public/
│   ├── fonts/                          # Optimized font files
│   └── locales/                        # i18n files
│
├── styles/                             # Global styling (e.g., tailwind.css)
├── types/                              # Global TypeScript types
└── .env.local                          # Env variables (ignored by Git)

```

(You can adapt this layout to your preference, but the key is having a central place for shared code and a single Next.js app that references those shared libs.)

### Highlights of This Structure

- **app/** – Strictly for your Next.js routes (pages, layouts, server actions).
- **features/** – Where each epic’s domain logic (hooks, specialized services, domain-specific React components) resides. This keeps your “backend integration” or “core logic” close to each domain but separate from the direct route definitions.
- **components/** – For truly reusable or global UI components, like design system elements, forms, or layout wrappers.
- **lib/** – Generic, framework-agnostic code (constants, config, utility functions, etc.).
- **prisma/** – Database schema and migration scripts.
- **public/** – Static assets.
- **styles/** – Global styles (Tailwind config or SCSS).
- **types/** – Possibly domain-level shared types. (Alternatively, keep domain types near each feature in features/feature name /types if you prefer.)

---

## 3. Phased Development Plan

Below is how you can tackle each epic *in phases*. The order below starts with **Authentication** because it’s foundational to controlling access in every other feature.

### **Phase 1: Authentication & User Management (Epic 5)**

1. **Create a branch**: `feature/authentication`.  
2. **Scope**:  
   - Supabase Auth with Magic Link or other passwordless method.  
   - Set up user roles (e.g., `admin`, `manager`, `member`).  
   - Database tables for `users`, `roles`, `permissions`.  
   - Basic UI for login, logout, and user profile management.  
   - RLS (Row-Level Security) policies to secure data at the database level.  

3. **Key Deliverables**:  
   - You can log in via email link.  
   - A new user is created in Supabase if not already existing.  
   - Basic user profile page.  
   - Access to future features is restricted based on roles.  

4. **Merge**: Once the authentication workflow is stable, open a Pull Request (PR) from `feature/authentication` into `main`. Resolve any conflicts, ensure tests pass, then merge.

---

### **Phase 2: Project Management (Epic 1)**

1. **Create a branch**: `feature/project-management`.  
2. **Scope** (per PRD):
   - Database tables/models for `projects`, `milestones`, `team members`.  
   - CRUD operations for creating, listing, updating, deleting projects.  
   - Basic milestones and statuses (e.g., `Not Started`, `In Progress`, `Completed`).  
   - UI screens: Project list, project detail, milestone management.  
   - Role-based checks: Only authenticated users (from Phase 1) can manage projects.  

3. **Dependencies**:  
   - Must integrate with **Authentication**. Ensure that only certain roles (e.g., `admin`, `manager`) can create projects.  

4. **Merge**: PR from `feature/project-management` → `main`.  

---

### **Phase 3: Task Management (Epic 2)**

1. **Create a branch**: `feature/task-management`.  
2. **Scope**:
   - Database tables/models for `tasks`, `subtasks`, `process templates`.  
   - Tasks belong to a project, can be assigned to a user.  
   - Basic Kanban board or list view for tasks.  
   - Optionally add **process templates** for recurring sets of tasks.  
   - Must reference user roles and limit modifications to authorized users.  

3. **Dependencies**:  
   - **Authentication & User Management** for assigned tasks.  
   - **Project Management** so tasks reference a `projectId`.  

4. **Merge**: PR from `feature/task-management` → `main`.

---

### **Phase 4: Document Management (Epic 3)**

1. **Create a branch**: `feature/document-management`.  
2. **Scope**:
   - Database models for `documents` and `versions`.  
   - Supabase Storage configuration for file uploads.  
   - CRUD for uploading documents, retrieving them, versions, simple search.  
   - Basic integration with tasks/projects for referencing documents.  
   - Permission checks for who can upload/view certain docs.  

3. **Dependencies**:  
   - Must rely on the **Auth** epic for secure file access.  
   - Project references from the **Project Management** epic.  

4. **Merge**: PR from `feature/document-management` → `main`.

---

### **Phase 5: AI Assistant (Max) (Epic 4)**

1. **Create a branch**: `feature/ai-assistant`.  
2. **Scope**:
   - Integration with OpenAI GPT-4 / Whisper.  
   - Chat or voice interface with streaming responses.  
   - Automated daily report generation (text or PDF) referencing documents or tasks.  
   - Possibly add real-time voice transcription.  
   - Optional advanced features: context awareness (embedding-based search, etc.).  

3. **Dependencies**:  
   - For *voice-based tasks* or *document generation*, rely on previous epics.  
   - Access control via **Auth**.  
   - Project and task references.  
   - Optional synergy with **Document Management** if the AI is generating documents.  

4. **Merge**: PR from `feature/ai-assistant` → `main`.

---

## 4. Git Workflow Recommendations

### 4.1 Branching Model

1. **`main`** (or **`master`**): Always stable. Production-ready code.  
2. **`develop`** (optional): An integration branch if you want to keep `main` strictly for releases.  
3. **Feature Branches**: Each epic or feature is developed on its own branch, e.g. `feature/task-management`.  

### 4.2 Pull Request Strategy

- **Create PRs Early**: Even if the feature is incomplete, you (and your AI assistants) can see if it conflicts with other changes.  
- **Frequent Commits**: Commit as you go to keep track of your progress.  
- **Code Reviews**: You might rely on automated linters/tests or ask ChatGPT for a “code review” style check.  
- **Squash & Merge**: Consider squashing commits to keep the main branch commit history clean.

### 4.3 Merging & Rebasing

- If an epic takes a while, you can periodically rebase your feature branch on top of `main` to keep it updated with any bug fixes or improvements.  

### 4.4 Post-Merge Steps

- **Tag** or **Release**: Once an epic merges, tag a version (e.g., `v0.1` for Project Management).  
- **Documentation**: Update your main README or wiki to reflect new functionality.  
- **Cleanup**: Remove the feature branch after merging (unless you anticipate hotfixes or immediate improvements).

---

## 5. Additional Tips & Considerations

### 5.1 Order of Implementation

- **Must-Have**: Authentication (Epic 5) is truly fundamental. Without it, you can’t properly secure any feature.  
- **Next**: Project Management (Epic 1) sets the baseline for your domain data.  
- **Then**: Task Management (Epic 2) extends project functionality.  
- **After**: Document Management (Epic 3) to unify file storage.  
- **Finally**: AI Assistant (Epic 4) leverages all prior data—ideal to do last because it references tasks, documents, and user roles.

### 5.2 Dependencies & Testing

- Each epic depends on user roles from the Auth epic, so **test** them thoroughly.  
- Use **integration tests** across epics (e.g., verifying tasks are only visible to assigned users).

### 5.3 Handling Migrations in a Monorepo

- Keep your **Prisma** migrations or Supabase migrations inside `packages/prisma/` (or wherever your DB code resides).  
- Each feature branch can add or modify the schema.  
- After merging, run `pnpm db:migrate` (or your chosen command) in the main branch to ensure your database is up to date.

### 5.4 AI Assistant & Observability

- Because the AI assistant can be complex, add **telemetry** or logging to see how well it transcribes voice commands, how often it fails, etc.  
- This can help you iteratively refine prompts or error handling.

---

## 6. Conclusion

### Monorepo Benefits

- Logical approach for novice developers working with AI code assistants
- Simplifies environment setup and data model references
- Keeps everything organized in one repository
- Feature branches allow independent development of each epic

### Development Strategy

- Phase-by-phase development builds stable foundations
- Authentication first as core foundation
- Merge stable epics back to main branch
- Maintains "release-ready" state
- Aligns with agile/iterative methodology
- Leverages GitHub PR workflows effectively

### Development Plan Alignment

#### Feature Branch Organization

- Feature branches map to specific code areas:
  - `feature/authentication` → `app/(auth)`, `features/auth/`, `prisma/schema.prisma`
  - `feature/project-management` → `app/(dashboard)/projects`, `features/projects/`

#### Phased Structure

- Each epic has:
  - Primary route folder in `app/`
  - Domain folder in `features/`
- Clean separation between:
  - Route code (Next.js specific)
  - Domain logic (in features/)

#### Extensibility

- New features (e.g. scheduling) can add:
  - New folder in `features/`
  - Routes in `app/(dashboard)/`

### Conventions

#### Naming & Organization

- Feature folders use lowercase: `auth`, `projects`, `tasks`, `documents`, `ai-assistant`
- Standard patterns:
  - Hooks: `features/<feature>/hooks/useX.ts`
  - Services: For DB/API queries
  - Components: Shared within feature
  - Testing: `__tests__` or `tests/` per feature

#### Example: Adding Milestones Feature

1. Route: `app/(dashboard)/projects/[id]/milestones/page.tsx`
2. Logic:
   - `features/projects/hooks/useMilestones.ts`
   - `features/projects/services/milestoneService.ts`
3. UI: `features/projects/components/MilestoneList.tsx`

### Best Practices Benefits

#### Architecture Benefits

- Lean route files (app/ directory)
- Domain-driven organization
- Reusable UI components
- Scalable structure
- Simplified testing

#### Final Considerations

- Break down large feature folders as needed
- Flexible route naming/structure
- AI-friendly organization for code assistance

---

> **Next Steps**  
>
> - Initialize your monorepo with PNPM (or your package manager of choice).  
> - Create the first branch, `feature/authentication`, and implement Epic 5.  
> - Merge back into `main` when stable, and proceed to the next epic.  

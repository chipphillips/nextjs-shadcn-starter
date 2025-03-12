# Epic 5: Authentication & User Management

1. **Feature Name**
   - **Authentication & User Management**

2. **Purpose & Value**
   - Ensures secure access to the platform with role-based permissions, protecting sensitive project data.
   - Solves the issue of unauthorized access and allows builders to control who can view or edit specific information.

3. **User Story**
   > As an administrator, I want to securely log in and control user permissions, so that I can ensure the safety of my data and team coordination.

4. **Key Actions & User Flow**
   1. **Log in** using secure authentication methods (e.g., magic links, MFA).
   2. **Set role-based permissions** for users (Admin, Manager, Team Member).
   3. **Manage user profiles** and project-level access controls.
   4. **Track login and activity history** for audit purposes.

5. **Acceptance Criteria**
   - **Sub-feature 5.1: User Authentication**
     - Users can log in using a secure email link or multi-factor authentication.
     - Session timeouts occur after a configurable period of inactivity.
     - Password-less authentication options are available and functional.
     - Failed login attempts trigger security measures (e.g., CAPTCHA, account lockout).
     - Login and session history are recorded for auditing purposes.

   - **Sub-feature 5.3: Access Control**
     - Users with admin roles can set role-based permissions for documents and tasks.
     - Team members can only access projects and documents they are assigned to.
     - The system enforces access control on shared documents (e.g., view-only vs. editable).
     - Permissions can be updated at the project or task level.
     - Activity logs track permission changes and access history.

6. **Technical Notes / Implementation Details**
   - **Frontend Stack**:
     - Next.js 14 with App Router for routing and server components
     - React 18 for UI components
     - TypeScript for type safety
     - Tailwind CSS & shadcn/ui for UI components and styling
     - Zustand for auth state management
     - React Query for server state and caching
     - React Hook Form + Zod for form validation

   - **Backend & Data Layer**:
     - Next.js API routes for backend endpoints
     - Prisma ORM for database operations
     - Supabase for:
       - Authentication (magic link, email)
       - PostgreSQL database (users, roles, permissions)
       - Row Level Security (RLS) for data access control

   - **Data Models**:

     ```typescript
     // User model
     model User {
       id            String      @id @default(cuid())
       email         String      @unique
       name          String?
       role          String      // admin, manager, member
       projects      Project[]
       teams         TeamMember[]
       preferences   Json?
       lastLoginAt   DateTime?
       createdAt     DateTime    @default(now())
       updatedAt     DateTime    @updatedAt
     }

     // Role model
     model Role {
       id          String    @id @default(cuid())
       name        String    @unique
       permissions String[]  // Array of permission codes
       createdAt   DateTime  @default(now())
       updatedAt   DateTime  @updatedAt
     }

     // UserRole model (for project-specific roles)
     model UserRole {
       id          String    @id @default(cuid())
       userId      String
       user        User      @relation(fields: [userId], references: [id])
       projectId   String
       project     Project   @relation(fields: [projectId], references: [id])
       roleId      String
       role        Role      @relation(fields: [roleId], references: [id])
       createdAt   DateTime  @default(now())
     }

     // Session model (if needed beyond Supabase)
     model Session {
       id          String    @id @default(cuid())
       userId      String
       user        User      @relation(fields: [userId], references: [id])
       token       String    @unique
       expiresAt   DateTime
       createdAt   DateTime  @default(now())
     }
     ```

   - **API Routes**:

     ```typescript
     // Auth endpoints
     POST /api/auth/login              // Initiate magic link login
     POST /api/auth/verify             // Verify magic link
     POST /api/auth/logout             // End session
     GET /api/auth/session             // Get current session

     // User management endpoints
     GET /api/users                    // List users
     GET /api/users/{id}              // Get user details
     PUT /api/users/{id}              // Update user
     DELETE /api/users/{id}           // Delete user

     // Role management endpoints
     POST /api/roles                   // Create role
     GET /api/roles                    // List roles
     PUT /api/roles/{id}              // Update role
     DELETE /api/roles/{id}           // Delete role

     // Permission endpoints
     POST /api/users/{id}/permissions  // Assign permissions
     GET /api/users/{id}/permissions   // Get user permissions
     ```

   - **State Management**:
     - Zustand store for auth state
     - React Query for user data caching
     - Persistent session storage

   - **UI Components**:
     - Login form with magic link flow
     - User profile management
     - Role assignment interface
     - Permission management dashboard
     - Session timeout notifications

   - **Security Features**:
     - Magic link authentication
     - Session management
     - Role-based access control (RBAC)
     - Row Level Security (RLS) policies
     - API route protection

   - **Access Control Implementation**:
     - Supabase RLS policies for database access
     - Role-based middleware for API routes
     - Frontend route protection
     - Permission checking utilities

   - **Session Management**:
     - Automatic session refresh
     - Secure session storage
     - Timeout handling
     - Multiple device support

7. **Dependencies & Constraints**
   - All other epics (Projects, Tasks, Documents, AI) rely on a functioning authentication system for gating features.
   - Must comply with relevant **data protection and privacy regulations**.
   - Requires reliable **email or SMS** service for two-factor or magic link authentication.

8. **Priority & Effort**
   - **Priority**: P1 – Must Have (Core security infrastructure).
   - **Effort**: Medium
     - ~1–2 weeks for basic authentication and role-based permissions.

9. **Open Questions**
   - Which **MFA** methods are mandatory (SMS, authenticator apps, email-based codes)?
     - We will only support email-based codes for MVP.
   - Do we need to support **organization-level** accounts where multiple users belong to a single customer org?
     - Yes, we will need to support organization-level accounts.
   - Will there be **different roles** per project, or are roles global across the entire platform?
     - Yes, we will need to support different roles per project.

# Epic 1: Project Management

1. **Feature Name**
   - **Project Management**

2. **Purpose & Value**
   - Provides builders with a centralized way to organize and monitor projects, ensuring efficiency and reducing confusion across milestones, resources, and timelines.
   - Solves the problem of fragmented project details and helps users track progress effectively, enhancing overall project visibility.

3. **User Story**
   > As a builder, I want to create, set up, and monitor my projects, so that I can ensure they progress on schedule with clear milestones and resource allocation.

4. **Key Actions & User Flow**
   1. **Create a new project** with essential details (name, address, start/end dates).
   2. **Set project milestones** and assign due dates.
   3. **Add team members** and define roles.
   4. **View project progress** through visual indicators and timelines.
   5. **Update milestone statuses** as tasks are completed.
   6. **Filter and group projects** by neighborhood or house plan name.

5. **Acceptance Criteria**
   - **Sub-feature 1.1: Project Creation and Setup**
     - Users can create a project with a minimum of a name, address, start date, and end date.
     - Users can select from previously used neighborhoods in a dropdown or add a new one.
     - Users can input lot numbers and select from previously used house plan names in a dropdown or add new ones.
     - Users can define project milestones and assign them due dates.
     - Users can assign team members and roles during project setup.
     - The system validates required fields before allowing project creation.
     - Users can upload and attach at least one project-related document.

   - **Sub-feature 1.2: Project Tracking**
     - Users can view visual progress indicators for each milestone.
     - Users can update milestone statuses (e.g., “Not Started,” “In Progress,” “Completed”).
     - Changes to milestones update the project progress percentage automatically.
     - Users can view a project timeline visualization with start and end dates.
     - Milestones display alerts for overdue tasks.

   - **Sub-feature 1.3: Resource Management**
     - Users can assign team members to specific projects or tasks.
     - Users can view a list of assigned team members, including their roles and availability.
     - Notifications are sent to team members when they are assigned to a project or task.
     - The system highlights resource conflicts, such as overlapping assignments for team members.

   - **Sub-feature 1.4: Project Filtering and Organization**
     - Users can filter projects by milestone status (Not Started, In Progress, Completed)
     - Users can filter projects by neighborhood from a dropdown of existing neighborhoods
     - Users can filter projects by house plan name from a dropdown of existing plans
     - Users can combine filters in any combination:
       - Milestone status + Neighborhood
       - Milestone status + House Plan
       - All three filters together
     - Filter selections persist across sessions
     - Users can see the count of projects for each filter combination
     - Users can clear individual or all filters with a single action
     - Filtered views maintain all other project list functionality

6. **Technical Notes / Implementation Details**
   - **Frontend Stack**:
     - Next.js 14 with App Router for routing and server components
     - React 18 for UI components
     - TypeScript for type safety
     - Tailwind CSS & shadcn/ui for UI components and styling
     - Zustand for project state management
     - React Query for server state and caching
     - React Hook Form + Zod for form validation

   - **Backend & Data Layer**:
     - Next.js API routes for backend endpoints
     - Prisma ORM for database operations
     - Supabase for:
       - PostgreSQL database (projects, milestones, resources)
       - Authentication
       - File storage for project documents

   - **Data Models**:

     ```typescript
     // Project model
     model Project {
       id          String      @id @default(cuid())
       name        String
       address     String
       startDate   DateTime
       endDate     DateTime
       status      String
       neighborhood String?    // Optional neighborhood name
       lotNumber   String?    // Optional lot number
       housePlanName String?  // Optional house plan name
       milestones  Milestone[]
       team        TeamMember[]
       createdAt   DateTime    @default(now())
       updatedAt   DateTime    @updatedAt
     }

     // Milestone model
     model Milestone {
       id          String    @id @default(cuid())
       name        String
       dueDate     DateTime
       status      String
       projectId   String
       project     Project   @relation(fields: [projectId], references: [id])
     }

     // TeamMember model
     model TeamMember {
       id          String    @id @default(cuid())
       userId      String
       projectId   String
       role        String
       project     Project   @relation(fields: [projectId], references: [id])
     }
     ```

   - **API Routes**:

     ```typescript
     // Project endpoints
     POST /api/projects           // Create project
     GET /api/projects           // List projects
     GET /api/projects/{id}      // Get project details
     PUT /api/projects/{id}      // Update project
     DELETE /api/projects/{id}   // Delete project

     // Milestone endpoints
     POST /api/projects/{id}/milestones
     PUT /api/projects/{id}/milestones/{milestoneId}
     DELETE /api/projects/{id}/milestones/{milestoneId}

     // Team management endpoints
     POST /api/projects/{id}/team
     DELETE /api/projects/{id}/team/{memberId}

     // Add new filter endpoints
     GET /api/projects/filters          // Get available filter options
     GET /api/projects/filtered         // Get filtered project list
     ```

   - **State Management**:
     - Zustand store for local project state
     - React Query for server state management and caching
     - Optimistic updates for better UX

   - **UI Components**:
     - shadcn/ui components for forms and basic UI
     - Custom timeline/Gantt visualization
     - Responsive grid layouts with Tailwind CSS
     - Form validation using React Hook Form + Zod
     - Neighborhood and House Plan Selection:
       - Combobox components with search functionality
       - Auto-complete from existing values
       - "Add New" option at bottom of dropdown
       - Recently used items appear at top
       - Clear button to reset selection
     - Lot Number Input:
       - Formatted input with pattern validation
       - Auto-formats to "Lot XXX" format
       - Visual feedback for valid/invalid formats
       - Helper text showing accepted formats
     - Project List Filtering:
       - Filter bar with milestone status, neighborhood, and house plan dropdowns
       - Quick stats showing project counts for each filter combination
       - Visual chips for active filters with individual clear buttons
       - Filter hierarchy: Milestone Status → Neighborhood/House Plan
       - Responsive layout that stacks filters on mobile
       - Save filter preferences in local storage
       - Skeleton loading state during filter changes
       - Dynamic updating of available filter options based on selection
         (e.g., showing only neighborhoods with projects in selected milestone status)

   - **Form Validation Rules**:
     - Neighborhood: Max 100 characters
     - Lot Number: Must match pattern "Lot XXX" or "LXXX"
     - House Plan Name: Max 100 characters
     - All optional but interconnected:
       - If lot number is provided, neighborhood becomes required
       - If house plan is selected, lot number becomes required

   - **UX Enhancements**:
     - Typeahead search for neighborhood and house plan fields
     - Persist recent selections in local storage for faster access
     - Batch loading of suggestions to prevent UI lag
     - Error states with helpful validation messages
     - Loading states during suggestion fetching

   - **File Storage**:
     - Supabase Storage for project documents
     - Organized bucket structure by project ID
     - Secure access control through Supabase RLS

   - **Real-time Updates**:
     - Initial implementation using polling
     - Future enhancement with Supabase real-time subscriptions

7. **Dependencies & Constraints**
   - Depends on **User Authentication (Epic 5)** to ensure only authorized users can create or modify projects.
   - Requires a stable data layer to store project and milestone information.
   - Internet connectivity required for real-time updates, especially for distributed teams.

8. **Priority & Effort**
   - **Priority**: P1 – Must Have (Essential foundation for all other features).
   - **Effort**: Medium-High
     - ~2–3 weeks for initial development (including milestone tracking and resource assignment).

9. **Open Questions**
   - Do we need to support **multiple currencies** or cost-tracking at this stage, or will that wait for a future phase?
     - We will only need to support USD for now.
   - Should project milestones support **custom statuses** beyond “Not Started,” “In Progress,” and “Completed”?
     - Yes, we will need to support custom statuses for milestones.
   - How granular does **resource availability** tracking need to be (hourly, daily, weekly)?
     - We will need to track resource availability at the daily level. Morning, Afternoon, Evening, etc.

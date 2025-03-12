# Epic 2: Task Management

1. **Feature Name**
   - **Task Management**

2. **Purpose & Value**
   - Allows users to organize construction activities effectively by breaking them down into manageable tasks.
   - Solves the challenge of keeping teams aligned and on track, improving accountability and overall productivity.

3. **User Story**
   > As a site supervisor, I want to create and assign tasks to my team, so that everyone knows their responsibilities and deadlines.
   > As a project manager, I want to create reusable process templates from groups of tasks, so I can standardize and streamline common construction workflows.

4. **Key Actions & User Flow**
   1. **Create a task** with a title, description, and category (e.g., pre-construction, administrative).
   2. **Assign tasks** to team members and set due dates and priorities.
   3. **View tasks** in different formats (Kanban, calendar, list).
   4. **Update task statuses** (e.g., Not Started, In Progress, Completed).
   5. **Receive notifications** on task updates or upcoming deadlines.
   6. **Create and manage processes** by grouping related tasks together
   7. **Save processes as templates** for reuse across projects
   8. **Apply process templates** when starting new projects

5. **Acceptance Criteria**
   - **Sub-feature 2.1: Task Creation and Organization**
     - Users can create tasks with a minimum of a title and description.
     - Tasks can be categorized (e.g., pre-construction, construction, administrative).
     - Users can attach at least one document or reference to a task.
     - Subtasks and checklists can be created and linked to parent tasks.
     - Tasks must validate and save only if required fields (title, due date) are complete.

   - **Sub-feature 2.2: Task Assignment and Tracking**
     - Tasks can be assigned to team members with a specified due date.
     - Users can set priority levels (Low, Medium, High, Urgent) for each task.
     - Users can track task completion percentages in real-time.
     - Dependencies between tasks are visible, and warnings appear for incomplete prerequisites.
     - Team members receive notifications when a task is assigned to them.

   - **Sub-feature 2.3: Task Views (Kanban, Calendar, List)**
     - Users can toggle between Kanban, list, and calendar views.
     - Tasks in Kanban view are draggable between statuses.
     - Calendar view displays tasks with due dates on the corresponding day.
     - Users can filter tasks by priority, status, or category.
     - Updates in one view reflect across all views.

   - **Sub-feature 2.4: Process Management**
     - Users can create a process by selecting and grouping multiple tasks
     - Users can name and describe processes for future reference
     - Users can specify process metadata:
       - Phase (e.g., Foundation, Framing)
       - Estimated duration in days
       - Category alignment with tasks
     - Users can save processes as templates for reuse
     - Users can view all saved processes in a dedicated process library
     - Users can apply existing process templates to new projects:
       - Due dates automatically calculated based on process duration
       - Tasks distributed evenly across the timeline
       - Original task relationships maintained
     - Process templates track usage statistics:
       - Number of times used
       - Projects using the template
       - Last usage date
     - Basic version control for templates
     - Users can filter processes by:
       - Category
       - Phase
       - Usage frequency
       - Recent activity

6. **Technical Notes / Implementation Details**
   - **Frontend Stack**:
     - Next.js 14 with App Router for routing and server components
     - React 18 for UI components and drag-and-drop functionality
     - TypeScript for type safety
     - Tailwind CSS & shadcn/ui for UI components and styling
     - Zustand for task state management
     - React Query for server state and caching
     - React Hook Form + Zod for form validation

   - **Backend & Data Layer**:
     - Next.js API routes for backend endpoints
     - Prisma ORM for database operations
     - Supabase for:
       - PostgreSQL database (tasks, subtasks, categories)
       - Real-time updates for task status changes
       - Authentication for task access control

   - **Data Models**:

     ```typescript
     // Task model
     model Task {
       id          String      @id @default(cuid())
       title       String
       description String?
       status      String      // Not Started, In Progress, Under Review, Completed
       priority    String      // Low, Medium, High, Urgent
       dueDate     DateTime?
       category    String      // pre-construction, construction, administrative
       projectId   String
       project     Project     @relation(fields: [projectId], references: [id])
       assignedTo  String?     // userId
       subtasks    Subtask[]
       attachments Attachment[]
       createdAt   DateTime    @default(now())
       updatedAt   DateTime    @updatedAt
       processId    String?    // Optional process group ID
       processOrder Int?       // Order within process
       process     Process?    @relation(fields: [processId], references: [id])
     }

     // Subtask model
     model Subtask {
       id          String    @id @default(cuid())
       title       String
       completed   Boolean   @default(false)
       taskId      String
       task        Task      @relation(fields: [taskId], references: [id])
     }

     // Attachment model
     model Attachment {
       id          String    @id @default(cuid())
       filename    String
       url         String
       taskId      String
       task        Task      @relation(fields: [taskId], references: [id])
       createdAt   DateTime  @default(now())
     }

     // Add Process model
     model Process {
       id          String      @id @default(cuid())
       name        String
       description String?
       isTemplate  Boolean     @default(false)
       category    String      // pre-construction, construction, administrative
       phase       String?     // Optional phase identifier
       estimatedDuration Int?  // Estimated days to complete
       version     Int         @default(1)
       tasks       Task[]
       createdAt   DateTime    @default(now())
       updatedAt   DateTime    @updatedAt
     }
     ```

   - **API Routes**:

     ```typescript
     // Task endpoints
     POST /api/tasks              // Create task
     GET /api/tasks              // List tasks
     GET /api/tasks/{id}         // Get task details
     PUT /api/tasks/{id}         // Update task
     DELETE /api/tasks/{id}      // Delete task

     // Subtask endpoints
     POST /api/tasks/{id}/subtasks
     PUT /api/tasks/{id}/subtasks/{subtaskId}
     DELETE /api/tasks/{id}/subtasks/{subtaskId}

     // Task view endpoints
     GET /api/tasks/view/kanban   // Get tasks in Kanban format
     GET /api/tasks/view/calendar // Get tasks in calendar format
     GET /api/tasks/view/list     // Get tasks in list format

     // Add process endpoints
     POST /api/processes                    // Create process
     GET /api/processes                     // List processes
     GET /api/processes/{id}               // Get process details
     PUT /api/processes/{id}               // Update process
     DELETE /api/processes/{id}            // Delete process
     POST /api/processes/{id}/apply/{projectId} // Apply process to project
     
     // Process template endpoints
     POST /api/processes/templates          // Save as template
     GET /api/processes/templates          // List templates
     POST /api/processes/templates/{id}/apply // Apply template
     ```

   - **State Management**:
     - Zustand store for local task state and view preferences
     - React Query for server state management and caching
     - Optimistic updates for drag-and-drop operations
     - Process state management:
       - Template creation and modification
       - Process instance tracking
       - Application status monitoring
       - Usage statistics collection
       - Version tracking

   - **UI Components**:
     - shadcn/ui components for forms and basic UI
     - Custom Kanban board implementation
     - Calendar integration (e.g., @fullcalendar/react)
     - Drag-and-drop using react-beautiful-dnd
     - Form validation using React Hook Form + Zod
     - Process Management UI:
       - Process creation wizard for grouping tasks
       - Process library view with filtering and search
       - Process template application dialog
       - Visual process builder with drag-and-drop
       - Process preview showing task hierarchy
       - Statistics showing process usage across projects
       - Timeline visualization for task distribution
       - Version history display

   - **Real-time Updates**:
     - Initial implementation using polling
     - Future enhancement with Supabase real-time subscriptions
     - Optimistic UI updates for drag-and-drop operations

   - **Mobile Considerations**:
     - Responsive design for all views
     - Touch-friendly drag-and-drop
     - Simplified views for smaller screens

7. **Dependencies & Constraints**
   - Requires **Project Management (Epic 1)** to associate tasks with specific projects.
   - Depends on **User Management (Epic 5)** for assigning tasks and sending notifications.

8. **Priority & Effort**
   - **Priority**: P1 – Must Have (Core functionality for any construction project management).
   - **Effort**: Medium
     - ~2 weeks to implement core creation, assignment, and basic Kanban/calendar views.

9. **Open Questions**
   - Should tasks support **multiple assignees** or only a single owner?
     - Task can have multiple assignees.
   - Is **time tracking** (e.g., hours spent) required at this stage, or in a later phase?
     - Yes, we will need to track time spent on tasks. But it should be made available to the user as a report.
   - Will tasks be **exportable** or sharable outside the platform (e.g., CSV, PDF)?
     - Yes, we will need to export tasks to CSV and PDF and components can be shared as a link.
   - Should processes support **conditional tasks** that depend on project attributes?
     - Yes, we will need to support conditional tasks that depend on project attributes.
   - How should we handle **process template updates** for projects already using an older version?
     - We should allow for partial application of process templates.
   - Should we allow **partial application** of process templates?
     - Yes, we should allow for partial application of process templates.

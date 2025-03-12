# Web Application Development Plan

## Project Goal and Features

### Goal/Intended Outcome

The primary goal of the ConstructivAI project is to reduce administrative overhead by 50% through AI-powered automation and seamless integrations in construction management. This is achieved by building an intuitive AI Assistant-driven construction management platform that eliminates administrative burdens by providing a voice-driven, AI-powered solution that integrates seamlessly into existing workflows.

### Features, Functionality, or User Experience

- **Voice-driven AI Assistant (Max):** Facilitates hands-free management of tasks, document generation, and project updates via voice commands, increasing efficiency for users in the field.
- **Project Management:** Centralized organization and monitoring of projects, ensuring efficiency and reducing confusion across milestones, resources, and timelines.
- **Task Management:** Organizes construction activities effectively by breaking them down into manageable tasks, improving accountability and productivity.
- **Document Management:** Centralized repository for construction documents, reports, and notes, ensuring quick access and streamlined communication.

### Product Name or Category

ConstructivAI is an AI-powered construction management platform, categorized as a SaaS 2.0 (Service as a Software) platform for construction management.

## 1. Planning Phase

### 1.1 Define App Functionality

#### User Functions (CRUD Operations)

1. **Project Management**
   - Create new construction projects
   - View project details and progress
   - Update project information and status
   - Delete projects (with proper authorization)
   - Manage project milestones
   - Track project resources

2. **Task Management**
   - Create tasks and subtasks
   - View tasks in multiple formats (Kanban, list, calendar)
   - Update task status and details
   - Delete tasks
   - Manage task dependencies
   - Track task completion

3. **Document Management**
   - Upload and organize documents
   - Generate AI-assisted documents
   - View and search documents
   - Update document content and metadata
   - Delete documents
   - Version control for documents

4. **Voice Commands (Max AI Assistant)**
   - Record voice commands
   - View command history
   - Update/edit generated content
   - Delete voice recordings
   - Manage AI-generated content

#### App Functions

1. **User Account Management**
   - User registration and profile creation
   - Role assignment and management
   - Team management
   - Permission controls
   - Account settings management

2. **Authentication Processes**
   - Magic link authentication
   - Session management
   - Role-based access control
   - Multi-device support
   - Security monitoring

3. **System Operations**
   - AI processing pipeline
   - Document generation system
   - Voice processing system
   - Real-time updates
   - Data synchronization

4. **Background Tasks**
   - Voice transcription processing
   - Document indexing
   - Search optimization
   - Notification delivery
   - Data backup and maintenance

### 1.2 Data Requirements Analysis

#### Types of Data

1. **User Data**

   ```typescript
   // User account information
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

   // Role and permissions
   model Role {
     id          String    @id @default(cuid())
     name        String    @unique
     permissions String[]
     createdAt   DateTime  @default(now())
     updatedAt   DateTime  @updatedAt
   }
   ```

2. **Project Data**

   ```typescript
   // Project information
   model Project {
     id          String      @id @default(cuid())
     name        String
     address     String
     startDate   DateTime
     endDate     DateTime
     status      String
     milestones  Milestone[]
     team        TeamMember[]
     createdAt   DateTime    @default(now())
     updatedAt   DateTime    @updatedAt
   }

   // Task management
   model Task {
     id          String      @id @default(cuid())
     title       String
     description String?
     status      String
     priority    String
     dueDate     DateTime?
     category    String
     projectId   String
     project     Project     @relation(fields: [projectId], references: [id])
     assignedTo  String?
     subtasks    Subtask[]
     attachments Attachment[]
     createdAt   DateTime    @default(now())
     updatedAt   DateTime    @updatedAt
   }
   ```

3. **Document Data**

   ```typescript
   // Document management
   model Document {
     id          String      @id @default(cuid())
     title       String
     type        String
     content     String?
     fileUrl     String?
     projectId   String
     project     Project     @relation(fields: [projectId], references: [id])
     versions    Version[]
     createdBy   String
     createdAt   DateTime    @default(now())
     updatedAt   DateTime    @updatedAt
     metadata    Json?
   }
   ```

4. **AI Assistant Data**

   ```typescript
   // Conversation tracking
   model Conversation {
     id          String      @id @default(cuid())
     userId      String
     projectId   String?
     project     Project?    @relation(fields: [projectId], references: [id])
     messages    Message[]
     createdAt   DateTime    @default(now())
     updatedAt   DateTime    @updatedAt
   }

   // Command processing
   model Command {
     id          String    @id @default(cuid())
     userId      String
     command     String
     intent      String
     parameters  Json
     status      String
     result      Json?
     createdAt   DateTime  @default(now())
   }
   ```

### 1.3 Page Structure Planning

#### 1. Authentication Pages

- **Sign In**
  - Magic link authentication form
  - Email input
  - Success/error states
  - Loading states

- **Email Verification**
  - Magic link verification
  - Success/error handling
  - Redirect to dashboard

#### 2. Core Function Pages

- **Dashboard**
  - Project overview
  - Recent activities
  - Quick actions
  - AI assistant widget
  - Task summary

- **Project Management**
  - Project list view
  - Project details view
  - Milestone tracking
  - Team management
  - Resource allocation

- **Task Management**
  - Kanban board view
  - List view
  - Calendar view
  - Task details modal
  - Task creation form

- **Document Management**
  - Document library
  - Upload interface
  - Document viewer
  - Version history
  - Search interface

- **AI Assistant Interface**
  - Voice command interface
  - Chat interface
  - Command history
  - Generated content preview
  - Context display

#### 3. Account Management Pages

- **User Profile**
  - Profile information
  - Preferences settings
  - Notification settings
  - Theme settings

- **Team Management**
  - Team member list
  - Role management
  - Permission settings
  - Activity logs

- **System Settings**
  - Global preferences
  - Integration settings
  - Backup settings
  - Security settings

### 1.4 UI Components & Libraries

#### Core UI Libraries

- **shadcn/ui**: Base component library for consistent design
- **Roadmap UI**: Advanced project management visualization components
- **Tailwind CSS**: Utility-first CSS framework
- **react-beautiful-dnd**: Drag and drop functionality

#### Roadmap UI Integration

1. **Project Timeline View**

   ```typescript
   // Using Roadmap UI Gantt component
   import { GanttChart, GanttProvider } from '@/components/roadmap-ui/gantt'
   
   interface ProjectTimelineProps {
     projects: Project[]
     onTimelineUpdate: (updates: TimelineUpdate) => void
   }

   const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects, onTimelineUpdate }) => {
     return (
       <GanttProvider onUpdate={onTimelineUpdate}>
         <GanttChart
           items={projects}
           startDate={new Date()}
           endDate={addMonths(new Date(), 12)}
         />
       </GanttProvider>
     )
   }
   ```

2. **Task Management Views**

   ```typescript
   // Using Roadmap UI Kanban component
   import { KanbanBoard, KanbanProvider } from '@/components/roadmap-ui/kanban'
   
   interface TaskBoardProps {
     tasks: Task[]
     onTaskMove: (task: Task, newStatus: string) => void
   }

   const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onTaskMove }) => {
     return (
       <KanbanProvider onDragEnd={onTaskMove}>
         <KanbanBoard
           items={tasks}
           columns={['Backlog', 'In Progress', 'Review', 'Done']}
         />
       </KanbanProvider>
     )
   }
   ```

3. **Project List View**

   ```typescript
   // Using Roadmap UI List component
   import { List, ListProvider } from '@/components/roadmap-ui/list'
   
   interface ProjectListProps {
     projects: Project[]
     onProjectSelect: (projectId: string) => void
   }

   const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectSelect }) => {
     return (
       <ListProvider>
         <List
           items={projects}
           groupBy="status"
           onItemClick={onProjectSelect}
         />
       </ListProvider>
     )
   }
   ```

### 1.5 Component Structure

```typescript
// Core layout components
components/
  layout/
    AppShell.tsx
    Sidebar.tsx
    Header.tsx
    Footer.tsx

// Authentication components
  auth/
    MagicLinkForm.tsx
    VerificationStatus.tsx
    AuthGuard.tsx

// Project components
  projects/
    ProjectTimeline.tsx        // Uses Roadmap UI Gantt
    ProjectList.tsx           // Uses Roadmap UI List
    ProjectDetails.tsx
    MilestoneTracker.tsx

// Task components
  tasks/
    TaskBoard.tsx             // Uses Roadmap UI Kanban
    TaskList.tsx             // Uses Roadmap UI List
    TaskCalendar.tsx         // Uses Roadmap UI Calendar
    TaskForm.tsx

// Document components
  documents/
    DocumentUpload.tsx
    DocumentViewer.tsx
    DocumentList.tsx         // Uses Roadmap UI List
    VersionHistory.tsx

// AI Assistant components
  ai-assistant/
    VoiceRecorder.tsx
    ChatInterface.tsx
    CommandHistory.tsx
    ResponseViewer.tsx

// Shared components
  shared/
    Button.tsx               // shadcn/ui
    Input.tsx               // shadcn/ui
    Modal.tsx               // shadcn/ui
    Loading.tsx             // shadcn/ui
    ErrorBoundary.tsx

// Roadmap UI components (installed via CLI)
  roadmap-ui/
    gantt/
    kanban/
    list/
    calendar/
    table/

### 1.6 Installation & Setup

1. **Install Core Dependencies**
   ```bash
   # Install shadcn/ui
   npx shadcn-ui@latest init

   # Install Roadmap UI components
   npx roadmap-ui add gantt
   npx roadmap-ui add kanban
   npx roadmap-ui add list
   npx roadmap-ui add calendar
   npx roadmap-ui add table
   ```

2. **Configure Theme**

   ```typescript
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         // Custom colors matching construction industry
         colors: {
           primary: {...},
           secondary: {...},
           accent: {...}
         }
       }
     }
   }
   ```

3. **Setup Providers**

   ```typescript
   // app/providers.tsx
   import { RoadmapProvider } from '@/components/roadmap-ui/provider'

   export function Providers({ children }) {
     return (
       <RoadmapProvider>
         {children}
       </RoadmapProvider>
     )
   }

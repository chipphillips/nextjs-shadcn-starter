# Frontend Architecture

## Overview

The Constructiv AI platform frontend is built with modern React practices and Next.js 14, optimized for Windows 11 ARM64 architecture while focusing on performance, maintainability, and developer experience.

## Core Technologies

### Development Environment

- Windows 11 ARM64 (Version 10.0.26100+)
- Node.js v22.14.0 (ARM64)
- PowerShell Core 7.4.6+
- VS Code (ARM64)

### Framework & UI

- Next.js 14 (App Router)
- React 18
- TypeScript 5.3+
- Tailwind CSS
- shadcn/ui components

### State Management

- Zustand for UI state
- React Query v5 for server state
- React Hook Form for forms

### AI Integration

- Vercel AI SDK 4.0 (ARM64 optimized)
- OpenAI integration (GPT-4, Whisper)
- Streaming responses
- Worker thread optimization

## Component Architecture

### Layout Components

```tsx
app/
├── layout.tsx              // Root layout
├── (auth)/                // Auth routes
├── (dashboard)/           // Main app routes
└── (public)/              // Public routes
```

### Feature Components

```tsx
components/
├── projects/              // Project management
│   ├── ProjectList.tsx
│   ├── ProjectTimeline.tsx
│   └── ProjectKanban.tsx
├── documents/             // Document management
│   ├── DocumentList.tsx
│   ├── DocumentUpload.tsx
│   └── DocumentPreview.tsx
├── tasks/                 // Task management
│   ├── TaskList.tsx
│   ├── ProcessTemplate.tsx
│   └── TaskKanban.tsx
└── ai-assistant/          // Max AI Assistant
    ├── ChatDrawer.tsx
    ├── VoiceInput.tsx
    └── DocumentGeneration.tsx
```

## Data Flow Patterns

### 1. Server State Management

```tsx
// Example using React Query
const { data: projects } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects
})
```

### 2. UI State Management

```tsx
// Example using Zustand
const useStore = create((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ 
    sidebarOpen: !state.sidebarOpen 
  }))
}))
```

### 3. Form Handling

```tsx
// Example using React Hook Form
const { register, handleSubmit } = useForm<ProjectForm>({
  resolver: zodResolver(projectSchema)
})
```

## Key Features Implementation

### Project Management

- Gantt chart for timelines
- Kanban board for tasks
- List view for overview

### Document Management

- AI-assisted generation
- File upload/preview
- Search functionality

### Task Management

- Process templates
- Task categories
- Progress tracking

### AI Assistant (Max)

- Chat drawer interface
- Voice command processing
- Context-aware responses

## Performance Considerations

1. **ARM64 Optimization**
   - Native module usage
   - Worker thread optimization
   - Memory management
   - Build process optimization

2. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports
   - Architecture-aware chunking

3. **State Management**
   - Optimistic updates
   - Efficient caching
   - Background updates
   - Memory-efficient stores

4. **Asset Optimization**
   - Image optimization
   - Font loading strategy
   - Bundle size monitoring
   - Architecture-specific caching

5. **Resource Management**

   ```typescript
   // hooks/useResourceMonitor.ts
   export const useResourceMonitor = () => {
     useEffect(() => {
       const interval = setInterval(() => {
         // Monitor memory usage
         monitorMemory()
         
         // Monitor worker threads
         if (process.env.NODE_ENV === 'development') {
           const workers = process._getActiveHandles()
             .filter(handle => handle instanceof Worker)
           console.log(`Active workers: ${workers.length}`)
         }
       }, 30000)

       return () => clearInterval(interval)
     }, [])
   }
   ```

## Error Handling

1. **API Errors**
   - Error boundaries
   - Toast notifications
   - Retry mechanisms

2. **Form Validation**
   - Client-side validation
   - Server-side validation
   - Error messages

## Testing Strategy

1. **Unit Tests**
   - Component testing
   - Hook testing
   - Utility function testing

2. **Integration Tests**
   - Feature flow testing
   - API integration
   - State management

## Security Measures

1. **Authentication**
   - Protected routes
   - Token management
   - Session handling

2. **Data Protection**
   - Input sanitization
   - XSS prevention
   - CSRF protection

## Component Library

Core UI components for the Constructiv AI platform, built with Next.js 14, Tailwind CSS, and shadcn/ui.

### Components

### Core Components (shadcn/ui)

- Accordion
- Alert Dialog
- Avatar
- Button
- Card
- Checkbox
- Command
- Dialog
- Dropdown Menu
- Form
- Input
- Navigation Menu
- Select
- Table
- Tabs
- Toast
- Tooltip

### Project Management Components (roadmap-ui)

- Gantt Chart
  - Timeline visualization
  - Drag-and-drop features
  - Markers for important dates
- Kanban Board
  - Drag-and-drop cards
  - Customizable columns
  - Card details and metadata
- List View
  - Reorderable subtasks within task cards
  - Grouped items
  - Drag-and-drop reordering
- Calendar View
  - Month/Year selection
  - Date pagination
  - Customizable calendar items
  - Feature visualization

## Layout Components by Page

### AppShell

- Main application layout
- Responsive sidebar
- Top navigation bar
- Content area

### ProjectLayout

- Project header
- Tab navigation
- Contextual sidebar
- Content area

## Custom Components

### Navigation

- Sidebar (collapsible)
- Breadcrumbs
- TabNav
- DropdownMenu

### Data Display

- DataTable
- Card
- List
- Timeline
- StatusBadge
- ProgressBar

### Forms

- TextInput
- TextArea
- Select
- MultiSelect
- DatePicker
- FileUpload
- VoiceRecorder

### Feedback

- Toast
- AlertDialog
- LoadingSpinner
- SkeletonLoader
- ErrorBoundary

### AI Components

- ChatDrawer
- VoiceInput
- DocumentPreview
- AIStreamingResponse

## Component Guidelines

### Usage Guidelines

All components follow shadcn/ui's design principles:

- Accessible by default
- Customizable and themeable
- Built with Radix UI primitives
- Styled with Tailwind CSS

### State Management Guidelines

- Loading states
- Error states
- Empty states
- Success states

### Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast

### Responsive Design

- Mobile-first approach
- Breakpoint system
- Touch targets
- Viewport considerations

## Theme System

### Colors

```typescript
export const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    900: '#0c4a6e',
  },
  // ... other colors
};
```

### Typography

```typescript
export const typography = {
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  // ... other typography settings
};
```

### Spacing

```typescript
export const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  4: '1rem',
  // ... other spacing values
};
```

- Use the shadcn CLI to add and update components
- Maintain dark mode compatibility
- Follow the copy/paste approach of shadcn/ui for customization
- Keep components up to date using the diff command
- Document all custom modifications
- Test accessibility with screen readers
- Ensure responsive design across all viewports

## Usage Examples

### Basic Form

```tsx
<Form onSubmit={handleSubmit}>
  <TextInput
    label="Project Name"
    name="name"
    required
    maxLength={100}
  />
  <TextArea
    label="Description"
    name="description"
    rows={4}
  />
  <DatePicker
    label="Start Date"
    name="startDate"
    required
  />
  <Button type="submit">
    Create Project
  </Button>
</Form>
```

### Data Table

```tsx
<DataTable
  columns={columns}
  data={tasks}
  pagination
  sortable
  searchable
  loading={isLoading}
  onRowClick={handleRowClick}
/>
```

### AI Chat

```tsx
<ChatDrawer
  projectId={projectId}
  documentType="FIELD_NOTE"
  onClose={handleClose}
>
  <VoiceInput
    onRecording={handleRecording}
    onComplete={handleComplete}
  />
  <AIStreamingResponse>
    {(content) => (
      <DocumentPreview content={content} />
    )}
  </AIStreamingResponse>
</ChatDrawer>
```

## Server Component Patterns

### Data Fetching

```tsx
// app/(dashboard)/projects/page.tsx
async function ProjectsPage() {
  const projects = await fetchProjects(); // Server-side fetch
  
  return (
    <Suspense fallback={<ProjectListSkeleton />}>
      <ProjectList initialData={projects} />
    </Suspense>
  );
}
```

### Route Handlers

```tsx
// app/api/projects/route.ts
export async function GET() {
  const projects = await db.projects.findMany();
  return Response.json(projects);
}
```

### Server Actions

```tsx
// app/(dashboard)/projects/[id]/actions.ts
'use server'

export async function updateProject(id: string, data: ProjectUpdateData) {
  await db.projects.update({ where: { id }, data });
  revalidatePath(`/projects/${id}`);
}
```

## Lazy Loading Guidelines

### Component-Level Code Splitting

```tsx
// Lazy load heavy components
const ProjectGanttChart = dynamic(() => import('@/components/projects/GanttChart'), {
  loading: () => <GanttChartSkeleton />,
  ssr: false // For client-only components
});

// Lazy load based on viewport
const DocumentPreview = dynamic(() => import('@/components/documents/Preview'), {
  loading: () => <PreviewSkeleton />,
  ssr: true
});
```

### Route-Level Code Splitting

```tsx
// app/(dashboard)/layout.tsx
import { Suspense } from 'react';

const AIAssistant = dynamic(() => import('@/components/ai-assistant/ChatDrawer'), {
  loading: () => null,
  ssr: false
});

export default function DashboardLayout({ children }) {
  return (
    <div>
      {children}
      <Suspense>
        <AIAssistant />
      </Suspense>
    </div>
  );
}
```

### Image and Font Optimization

```tsx
// components/common/OptimizedImage.tsx
export function OptimizedImage({ src, alt, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
}
```

## Page-by-Page Implementation

### Authentication Pages

#### Login Page

```tsx
// app/(auth)/login/page.tsx
export default function LoginPage() {
  return (
    <div className="auth-container">
      <LoginForm />
      <MagicLinkForm />
      <ErrorBoundary fallback={<AuthError />}>
        <OAuthProviders />
      </ErrorBoundary>
    </div>
  );
}
```

#### Register Page

```tsx
// app/(auth)/register/page.tsx
export default function RegisterPage() {
  return (
    <div className="auth-container">
      <RegisterForm />
      <VerificationStep />
      <SuccessMessage />
    </div>
  );
}
```

### Dashboard Pages

#### Dashboard Landing

```tsx
// app/(dashboard)/page.tsx
export default async function DashboardPage() {
  const stats = await fetchDashboardStats();
  const tasks = await fetchRecentTasks();
  
  return (
    <div className="dashboard-container">
      <Suspense fallback={<StatsSkeleton />}>
        <QuickStats data={stats} />
      </Suspense>
      <Suspense fallback={<TasksSkeleton />}>
        <RecentTasks data={tasks} />
      </Suspense>
    </div>
  );
}
```

#### Projects List

```tsx
// app/(dashboard)/projects/page.tsx
export default async function ProjectsPage() {
  const projects = await fetchProjects();
  
  return (
    <div className="projects-container">
      <ProjectFilters />
      <Suspense fallback={<ProjectsTableSkeleton />}>
        <ProjectsTable initialData={projects} />
      </Suspense>
      <CreateProjectButton />
    </div>
  );
}
```

#### Project Detail

```tsx
// app/(dashboard)/projects/[projectId]/page.tsx
export default async function ProjectDetailPage({ params }) {
  const project = await fetchProject(params.projectId);
  
  return (
    <div className="project-detail">
      <ProjectHeader project={project} />
      <Tabs defaultValue="overview">
        <TabContent value="overview">
          <ProjectOverview project={project} />
        </TabContent>
        <TabContent value="tasks">
          <Suspense fallback={<TasksSkeleton />}>
            <ProjectTasks projectId={params.projectId} />
          </Suspense>
        </TabContent>
        <TabContent value="documents">
          <Suspense fallback={<DocumentsSkeleton />}>
            <ProjectDocuments projectId={params.projectId} />
          </Suspense>
        </TabContent>
      </Tabs>
    </div>
  );
}
```

### Tasks Pages

#### Tasks List

```tsx
// app/(dashboard)/tasks/page.tsx
export default async function TasksPage() {
  const tasks = await fetchTasks();
  
  return (
    <div className="tasks-container">
      <TaskFilters />
      <Suspense fallback={<TasksTableSkeleton />}>
        <TasksTable initialData={tasks} />
      </Suspense>
      <CreateTaskButton />
    </div>
  );
}
```

### Documents Pages

#### Documents List

```tsx
// app/(dashboard)/documents/page.tsx
export default async function DocumentsPage() {
  const documents = await fetchDocuments();
  
  return (
    <div className="documents-container">
      <DocumentFilters />
      <Suspense fallback={<DocumentsGridSkeleton />}>
        <DocumentsGrid initialData={documents} />
      </Suspense>
      <DocumentActions>
        <UploadButton />
        <GenerateButton />
      </DocumentActions>
    </div>
  );
}
```

## Implementation Guidelines

### Error Handling Guidelines

```tsx
// components/common/ErrorBoundary.tsx
export function PageErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallback={<ErrorPage />}
      onError={(error) => {
        captureException(error);
        showErrorToast('An error occurred. Please try again.');
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### Loading States Guidelines

```tsx
// components/common/LoadingStates.tsx
export function TableSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-full mb-4" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-100 rounded w-full mb-2" />
      ))}
    </div>
  );
}
```

### Navigation Guidelines

```tsx
// components/layout/Navigation.tsx
export function DashboardNav() {
  const pathname = usePathname();
  
  return (
    <nav className="dashboard-nav">
      <NavLink
        href="/dashboard"
        isActive={pathname === '/dashboard'}
      >
        Overview
      </NavLink>
      {/* Other nav items */}
    </nav>
  );
}
```

## Development Guidelines

### ARM64 Considerations

1. **Package Selection**
   - Prefer ARM64-native packages
   - Verify package compatibility
   - Monitor emulation overhead
   - Use architecture-specific builds

2. **Performance Monitoring**
   - Track memory usage
   - Monitor worker threads
   - Measure render times
   - Profile ARM64 performance

3. **Build Process**
   - Optimize chunk sizes
   - Enable build caching
   - Configure memory limits
   - Use efficient bundling

4. **Testing Requirements**
   - Architecture-specific tests
   - Performance benchmarks
   - Memory leak checks
   - Worker thread testing

Last Updated: February 12, 2024

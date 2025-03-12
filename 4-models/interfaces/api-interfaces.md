# API Interfaces

## Overview

TypeScript interface definitions for API requests/responses and Prisma models.

## Prisma Type Usage

These interfaces work alongside Prisma's generated types:

```typescript
// Prisma will generate types like:
type User = Prisma.User
type Project = Prisma.Project

// Our interfaces extend these for API responses:
interface UserResponse extends Prisma.User {
  profile: Profile;  // Eager loaded relation
  _count?: {        // Additional metadata
    projects: number;
  };
}

// Use Prisma types for database operations
async function getUser(id: string): Promise<UserResponse> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { profile: true },
  });
  return user as UserResponse;
}
```

Note: Prisma's types are used directly for database operations, while our interfaces add API-specific fields and handle response structures.

## Core Model Interfaces

### User & Profile

```typescript
interface User {
  id: string;
  email: string;
  role: UserRole;
  profile?: Profile;
  createdAt: Date;
  updatedAt: Date;
}

interface Profile {
  id: string;
  userId: string;
  fullName: string;
  avatar?: string;
  preferences: JsonValue;
}
```

### Project

```typescript
interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  teamMembers: ProjectMember[];
  tasks: Task[];
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: UserRole;
  joinedAt: Date;
}
```

### Task

```typescript
interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assignedTo?: string;
  dueDate?: Date;
  completionPercentage: number;
  parentTaskId?: string;
  processId?: string;
  processOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Document

```typescript
interface Document {
  id: string;
  projectId: string;
  title: string;
  type: DocumentType;
  content?: string;
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;
  approvalStatus: ApprovalStatus;
  taskId?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### AI Assistant

```typescript
interface Chat {
  id: string;
  title: string;
  projectId?: string;
  documentType?: DocumentType;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  contentType: 'text' | 'voice';
  transcription?: string;
  metadata: JsonValue;
  createdAt: Date;
}
```

## API Request/Response Types

### Project Management

```typescript
interface CreateProjectRequest {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  teamMembers: Array<{
    userId: string;
    role: UserRole;
  }>;
}

interface ProjectResponse {
  project: Project;
  _count?: {
    tasks: number;
    documents: number;
    teamMembers: number;
  };
}
```

### Document Management

```typescript
interface GenerateDocumentRequest {
  projectId: string;
  type: DocumentType;
  title: string;
  voiceInput?: string;
  templateId?: string;
}

interface DocumentResponse {
  document: Document;
  preview?: string;
  versions?: Array<{
    id: string;
    version: number;
    createdAt: Date;
  }>;
}
```

### Task Management

```typescript
interface CreateTaskRequest {
  projectId: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  category: TaskCategory;
  assignedTo?: string;
  dueDate?: Date;
  parentTaskId?: string;
}

interface TaskResponse {
  task: Task;
  subtasks?: Task[];
  linkedDocuments?: Document[];
}
```

## Shared Types

### Pagination

```typescript
interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
```

### Search

```typescript
interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  projectId?: string;
  type?: string;
  dateRange?: {
    start?: Date;
    end?: Date;
  };
}
```

### Error Handling

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  stack?: string; // Only in development
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  validationErrors?: ValidationError[];
}
```

### Form Validation

```typescript
interface FormField<T> {
  value: T;
  error?: string;
  touched: boolean;
  required?: boolean;
}

interface FormState {
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}
```

# Enums and Constants

## Overview

Enumerated types and constant definitions used across the application, aligned with Prisma schema and TypeScript types.

## Enums

### UserRole

```typescript
enum UserRole {
  ADMIN = 'ADMIN',
  TEAM_LEAD = 'TEAM_LEAD',
  MEMBER = 'MEMBER'
}
```

### ProjectStatus

```typescript
enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED'
}
```

### TaskStatus

```typescript
enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED'
}
```

### TaskPriority

```typescript
enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}
```

### TaskCategory

```typescript
enum TaskCategory {
  PRE_CONSTRUCTION = 'PRE_CONSTRUCTION',
  CONSTRUCTION = 'CONSTRUCTION',
  ADMINISTRATIVE = 'ADMINISTRATIVE'
}
```

### DocumentType

```typescript
enum DocumentType {
  CHANGE_ORDER = 'CHANGE_ORDER',
  INVOICE = 'INVOICE',
  CONTRACT = 'CONTRACT',
  REPORT = 'REPORT',
  NOTE = 'NOTE',
  OTHER = 'OTHER'
}
```

### ApprovalStatus

```typescript
enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
```

## Constants

### System Limits

```typescript
export const SYSTEM_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_TEAM_SIZE: 50,
  MAX_TASKS_PER_PROJECT: 1000,
  MAX_DOCUMENTS_PER_PROJECT: 1000
} as const;
```

### Default Values

```typescript
export const DEFAULTS = {
  ITEMS_PER_PAGE: 20,
  CHAT_HISTORY_LIMIT: 100,
  DOCUMENT_PREVIEW_SIZE: 1024 * 1024 // 1MB
} as const;
```

### Feature Flags

```typescript
export const FEATURES = {
  ENABLE_VOICE_COMMANDS: true,
  ENABLE_AI_ASSISTANCE: true,
  ENABLE_REAL_TIME: true
} as const;
```

### Validation Rules

```typescript
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PROJECT_NAME_MAX_LENGTH: 100,
  TASK_TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 2000,
  MAX_TEAM_MEMBERS: 50
} as const;
```

### API Routes

```typescript
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  PROJECTS: {
    BASE: '/api/projects',
    BY_ID: (id: string) => `/api/projects/${id}`,
    MEMBERS: (id: string) => `/api/projects/${id}/members`,
    TASKS: (id: string) => `/api/projects/${id}/tasks`,
    DOCUMENTS: (id: string) => `/api/projects/${id}/documents`
  },
  DOCUMENTS: {
    GENERATE: '/api/documents/generate',
    UPLOAD: '/api/documents/upload',
    SEARCH: '/api/documents/search'
  },
  AI: {
    CHAT: '/api/ai/chat',
    VOICE: '/api/ai/voice'
  }
} as const;
```

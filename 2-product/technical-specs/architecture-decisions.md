# Architecture Decision Records (ADR)

## Overview

This document captures key architectural decisions made for the Constructiv AI platform, including their context and consequences.

## Decision Records

### ADR-001: Technology Stack Selection

- **Status**: Accepted
- **Context**: Need for a scalable, maintainable tech stack for construction industry software with strong AI capabilities
- **Decision**:
  1. Frontend & UI:
     - Next.js 14 (App Router) for routing and server components
     - React 18 for UI components and interactivity
     - TypeScript for type safety and developer experience
     - Tailwind CSS + shadcn/ui for consistent, maintainable styling
     - Zustand for lightweight state management
     - React Query (@tanstack/react-query) for server state and caching
     - React Hook Form + Zod for form handling and validation
     - Additional UI Libraries:
       - react-beautiful-dnd for drag-and-drop
       - @fullcalendar/react for calendar views
       - Various shadcn/ui components for core UI elements

  2. Backend & Data:
     - Next.js API Routes for backend endpoints
     - Prisma ORM for:
       - Type-safe database operations
       - Schema management and migrations
       - Relationship handling
     - Supabase for:
       - PostgreSQL database with RLS policies
       - Magic link authentication
       - Storage for documents and media
       - Real-time subscriptions (future enhancement)

  3. AI & Voice Integration:
     - Vercel AI SDK 4.0 for:
       - OpenAI integration (GPT-4, GPT-3.5)
       - Streaming chat interfaces
       - AI response handling
     - OpenAI Services:
       - Whisper API for voice transcription
       - GPT-4 for natural language processing
       - Assistants API for domain-specific tasks
     - Custom AI pipelines for:
       - Voice command processing
       - Document generation
       - Context-aware responses

  4. Development & Deployment:
     - Vercel for:
       - Production hosting
       - Serverless functions
       - Edge functions (when needed)
       - Preview deployments
     - GitHub Actions for:
       - Continuous Integration
       - Linting
       - Testing
     - Development Tools:
       - TypeScript for static typing
       - ESLint for code quality
       - Prettier for formatting

- **Consequences**:
  1. Development Benefits:
     - Full-stack TypeScript for end-to-end type safety
     - Unified Next.js codebase simplifies development
     - Strong developer experience with modern tools
     - Rapid iteration with Vercel deployment

  2. Performance & Scalability:
     - Server components reduce client-side JavaScript
     - Edge-ready architecture with Vercel
     - Efficient data access with Prisma
     - Real-time capabilities through Supabase

  3. AI Capabilities:
     - Seamless AI integration via Vercel AI SDK
     - Streaming responses for better UX
     - Powerful voice processing pipeline
     - Extensible AI architecture

  4. Security & Compliance:
     - Built-in security with Supabase RLS
     - Magic link authentication reduces security risks
     - Type safety prevents common vulnerabilities
     - Easy audit trail implementation

  5. User Experience:
     - Fast page loads with server components
     - Responsive UI with Tailwind
     - Consistent design with shadcn/ui
     - Smooth interactions with optimistic updates

  6. Maintenance & Monitoring:
     - Clear separation of concerns
     - Easy debugging with TypeScript
     - Simplified state management
     - Built-in performance monitoring

### ADR-002: Database Architecture

- **Status**: Accepted
- **Context**: Need for handling complex construction project data relationships and efficient data access patterns
- **Decision**:
  1. Database Platform:
     - Supabase with PostgreSQL as primary database
     - Row Level Security (RLS) for fine-grained access control
     - Real-time subscriptions capability for future enhancements
     - Built-in authentication and storage solutions

  2. Core Data Models:
     - Users: Authentication and profile management
     - Projects: Central entity for construction projects
     - Tasks: Process and workflow management
     - Documents: File storage and version control
     - AI Assistant: Chat and voice interaction history

  3. Key Design Patterns:
     - UUID primary keys for all tables
     - Consistent timestamp tracking (created_at, updated_at)
     - Soft deletes via deleted_at columns
     - Enum constraints for status fields
     - Junction tables for many-to-many relationships
     - Hierarchical structures for tasks (parent-child)
     - Process templates for reusable workflows

  4. Performance Optimizations:
     - Strategic indexing for common queries
     - Materialized views for complex aggregations
     - Composite indexes for filtered searches
     - Helper views for dropdown suggestions
     - Efficient process template application

  5. Security Implementation:
     - Row Level Security (RLS) policies for all tables
     - Role-based access control
     - Secure helper functions with SECURITY DEFINER
     - Cascading deletes for referential integrity
     - Input validation via check constraints

- **Consequences**:
  1. Data Integrity:
     - Strong consistency through PostgreSQL
     - Type safety via TypeScript interfaces
     - Automated constraint enforcement
     - Clear audit trails

  2. Performance:
     - Optimized query patterns
     - Efficient data access
     - Scalable architecture
     - Real-time capability

  3. Security:
     - Fine-grained access control
     - Data isolation between clients
     - Secure default configurations
     - Audit capability

  4. Development:
     - Type-safe database operations
     - Clear model relationships
     - Reusable process templates
     - Simplified API development

  5. Maintenance:
     - Consistent schema patterns
     - Self-documenting constraints
     - Automated timestamps
     - Version tracking

### ADR-003: API Design Pattern

- **Status**: Accepted
- **Context**: Need for consistent API design across the platform that supports construction industry workflows
- **Decision**:
  1. API Architecture:
     - RESTful API design with versioning (/v1/)
     - Next.js API routes for serverless endpoints
     - Supabase for data access and authentication
     - OpenAI integration for AI features
     - Rate limiting and monitoring

  2. Core Principles:
     - Resource-based URL structure
     - Standard HTTP methods (GET, POST, PUT, DELETE)
     - Consistent response formats
     - Comprehensive error handling
     - Pagination for large datasets
     - Strong typing with TypeScript

  3. Authentication & Security:
     - JWT-based authentication
     - Magic link authentication flow
     - Row Level Security (RLS)
     - Rate limiting by authentication status
     - HTTPS-only access
     - Secure cookie handling

  4. Request/Response Pattern:
     - JSON request/response format
     - Standardized error responses
     - Metadata for pagination
     - Rate limit headers
     - Consistent field naming (camelCase)
     - ISO 8601 date formats

  5. Resource Organization:
     - Authentication routes (/auth/*)
     - Project management (/projects/*)
     - Task management (/tasks/*)
     - Document handling (/documents/*)
     - AI Assistant integration (/ai-assistant/*)

- **Consequences**:
  1. Developer Experience:
     - Clear, predictable API patterns
     - Type-safe API contracts
     - Comprehensive documentation
     - Easy client integration
     - Testable endpoints

  2. Performance:
     - Efficient data loading
     - Optimized response sizes
     - Smart pagination
     - Rate limit protection
     - Edge-ready architecture

  3. Scalability:
     - Versioned API support
     - Serverless deployment
     - Horizontal scaling
     - Cache-friendly design
     - Async processing capability

  4. Security:
     - Robust authentication
     - Fine-grained authorization
     - Protected endpoints
     - Audit trail capability
     - DDOS protection

  5. Maintainability:
     - Consistent patterns
     - Clear documentation
     - Modular design
     - Easy versioning
     - Monitoring support

## Template for New Decisions

# Architecture Decision Records (ADR)

## Overview

This document captures key architectural decisions made for the Constructiv AI platform, including their context and consequences.

## Decision Records

### ADR-001: Technology Stack Selection

- **Status**: Accepted
- **Context**: Need for a scalable, maintainable tech stack for construction industry software with strong AI capabilities, optimized for Windows 11 ARM64 architecture
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

  2. Development Environment:
     - Windows 11 ARM64 (Version 10.0.26100 or later)
     - Node.js v22.14.0 (ARM64) for native performance
     - PowerShell Core 7.4.6+ for consistent shell experience
     - VS Code (ARM64) with optimized extensions
     - Git v2.47.1 (via x64 emulation)
     - Docker Desktop (ARM64) for containerization

  3. Backend & Data:
     - Next.js API Routes for backend endpoints
     - Prisma ORM with native ARM64 query engine for:
       - Type-safe database operations
       - Schema management and migrations
       - Relationship handling
     - Supabase for:
       - PostgreSQL database with RLS policies
       - Magic link authentication
       - Storage for documents and media
       - Real-time subscriptions (future enhancement)

  4. AI & Voice Integration:
     - Vercel AI SDK 4.0 (ARM64 optimized) for:
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

  5. Development & Deployment:
     - Vercel for:
       - Production hosting with ARM64 support
       - Serverless functions
       - Edge functions (when needed)
       - Preview deployments
     - GitHub Actions for:
       - ARM64-aware CI/CD pipeline
       - Architecture-specific testing
       - Cross-platform compatibility checks
     - Development Tools:
       - TypeScript for static typing
       - ESLint for code quality
       - Prettier for formatting

- **Consequences**:
  1. Development Benefits:
     - Full-stack TypeScript for end-to-end type safety
     - Native ARM64 performance for most tools
     - Optimized development experience
     - Rapid iteration with Vercel deployment

  2. Performance & Scalability:
     - Native ARM64 execution for better performance
     - Efficient resource utilization
     - Optimized memory management
     - Architecture-specific optimizations

  3. Architecture Considerations:
     - Native vs Emulated performance tracking
     - ARM64-specific memory management
     - Optimized build processes
     - Architecture-aware dependency management

  4. Security & Compliance:
     - Built-in security with Supabase RLS
     - Architecture-specific security considerations
     - Type safety prevents common vulnerabilities
     - Easy audit trail implementation

  5. User Experience:
     - Fast page loads with server components
     - Native performance on ARM64 devices
     - Consistent design with shadcn/ui
     - Smooth interactions with optimistic updates

  6. Maintenance & Monitoring:
     - Architecture-specific performance monitoring
     - Clear separation of concerns
     - Easy debugging with TypeScript
     - Simplified state management

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

### ADR-004: Frontend Architecture

- **Status**: Accepted
- **Context**: Need for a modern, performant, and maintainable frontend architecture that supports real-time updates, voice-first interaction, complex state management, and responsive design for field use
- **Decision**:
  1. Core Framework:
The Constructiv AI platform requires a modern, performant, and maintainable frontend architecture that supports:
- Real-time updates and collaboration
- Voice-first interaction
- Complex state management
- Progressive Web App (PWA) capabilities
- Responsive design for field use
- Type safety and code quality

## Decision

We will implement the frontend architecture using the following stack and patterns:

1. **Core Framework**
   - Next.js 14 with App Router for server components and routing
   - React 18 for UI components
   - TypeScript for type safety
   - Tailwind CSS & shadcn/ui for styling and components

2. **State Management**
   - Zustand for local state management
   - React Query for server state and caching
   - Vercel AI SDK for streaming chat interface
   - React Hook Form + Zod for form validation

3. **Component Architecture**
   - Atomic design pattern
   - Server and Client Components separation
   - Shared UI component library
   - Mobile-first responsive design

4. **Performance Optimizations**
   - Server-side rendering (SSR)
   - Static site generation (SSG) where applicable
   - Dynamic imports and code splitting
   - Asset optimization and caching

## Consequences

### Positive

- Improved development velocity with modern tooling
- Better type safety and code maintainability
- Enhanced performance through SSR and optimizations
- Consistent UI/UX across devices
- Real-time capabilities for collaboration

### Negative

- Learning curve for team members new to Next.js 14
- Additional complexity in state management
- Need for careful component architecture planning

### Neutral

- Regular updates needed to maintain framework versions
- Ongoing performance monitoring required

### ADR-005: AI Integration Architecture

- **Status**: Accepted
- **Context**: Need for robust AI integration for voice commands, document generation, and natural language processing, while maintaining high accuracy, fast response times, context awareness, secure data handling, and scalable processing pipeline
- **Decision**:
- High accuracy in voice recognition
- Fast response times
- Context awareness
- Secure data handling
- Scalable processing pipeline

**Decision**:

We will implement the AI integration architecture using the following components:

1. **Voice Processing Pipeline**
   - OpenAI Whisper API for voice transcription
   - Real-time audio capture and preprocessing
   - Noise reduction algorithms
   - Multi-accent support
   - Command history tracking

2. **Natural Language Processing**
   - GPT-4 for command understanding
   - OpenAI Assistants API for construction domain expertise
   - Custom prompt engineering for construction context
   - Intent classification system
   - Parameter extraction pipeline

3. **Context Management**
   - Project context integration
   - User preferences storage
   - Conversation history tracking
   - Access control integration
   - Real-time state updates

4. **Integration Points**
   - Vercel AI SDK for streaming responses
   - WebSocket connections for real-time updates
   - Secure API endpoints for AI services
   - Caching layer for frequent requests
   - Error handling and fallback mechanisms

**Consequences**:

1. Positive

- High accuracy in voice recognition and processing
- Specialized construction domain understanding
- Real-time response capabilities
- Scalable architecture for future enhancements

2. Negative

- Dependency on third-party AI services
- Cost considerations for API usage
- Need for ongoing prompt engineering
- Privacy considerations for voice data

3. Neutral

- Regular model updates and retraining needed
- Continuous monitoring of AI performance
- Need for fallback mechanisms

### ADR-004: ARM64 Architecture Optimization

- **Status**: Accepted
- **Context**: Need to optimize platform performance for Windows 11 ARM64 architecture while maintaining compatibility
- **Decision**:
  1. Development Environment:
     - Native ARM64 tools when available
     - x64 emulation for legacy tools
     - Architecture-specific performance monitoring
     - Optimized resource allocation

  2. Package Management:
     - ARM64-native packages preferred
     - Architecture compatibility verification
     - Version control for native/emulated packages
     - Performance impact monitoring

  3. Build Process:
     - Architecture-aware build pipeline
     - Optimized compilation settings
     - Memory management for ARM64
     - Cache optimization strategies

  4. Performance Optimization:
     - Native execution prioritization
     - Worker thread optimization
     - Memory allocation strategies
     - Emulation overhead monitoring

  5. Testing & Verification:
     - Architecture-specific test suites
     - Performance benchmarking
     - Compatibility verification
     - Resource utilization monitoring

- **Consequences**:
  1. Performance Benefits:
     - Improved native execution speed
     - Optimized resource utilization
     - Better memory management
     - Reduced emulation overhead

  2. Development Impact:
     - Clear architecture guidelines
     - Simplified troubleshooting
     - Consistent development experience
     - Better resource management

  3. Maintenance Considerations:
     - Architecture-specific monitoring
     - Clear performance metrics
     - Easy issue identification
     - Streamlined updates

  4. Future Compatibility:
     - Forward-compatible architecture
     - Easy migration path
     - Flexible deployment options
     - Scalable performance

Last Updated: February 12, 2024

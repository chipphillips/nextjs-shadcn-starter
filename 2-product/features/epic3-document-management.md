# Epic 3: Document Management

1. **Feature Name**
   - **Document Management**

2. **Purpose & Value**
   - Provides a centralized way to generate and manage construction documents using AI assistance.
   - Streamlines document creation through voice commands and templates.
   - Ensures proper access control for document generation based on user roles.

3. **User Story**
   > As a builder, I want to quickly generate standardized documents using voice commands with Max, so I can save time while maintaining consistency.
   > As an admin, I want to control which users can generate specific types of documents, so I can maintain proper authorization and quality control.

4. **Key Actions & User Flow**
   1. **Generate documents** using voice commands with Max
   2. **Review and edit** AI-generated content in real-time
   3. **Save and manage** documents by type and project
   4. **Upload existing documents** to associate with projects
   5. **Control access** to document generation by user/role
   6. **Search and retrieve** documents across projects

5. **Acceptance Criteria**
   - **Sub-feature 3.1: Document Generation with Max**
     - Users can initiate document generation using voice commands
     - Max streams generated content in real-time for review
     - Users can edit content during generation
     - Generated documents use standardized templates
     - Voice input is transcribed accurately with error correction
     - Documents are automatically associated with current project

   - **Sub-feature 3.2: Document Types and Templates**
     - System supports MVP document types:
       - Construction Documents (Change Orders, Quality Control Checklists, Project Proposals)
       - Project Reports (Delay Notifications)
       - Field Notes
     - Each document type has a standardized template
     - Templates include proper formatting and required fields
     - Documents maintain consistency across projects
     - Users can upload existing documents in common formats:
       - PDF files
       - Word documents
       - Excel spreadsheets
       - Image files (JPG, PNG)
     - Uploaded documents are:
       - Associated with specific projects
       - Categorized by document type
       - Searchable by filename and metadata
       - Accessible based on user permissions

   - **Sub-feature 3.3: Access Control**
     - Admins can manage document generation permissions
     - Permissions can be assigned by document type
     - All users can generate reports and notes by default
     - Document generation permissions can be role-based
     - Users can only see document types they have permission for
     - Permission changes take effect immediately

   - **Sub-feature 3.4: Document Search and Retrieval**
     - Users can search documents by:
       - Document type (Change Orders, Reports, Notes)
       - Project association
       - Date range
       - Content keywords
     - Search results show:
       - Document title and type
       - Creation date and author
       - Associated project
       - Document status
     - Users can:
       - Preview documents from search results
       - Filter results by document type
       - Sort results by date or relevance
       - Access documents they have permission for
     - Search is available across all projects user has access to

6. **Technical Notes / Implementation Details**
   - **AI Integration**:
     - Vercel AI SDK 4.0 for streaming generation
     - OpenAI for voice transcription and text generation
     - Real-time content streaming UI
     - Template-based generation with placeholders

   - **Permission Management**:
     - Role-based access control
     - Document type permissions
     - User-specific overrides
     - Permission inheritance from roles

   - **UI Components**:
     - Voice input interface with status indicators
     - Streaming content editor
     - Permission management dashboard
     - Document type selector based on permissions
     - Template preview and selection
     - Search and Retrieval UI:
       - Global search bar with type-ahead suggestions
       - Advanced search filters panel
       - Results list with document previews
       - Sort and filter controls
       - Quick action buttons (view, edit, download)
     - File Upload UI:
       - Drag-and-drop file upload zone
       - Multi-file upload support
       - Upload progress indicators
       - File type validation
       - Size limit warnings
       - Auto-categorization suggestions
       - Project association selector

   - **Frontend Stack**:
     - Next.js 14 with App Router for routing and server components
     - React 18 for UI components
     - TypeScript for type safety
     - Tailwind CSS & shadcn/ui for UI components and styling
     - Zustand for document state management
     - React Query for server state and caching
     - React Hook Form + Zod for form validation

   - **Backend & Data Layer**:
     - Next.js API routes for backend endpoints
     - Prisma ORM for database operations
     - Supabase for:
       - PostgreSQL database (documents, versions, categories)
       - Storage for document files
       - Authentication for document access control
     - OpenAI integration for document generation

   - **Data Models**:

     ```typescript
     // Document model
     model Document {
       id          String      @id @default(cuid())
       title       String
       type        String      // template, report, note
       content     String?     // For text-based documents
       fileUrl     String?     // For uploaded files
       projectId   String
       project     Project     @relation(fields: [projectId], references: [id])
       versions    Version[]
       createdBy   String      // userId
       createdAt   DateTime    @default(now())
       updatedAt   DateTime    @updatedAt
       metadata    Json?       // For additional document properties
     }

     // Version model
     model Version {
       id          String    @id @default(cuid())
       documentId  String
       document    Document  @relation(fields: [documentId], references: [id])
       version     Int
       content     String?
       fileUrl     String?
       createdBy   String    // userId
       createdAt   DateTime  @default(now())
     }

     // DocumentPermission model
     model DocumentPermission {
       id          String    @id @default(cuid())
       documentId  String
       document    Document  @relation(fields: [documentId], references: [id])
       userId      String
       permission  String    // view, edit, admin
       createdAt   DateTime  @default(now())
     }
     ```

   - **API Routes**:

     ```typescript
     // Document endpoints
     POST /api/documents           // Create/upload document
     GET /api/documents           // List documents
     GET /api/documents/{id}      // Get document details
     PUT /api/documents/{id}      // Update document
     DELETE /api/documents/{id}   // Delete document

     // Version endpoints
     POST /api/documents/{id}/versions    // Create new version
     GET /api/documents/{id}/versions     // List versions

     // AI Generation endpoints
     POST /api/documents/generate         // Generate document from voice
     POST /api/documents/transcribe       // Transcribe voice to text

     // Search endpoints
     GET /api/documents/search            // Search documents
     ```

   - **State Management**:
     - Zustand store for local document state
     - React Query for server state and caching
     - Optimistic updates for document operations

   - **File Storage**:
     - Supabase Storage for document files
     - Organized bucket structure by project/document type
     - File type validation and virus scanning
     - Automatic file metadata extraction
     - Secure access control through RLS
     - Efficient file compression
     - Thumbnail generation for previews

   - **AI Integration**:
     - OpenAI Whisper for voice transcription
     - OpenAI GPT-4 for document generation
     - Context-aware document suggestions

   - **Search Implementation**:
     - Full-text search using Supabase's text search capabilities
     - Search across document titles and content
     - Metadata-based filtering (type, project, date)
     - Permission-aware search results
     - Cached recent searches
     - Search analytics for improving results

7. **Dependencies & Constraints**
   - Relies on **Authentication & User Management (Epic 5)** for access control.
   - May depend on a **cloud storage** solution for large or complex documents.
   - Voice commands rely on **AI Assistant (Epic 4)** for transcription and generation logic.

8. **Priority & Effort**
   - **Priority**: P1 – Must Have (Documentation is essential for any construction project).
   - **Effort**: Medium-High
     - ~2–3 weeks for core document storage, AI integration, and search functionality.

9. **Open Questions**
   - Which **AI engine** or library will handle voice transcription (in-house or third-party)?
     - We will use OpenAI Whisper for voice transcription.
   - Is **real-time collaboration** on documents (simultaneous editing) necessary, or is a simple check-in/check-out sufficient?
     - Yes, we will need real-time collaboration on documents.
   - Do we need specialized **PDF annotation** within the platform, or can that wait?
     - This can wait until we have a more robust PDF viewer.

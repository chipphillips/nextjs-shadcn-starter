# Epic 4: AI Assistant (Max)

1. **Feature Name**
   - **AI Assistant (Max)**

2. **Purpose & Value**
   - Enables hands-free management of tasks, document generation, and project updates via voice commands, increasing efficiency for users in the field.
   - Solves the issue of manual data entry and facilitates quick access to information while on the go.

3. **User Story**
   > As a builder, I want to use voice commands to manage tasks and generate documents, so that I can focus on supervising my projects instead of administrative tasks.

4. **Key Actions & User Flow**
   1. **Open chat drawer** from left side of screen
   2. **Start new chat** with optional project and document type selection
   3. **Speak or type commands** to interact with Max
   4. **Review and manage** chat history
   5. **Generate and edit** documents in real-time

5. **Acceptance Criteria**
   - **Sub-feature 4.1: Chat Interface**
     - Chat drawer slides in/out from left side
     - "New Chat" button at top of drawer
     - Project selector dropdown below new chat button
     - Document type selector below project dropdown
     - Chat history list shows:
       - Chat title (auto-generated from content)
       - Associated project (if any)
       - Document type (if any)
       - Last message preview
       - Timestamp
     - Active chat displays in main content area
     - Context selections can be changed mid-conversation
     - Chat history is searchable

   - **Sub-feature 4.2: Voice Interaction**
     - The system transcribes voice commands with at least 95% accuracy under typical conditions.
     - Users can review and edit transcriptions before submission.
     - The system processes natural language commands to perform actions (e.g., create a task).
     - Multiple accents and languages (if applicable) are supported.
     - A history of recent commands is accessible for review.

   - **Sub-feature 4.3: Document Generation**
     - Users can generate at least one document type (e.g., report, note) using voice input.
     - The system auto-populates relevant project details into generated documents.
     - Users can save, edit, and export AI-generated documents.
     - Errors in voice commands prompt the system to request clarification.
     - Generated documents are immediately accessible in the project’s document repository.

   - **Sub-feature 4.5: Information Retrieval**
     - Users can ask Max for project status updates, task statuses, or team assignments.
     - Responses are delivered in under 5 seconds for common queries.
     - The system displays retrieved information in text and/or voice format.
     - Users can request updates or clarification if the initial response is insufficient.
     - Max integrates project context (e.g., deadlines, milestones) into its responses.

6. **Technical Notes / Implementation Details**
   - **Frontend Stack**:
     - Next.js 14 with App Router for routing and server components
     - React 18 for UI components
     - TypeScript for type safety
     - Tailwind CSS & shadcn/ui for UI components and styling
     - Zustand for assistant state management
     - React Query for server state and caching
     - Vercel AI SDK 4.0 for:
       - Streaming chat interface
       - Voice transcription
       - Real-time document generation
       - Chat history management

   - **Backend & Data Layer**:
     - Next.js API routes for backend endpoints
     - Prisma ORM for database operations
     - Supabase for:
       - PostgreSQL database (conversations, commands)
       - Authentication for user context
     - OpenAI integration:
       - Whisper API for voice transcription
       - GPT-4 for natural language understanding
       - Assistants API for specialized construction workflows

   - **Data Models**:

     ```typescript
     // Conversation model
     model Conversation {
       id          String      @id @default(cuid())
       userId      String
       projectId   String?
       project     Project?    @relation(fields: [projectId], references: [id])
       messages    Message[]
       createdAt   DateTime    @default(now())
       updatedAt   DateTime    @updatedAt
     }

     // Message model
     model Message {
       id              String        @id @default(cuid())
       conversationId  String
       conversation    Conversation  @relation(fields: [conversationId], references: [id])
       role           String        // user, assistant
       content        String
       transcription  String?       // For voice messages
       createdAt      DateTime      @default(now())
     }

     // Command model
     model Command {
       id          String    @id @default(cuid())
       userId      String
       command     String    // The original voice command
       intent      String    // Classified intent (create_task, generate_report, etc.)
       parameters  Json      // Extracted parameters
       status      String    // pending, processed, failed
       result      Json?     // Result of command execution
       createdAt   DateTime  @default(now())
     }
     ```

   - **API Routes**:

     ```typescript
     // Voice processing endpoints
     POST /api/assistant/voice          // Process voice command
     POST /api/assistant/transcribe     // Transcribe voice to text

     // Command endpoints
     POST /api/assistant/command        // Execute command
     GET /api/assistant/command/{id}    // Get command status

     // Conversation endpoints
     POST /api/assistant/chat           // Send message to assistant
     GET /api/assistant/conversations   // List conversations
     GET /api/assistant/context         // Get project context
     ```

   - **State Management**:
     - Zustand store for assistant state and preferences
     - React Query for conversation history
     - Streaming state management via Vercel AI SDK

   - **UI Components**:
     - Chat Drawer:
       - Slide-out animation using Framer Motion
       - Responsive design (full height, adjustable width)
       - Sticky header with action buttons
       - Scrollable chat history
       - Context selectors with search
     - Chat Interface:
       - Message bubbles with role indicators
       - Voice input button with status
       - Real-time streaming responses
       - Document preview panel
       - Context display banner
     - Voice recording interface with feedback
     - Streaming chat interface (Vercel AI SDK)
     - Command confirmation dialogs
     - Context display components
     - Error handling and retry UI

   - **AI Integration**:
     - OpenAI Whisper for voice transcription
     - GPT-4 for:
       - Natural language understanding
       - Command parsing
       - Response generation
     - OpenAI Assistants API for:
       - Construction domain expertise
       - Document generation
       - Project context awareness

   - **Voice Processing Pipeline**:
     - Real-time audio capture
     - Noise reduction and preprocessing
     - Streaming transcription
     - Intent classification
     - Parameter extraction
     - Command execution
     - Response generation

   - **Context Management**:
     - Project details integration
     - User preferences and history
     - Previous conversations
     - Access control and permissions

7. **Dependencies & Constraints**
   - Relies on **Task Management (Epic 2)** and **Document Management (Epic 3)** to create tasks and generate documents.
   - Depends on **User Management (Epic 5)** for user-specific or role-based responses.
   - May need specialized hardware if used in noisy construction environments (e.g., noise-canceling devices).

8. **Priority & Effort**
   - **Priority**: P2 – High Value (But can be staged after basic project/task/document features are stable).
   - **Effort**: High
     - ~3–4 weeks for robust voice processing, AI integration, and testing in real-world environments.

9. **Open Questions**
   - Will Max support **multi-lingual** capabilities from the start or only English for MVP?
     - We will only support English for MVP. We will need to support multiple languages in the future. Spanish is the most important.
   - How do we handle **voice data retention** and privacy (store transcripts or discard them after processing)?
     - We will store the transcripts in the database.
   - Is there a need for **custom voice commands** or “wake words” like “Hey Max”?
     - Yes, we will need to support custom voice commands. "Hey Max" is a good default.

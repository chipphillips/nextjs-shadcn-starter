# Constructiv AI – Unified Requirements Documentation

> **Purpose**  
> This document serves as the single source of truth for the Constructiv AI platform requirements, combining core functional requirements, technical specifications, and user stories. All requirements align with the platform's goal of streamlining construction management processes through AI-powered tools.

---

## 1. Functional Requirements

### Authentication & User Management (AUTH)

- **FR-AUTH-1**: Implement email-based passwordless authentication using magic links via Supabase Auth
- **FR-AUTH-2**: Provide role-based access control with custom permissions and Row Level Security (RLS)
- **FR-AUTH-3**: Track user activity and maintain comprehensive audit logs
- **FR-AUTH-4**: Enable secure access to projects, tasks, tools, and company information
- **FR-AUTH-5**: Support session management with secure token handling

### AI Assistant Integration (AI)

- **FR-AI-1**: Voice-to-text transcription using OpenAI Whisper with <10s response time
- **FR-AI-2**: Context-aware chat interface with project-specific conversations (Vercel AI SDK 4.0)
- **FR-AI-3**: Real-time streaming responses with typing indicators
- **FR-AI-4**: Automated documentation generation from voice commands
- **FR-AI-5**: Template population with project data
- **FR-AI-6**: Conversation history and semantic search
- **FR-AI-7**: Context retention across sessions
- **FR-AI-8**: OCR workflow for handwritten/image-based notes

### Project Management (PM)

- **FR-PM-1**: Project CRUD operations with essential fields (name, address, schedule)
- **FR-PM-2**: Multiple view modes (Grid, List, Kanban)
- **FR-PM-3**: Project status tracking and milestone management
- **FR-PM-4**: Budget and timeline oversight
- **FR-PM-5**: Real-time collaboration on shared data
- **FR-PM-6**: Presence indicators for active collaborators

### Task Management (TM)

- **FR-TM-1**: Task creation, assignment, and status tracking
- **FR-TM-2**: Task dependencies and sub-tasks
- **FR-TM-3**: Multiple views (timeline, kanban, list, calendar, gantt)
- **FR-TM-4**: Task grouping into processes
- **FR-TM-5**: Priority levels and due date management
- **FR-TM-6**: AI-assisted task review and approval

### Document Management (DOC)

- **FR-DOC-1**: Support for construction documents, project reports, and field notes
- **FR-DOC-2**: Version-controlled template system with AI-powered matching
- **FR-DOC-3**: Image processing with AI-powered text extraction
- **FR-DOC-4**: AI document classification (95% accuracy)
- **FR-DOC-5**: Mobile-optimized document handling
- **FR-DOC-6**: Hierarchical organization with permissions
- **FR-DOC-7**: Comprehensive audit trail and retention policies

### Real-Time Features (RT)

- **FR-RT-1**: Live collaboration on shared data via Supabase Realtime
- **FR-RT-2**: Real-time updates for tasks and documents
- **FR-RT-3**: Presence indicators for collaborative features
- **FR-RT-4**: Offline data sync capabilities

### UI/UX Requirements (UI)

- **FR-UI-1**: Implement Roadmap UI components
- **FR-UI-2**: Use shadcn/ui for consistent design
- **FR-UI-3**: Responsive design with Tailwind CSS
- **FR-UI-4**: Drag-and-drop functionality
- **FR-UI-5**: Multiple view options
- **FR-UI-6**: Real-time notifications
- **FR-UI-7**: Dark/light mode support

## 2. Non-Functional Requirements

### Performance (PERF)

- **NFR-PERF-1**: Voice transcription response within 10 seconds
- **NFR-PERF-2**: Document generation within 5-10 seconds
- **NFR-PERF-3**: 99% system uptime during MVP
- **NFR-PERF-4**: Support for 500 concurrent users
- **NFR-PERF-5**: Database query optimization for large datasets

### Security (SEC)

- **NFR-SEC-1**: HTTPS communication with SSL/TLS
- **NFR-SEC-2**: Data encryption at rest and in transit
- **NFR-SEC-3**: Secure session management
- **NFR-SEC-4**: Row Level Security in Supabase
- **NFR-SEC-5**: Regular security audits

### Scalability (SCAL)

- **NFR-SCAL-1**: Support initial MVP user load (<50 users)
- **NFR-SCAL-2**: Scalable architecture for growth
- **NFR-SCAL-3**: Modular microservices framework
- **NFR-SCAL-4**: Efficient resource utilization

### Mobile Experience (MOB)

- **NFR-MOB-1**: Native-like mobile experience
- **NFR-MOB-2**: Offline capabilities
- **NFR-MOB-3**: Push notifications
- **NFR-MOB-4**: Touch-optimized UI
- **NFR-MOB-5**: Efficient data sync

### Reliability & Maintenance (REL)

- **NFR-REL-1**: Graceful degradation during service outages
- **NFR-REL-2**: Comprehensive error logging
- **NFR-REL-3**: Automated testing (>70% coverage)
- **NFR-REL-4**: Regular backup procedures

## 3. User Stories

### Site Engineer

- **US-SE-1**: Voice recording to daily log conversion
- **US-SE-2**: AI-assisted clarification for incomplete notes
- **US-SE-3**: Offline access to critical documents

### Project Manager

- **US-PM-1**: Real-time project progress tracking
- **US-PM-2**: Quick document search and retrieval
- **US-PM-3**: Task and resource management

### Office Admin

- **US-OA-1**: Digital conversion of paper documents
- **US-OA-2**: Automated report generation
- **US-OA-3**: Document organization and retrieval

### Field Subcontractor

- **US-FS-1**: Simple magic-link authentication
- **US-FS-2**: Real-time task notifications
- **US-FS-3**: Mobile-optimized data entry

## 4. Conflict Resolutions

1. **Authentication Method**
   - *Conflict*: Core requirements specified only magic links, while SRD suggested multiple options
   - *Resolution*: Implement magic links for MVP, document OAuth as future enhancement

2. **AI Integration**
   - *Conflict*: Specific AI provider requirements vs. provider-agnostic approach
   - *Resolution*: Use OpenAI for MVP with abstracted AI layer for future provider flexibility

3. **Offline Capabilities**
   - *Conflict*: Priority level discrepancy between documents
   - *Resolution*: Implement as core feature for MVP based on user stories

4. **Document Management**
   - *Conflict*: Varying retention requirements
   - *Resolution*: Implement 30-day minimum with configurable extension

## 5. Implementation Notes

1. Follow [project timeline](project-timeline.md) for phased deployment
2. Reference [platform architecture](platform-architecture.md) for technical details
3. Adhere to [project scope](project-scope-document.md) guidelines

Last Updated: February 13, 2024

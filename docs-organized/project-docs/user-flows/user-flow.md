# User Flows

## Overview

Key user flows for the Constructiv AI platform MVP, organized by feature area.

## 1. Authentication & Onboarding

```mermaid
graph TD
    A[Landing Page] --> B{Has Account?}
    B -->|No| C[Sign Up]
    B -->|Yes| D[Login]
    C --> E[Create Profile]
    D --> F[Dashboard]
    E --> F
```

## 2. Project Management

```mermaid
graph TD
    A[Dashboard] --> B[Create Project]
    A --> C[View Projects]
    C --> D[Select Project]
    D --> E[Project Dashboard]
    E --> F[Manage Team]
    E --> G[View Tasks]
    E --> H[View Documents]
    E --> I[Project Settings]
```

## 3. Task Management

```mermaid
graph TD
    A[Project Dashboard] --> B[Task List]
    B --> C[Create Task]
    B --> D[View Task]
    D --> E[Update Status]
    D --> F[Add Comments]
    D --> G[Link Documents]
    C --> H[Create Process]
    H --> I[Save as Template]
```

## 4. Document Management

```mermaid
graph TD
    A[Project Dashboard] --> B[Documents]
    B --> C[Upload Document]
    B --> D[Generate Document]
    D --> E[Voice Input]
    D --> F[Select Template]
    E --> G[Review & Edit]
    F --> G
    G --> H[Approve/Reject]
```

## 5. Daily Log Creation

```mermaid
graph TD
    subgraph Manual["Manual Entry"]
        M1[Document Generation] --> M2[Select Daily Report Template]
        M2 --> M3[Fill Form]
        M3 --> Review
    end

    subgraph AI["Max AI Flow"]
        A1[Quick Action: Daily Report] --> A2[Start Voice Recording]
        A2 --> A3[Transcribe Audio]
        A3 --> A4[Send to Max]
        A4 --> A5[Analyze Content]
        A5 --> A6[Stream Clarity Component]
        A6 --> A7[User Answers Yes/No]
        A7 --> A8[Submit Clarity Data]
        A8 --> A9[Generate Report]
    end

    subgraph Processing["Report Processing"]
        Review[Review Component] --> Edit[Edit if needed]
        Edit --> Submit[Submit Report]
        Submit --> DB[Store in Supabase]
        DB --> PDF[Generate PDF]
        DB --> Project[Update Project Page]
    end

    A9 --> Review
```

### Daily Log States & Components

```mermaid
stateDiagram-v2
    [*] --> Recording: Click Quick Action
    Recording --> Transcription: Complete Recording
    Transcription --> ClarityCheck: Send to Max
    
    state ClarityCheck {
        [*] --> Questions
        Questions --> UserResponse
        UserResponse --> MoreQuestions: Need Clarity
        MoreQuestions --> UserResponse
        UserResponse --> [*]: All Clear
    }
    
    ClarityCheck --> ReportPreview: Generate Report
    ReportPreview --> Editing: Need Changes
    Editing --> ReportPreview
    ReportPreview --> Submission: Approve
    Submission --> [*]: Complete

    state ReportPreview {
        [*] --> MobileModal
        MobileModal --> FullScreen
        FullScreen --> MobileModal
    }
```

### Daily Log Components

```mermaid
graph TB
    subgraph UI["UI Components"]
        QB["Quick Action Button"]
        VC["Voice Recording Component"]
        CC["Clarity Component"]
        RC["Report Preview Component"]
        
        subgraph Clarity["Clarity Component"]
            Q["Questions Stream"]
            YN["Yes/No Buttons"]
            Submit["Submit Button"]
        end
        
        subgraph Preview["Report Preview"]
            View["Document View"]
            Edit["Edit Controls"]
            FS["Full Screen Toggle"]
            Save["Submit Button"]
        end
    end
```

### Daily Log Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant M as Max AI
    participant DB as Supabase
    participant S as Storage
    participant R as RAG System

    U->>M: Voice Recording
    M->>M: Transcribe
    M->>M: Analyze Content
    M-->>U: Stream Clarity Component
    U->>M: Yes/No Answers
    M->>M: Generate Report
    M-->>U: Stream Report Preview
    U->>M: Approve Report
    
    par Document Processing
        M->>DB: Store Report Data
        M->>S: Generate & Store PDF
        M->>R: Process & Chunk Document
    end
    
    DB-->>U: Update UI
    S-->>U: PDF Available
    U->>M: Feedback (👍/👎)
    M->>DB: Store User Preferences
```

### Document Organization & Learning

```mermaid
graph TB
    subgraph ProjectDocs["Project Documents"]
        direction TB
        
        subgraph AI["AI Generated"]
            Reports["Reports"]
            Templates["Templates"]
            Custom["Custom Docs"]
        end
        
        subgraph User["User Uploaded"]
            Uploads["Uploads"]
            Scans["Scanned Docs"]
            Photos["Site Photos"]
        end
        
        subgraph Processing["Document Processing"]
            Input["New Document"] --> Chunk["Chunk Content"]
            Chunk --> Index["Index for RAG"]
            Index --> Store["Store in Vector DB"]
        end
        
        subgraph Learning["AI Learning System"]
            Feedback["User Feedback"] --> Prefs["Update Preferences"]
            Prefs --> Context["Enrich Context"]
            Context --> Future["Future Generations"]
        end
    end
```

### AI Document Generation Pattern

```mermaid
stateDiagram-v2
    [*] --> InitialInput: Voice/Text/Template
    InitialInput --> Analysis: Send to Max
    Analysis --> ClarityCheck: Need More Info
    
    state ClarityCheck {
        [*] --> Questions: Stream Questions
        Questions --> Response: Yes/No Answers
        Response --> AdditionalQuestions: If Needed
        AdditionalQuestions --> Response
        Response --> [*]: All Clear
    }
    
    ClarityCheck --> Generation: Generate Document
    Generation --> Review: Stream Preview
    
    state Review {
        [*] --> DocumentPreview
        DocumentPreview --> Edit: Need Changes
        Edit --> DocumentPreview
        DocumentPreview --> Feedback: Submit
    }
    
    Review --> Processing: Approve
    
    state Processing {
        [*] --> SaveData: Store in Supabase
        SaveData --> GeneratePDF
        GeneratePDF --> ChunkRAG: Process for RAG
        ChunkRAG --> Organize: File in Project
    }
    
    Processing --> Feedback: Complete
    Feedback --> [*]: Store Preferences
```

### Document Management Features

```mermaid
graph TB
    subgraph Management["Document Management"]
        direction TB
        
        subgraph Organization["Organization"]
            Auto["Automatic Filing"]
            Categories["Smart Categories"]
            Tags["AI Tagging"]
        end
        
        subgraph Learning["Learning System"]
            Feed["User Feedback"]
            Pref["Preference Storage"]
            Adapt["Adaptive Templates"]
        end
        
        subgraph Access["Accessibility"]
            Mobile["Mobile Optimized"]
            Search["Full-text Search"]
            Filter["Smart Filters"]
        end
        
        subgraph Processing["Processing"]
            RAG["RAG Processing"]
            Vector["Vector Storage"]
            Context["Context Building"]
        end
    end
```

## 6. AI Assistant Interaction

```mermaid
graph TD
    A[Any Page] --> B[Open Chat]
    B --> C[Select Project Context]
    B --> D[Select Document Type]
    C --> E[Voice Command]
    D --> E
    E --> F[AI Processing]
    F --> G[Review Output]
    G --> H[Save/Edit Result]
```

## Key User Stories

### Project Manager

1. Create new construction project
2. Invite team members
3. Set up project timeline
4. Monitor task progress
5. Review and approve documents

### Team Member

1. View assigned tasks
2. Update task status
3. Generate field reports
4. Upload site photos
5. Collaborate on documents

### Admin

1. Manage user permissions
2. Create document templates
3. Monitor system usage
4. Configure AI settings
5. Generate reports

## User Interface States

### Loading States

- Skeleton loaders for lists
- Progress indicators for uploads
- Streaming indicators for AI generation

### Error States

- Network connectivity issues
- Permission denied messages
- Validation error displays
- AI processing failures

### Success States

- Task completion notifications
- Document approval confirmations
- Save/update confirmations
- AI generation completion

## Accessibility Considerations

- Voice command alternatives
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Mobile responsiveness

```

# System Architecture

## Overview

The Constructiv AI platform follows a modern serverless architecture, leveraging Next.js for both frontend and backend, Supabase for data storage and authentication, and OpenAI for AI capabilities.

## Core MVP Features

```mermaid
graph TB
    subgraph MVP["MVP Core Features"]
        direction TB
        
        subgraph PM["Epic 1: Project Management"]
            PM1["Project Creation & Setup"]
            PM2["Project Tracking"]
            PM3["Resource Management"]
        end

        subgraph TM["Epic 2: Task Management"]
            TM1["Task Creation"]
            TM2["Process Templates"]
            TM3["Task Dependencies"]
            TM4["Process Management"]
        end

        subgraph DM["Epic 3: Document Management"]
            DM1["AI Document Generation"]
            DM2["Document Types & Templates"]
            DM3["Access Control"]
            DM4["Search & Retrieval"]
        end

        subgraph AI["Epic 4: AI Assistant (Max)"]
            AI1["Voice Interaction"]
            AI2["Project Context Awareness"]
            AI3["Document Generation"]
            AI4["Task Management"]
        end

        subgraph AUTH["Epic 5: Authentication"]
            AUTH1["User Authentication"]
            AUTH2["User Profiles"]
            AUTH3["Access Control"]
            AUTH4["Activity Tracking"]
        end
    end
```

## System Layers

### 1. Presentation Layer (Frontend)

```mermaid
graph TB
    subgraph FE["Frontend Architecture"]
        direction TB
        
        FE1["Next.js 14"]
        FE2["React 18"]
        FE3["TypeScript"]
        FE4["Tailwind & shadcn/ui"]
        
        subgraph VIEWS["Core Views"]
            V1["Project Views"]
            V2["Document Views"]
            V3["Task Views"]
            V4["AI Assistant"]
        end
        
        subgraph STATE["State Management"]
            S1["Zustand"]
            S2["React Query"]
            S3["Form State"]
        end
    end
```

### 2. Application Layer (Backend)

```mermaid
graph TB
    subgraph BE["Backend Architecture"]
        direction TB
        
        BE1["Next.js API Routes"]
        BE2["Prisma ORM"]
        BE3["Supabase"]
        BE4["OpenAI Integration"]
        
        subgraph SERVICES["Core Services"]
            S1["Authentication"]
            S2["Project Management"]
            S3["Document Service"]
            S4["Task Management"]
            S5["AI Assistant"]
        end
        
        subgraph SECURITY["Security"]
            SEC1["JWT Auth"]
            SEC2["RLS"]
            SEC3["Input Validation"]
        end
    end
```

### 3. Data Layer

```mermaid
graph TB
    subgraph DATA["Data Architecture"]
        direction TB
        
        DB1["PostgreSQL (Supabase)"]
        DB2["Prisma Schema"]
        DB3["File Storage"]
        DB4["Real-time Subscriptions"]
        
        subgraph MODELS["Data Models"]
            M1["Users & Auth"]
            M2["Projects & Tasks"]
            M3["Documents"]
            M4["AI Context"]
        end
        
        subgraph ACCESS["Data Access"]
            A1["Row Level Security"]
            A2["Prisma Queries"]
            A3["Real-time Updates"]
        end
    end
```

## File Structure

```mermaid
graph TB
    subgraph FS["Project Structure"]
        direction TB
        
        subgraph APP["App (Routes)"]
            A1["Dashboard"]
            A2["Projects"]
            A3["Tasks"]
            A4["Documents"]
            A5["Auth"]
            A6["API"]
        end
        
        subgraph COMP["Components"]
            C1["Core UI"]
            C2["Features"]
            C3["Layouts"]
        end
        
        subgraph LIB["Library"]
            L1["Config"]
            L2["Utils"]
            L3["Hooks"]
        end
        
        subgraph DB["Database"]
            D1["Prisma Schema"]
            D2["Migrations"]
            D3["Seeds"]
        end
    end
```

## System Interactions

### 1. Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Service
    participant Database
    
    Client->>API: HTTP Request
    API->>Service: Process Request
    Service->>Database: Data Operation
    Database-->>Service: Response
    Service-->>API: Processed Result
    API-->>Client: HTTP Response
```

### 2. Real-time Flow

```mermaid
sequenceDiagram
    participant Client
    participant Supabase
    participant Database
    
    Client->>Supabase: Subscribe to changes
    Database->>Supabase: Data change
    Supabase-->>Client: Real-time update
```

## Security Architecture

### 1. Authentication Flow

- Magic link email verification
- JWT token issuance
- Secure session management

### 2. Authorization

- Row Level Security (RLS)
- Role-based permissions
- API endpoint protection

### 3. Data Protection

- Encrypted storage
- Secure file handling
- Input validation

## Future Features & Expansion

```mermaid
graph TB
    subgraph FUTURE["Future Features"]
        direction TB
        
        subgraph ANA["Analytics & Reporting"]
            ANA1["Custom Reports"]
            ANA2["Interactive Dashboards"]
            ANA3["Predictive Analytics"]
            ANA4["Financial Forecasting"]
        end

        subgraph CRM["CRM & Client Management"]
            CRM1["Client Portal"]
            CRM2["Lead Tracking"]
            CRM3["Contract Management"]
            CRM4["Client Communication"]
        end

        subgraph RES["Resource Management"]
            RES1["Equipment Tracking"]
            RES2["Material Management"]
            RES3["Supplier Management"]
            RES4["Procurement Automation"]
        end
    end
```

## Implementation Timeline

```mermaid
gantt
    title Implementation Phases
    dateFormat  YYYY-MM-DD
    
    section MVP
    Core Features           :2025-01-01, 3M
    Basic AI Integration    :2025-01-01, 3M
    Essential Project Mgmt  :2025-01-01, 3M
    
    section Phase 2
    Enhanced AI            :2025-04-01, 6M
    Advanced Documents     :2025-04-01, 6M
    Mobile Development     :2025-04-01, 6M
    
    section Phase 3
    Analytics             :2025-10-01, 3M
    Advanced Collaboration :2025-10-01, 3M
    CRM Integration       :2025-10-01, 3M
```

## Performance & Monitoring

### 1. Performance Metrics

- API response times
- Database query performance
- Storage usage

### 2. Error Tracking

- Error rates
- API failures
- Authentication issues

### 3. Usage Analytics

- User activity
- Feature usage
- Resource consumption

## Development Workflow

### 1. Local Development

- Environment setup
- Database migrations
- Seed data

### 2. Deployment

- CI/CD pipeline
- Environment variables
- Database backups

### 3. Testing

- Unit testing
- Integration testing
- E2E testing

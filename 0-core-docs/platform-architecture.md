# Platform Architecture

```mermaid
flowchart TD
    %% Main Entry Point
    A[Landing Dashboard] --> B[Project Hub]
    A --> C[Max AI Assistant]
    A --> D[Document Center]
    A --> E[Task Management]
    A --> F[Settings & Admin]

    %% Project Hub Breakdown
    B --> B1[Active Projects]
    B --> B2[Project Templates]
    B --> B3[Resource Management]
    B1 --> B1a[Timeline View]
    B1 --> B1b[Kanban Board]
    B1 --> B1c[List View]
    B1 --> B1d[Enhanced Hierarchy and Navigation]

    %% Project Templates and Resources
    B2 --> B2a[Process Templates]
    B2 --> B2b[Project Templates]
    B3 --> B3a[Team Management]
    B3 --> B3b[Resource Allocation]

    %% Max AI Assistant Integration
    C --> C1[Voice Interface]
    C --> C2[Chat Interface]
    C --> C3[Document Generation]
    C --> C4[Context Engine]
    C1 --> C1a[Command Processing]
    C2 --> C2a[Natural Language Understanding]
    C3 --> C3a[Template Processing]
    C4 --> C4a[Project Context]
    C4 --> C4b[User Preferences]

    %% Document Center Structure
    D --> D1[AI Document Generation]
    D --> D2[Document Library]
    D --> D3[Search System]
    D1 --> D1a[New Document]
    D1 --> D1b[Templates]
    D1 --> D1c[Generation History]
    D2 --> D2a[Personal Documents]
    D2 --> D2b[Shared Documents]
    D2 --> D2c[Archive]

    %% Task Management System
    E --> E1[Personal Tasks]
    E --> E2[Team Tasks]
    E --> E3[Process Templates]
    E --> E4[Calendar View]
    E3 --> E3a[Create Template]
    E3 --> E3b[Apply Template]
    E3 --> E3c[Manage Templates]

    %% Settings & Administration
    F --> F1[User Profile]
    F --> F2[Team Settings]
    F --> F3[Integration Hub]
    F --> F4[System Preferences]
    F2 --> F2a[Member Management]
    F2 --> F2b[Roles & Permissions]
    F3 --> F3a[Third-party Apps]
    F3 --> F3b[API Connections]

    %% Cross-functional Connections
    C1 -.-> B1
    C1 -.-> E1
    C2 -.-> D1
    C3 -.-> D2
    C4 -.-> B

    %% Style Definitions
    classDef primary fill:#2563eb,stroke:#1e40af,stroke-width:2px,color:white
    classDef secondary fill:#3b82f6,stroke:#2563eb,stroke-width:1px,color:white
    classDef tertiary fill:#60a5fa,stroke:#3b82f6,stroke-width:1px,color:white

    %% Apply Styles
    class A,B,C,D,E,F primary
    class B1,B2,B3,C1,C2,C3,C4,D1,D2,D3,E1,E2,E3,E4,F1,F2,F3,F4 secondary
    class B1a,B1b,B1c,B2a,B2b,B3a,B3b,C1a,C2a,C3a,C4a,C4b,D1a,D1b,D1c,D2a,D2b,D2c,E3a,E3b,E3c,F2a,F2b,F3a,F3b tertiary

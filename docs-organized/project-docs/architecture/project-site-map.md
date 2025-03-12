# Project Site Map

## 1. Project Information

- **Project Title:** Constructiv AI - Max Platform
- **Client:** Constructiv AI (Internal Product)
- **Date:** January 31, 2025
- **Version:** 1.0

## 2. Overview

### Project Goals Reference

The site architecture supports Constructiv AI's core mission of reducing administrative workload by 50% through AI-powered automation, voice-driven interfaces, and seamless project management tools.

### Site Purpose

Provide a comprehensive, mobile-first construction management platform that enables users to efficiently manage projects, documents, and tasks through voice commands and AI assistance, specifically designed for small to midsize construction businesses.

## 3. Site Architecture

### Primary Navigation

```markdown
├── Dashboard
│   ├── Project Overview
│   ├── Recent Activities
│   └── Quick Actions
├── Projects
│   ├── Active Projects
│   │   ├── Timeline View
│   │   ├── Kanban View
│   │   └── List View
│   ├── Templates
│   │   ├── Process Templates
│   │   └── Project Templates
│   └── Resources
│       ├── Team Management
│       └── Resource Allocation
├── Tasks
│   ├── My Tasks
│   ├── Team Tasks
│   ├── Process Templates
│   │   ├── Create Template
│   │   ├── Apply Template
│   │   └── Manage Templates
│   └── Calendar View
├── Documents
│   ├── AI Generation
│   │   ├── New Document
│   │   ├── Templates
│   │   └── History
│   ├── Document Library
│   │   ├── My Documents
│   │   ├── Shared Documents
│   │   └── Archive
│   └── Search & Filter
├── Max (AI Assistant)
│   ├── Voice Commands
│   ├── Chat Interface
│   ├── Document Generation
│   └── Context Settings
└── Settings
    ├── Profile
    ├── Team Management
    ├── Integrations
    └── Preferences
```

### Page Details

#### Dashboard Page

- **Content Types:**
  - [ ] Project Status Cards
  - [ ] Task Priority Queue
  - [ ] Recent Documents
  - [ ] Team Activity Feed
- **Key Functions:**
  - Voice command activation
  - Quick project access
  - Real-time notifications
- **User Goals:**
  - Monitor project progress
  - Access priority tasks
  - Generate quick documents

#### Projects Section

- **Content Types:**
  - [ ] Project Kanban Boards
  - [ ] Gantt Charts
  - [ ] Resource Tables
  - [ ] Team Assignments
- **Key Functions:**
  - Project creation and management
  - Resource allocation
  - Timeline tracking
- **User Goals:**
  - Manage project lifecycle
  - Track team progress
  - Monitor resources

## 4. User Flows

### Primary User Journeys

| Journey Name | Start Point | Steps | End Point |
|-------------|-------------|-------|----------|
| Document Generation | Dashboard | 1. Activate Max<br>2. Voice Command<br>3. Review Draft | Generated Document |
| Project Creation | Projects | 1. New Project<br>2. Template Selection<br>3. Team Assignment | Project Dashboard |
| Task Management | Tasks | 1. Voice Command<br>2. Task Details<br>3. Assignment | Task Board |

### Critical Paths

- **Path 1:** Dashboard → Max → Voice Command → Document Generation
- **Path 2:** Projects → New Project → Process Template → Team Setup
- **Path 3:** Tasks → Voice Command → Task Creation → Assignment

## 5. Content Strategy

### Content Types Matrix

| Page Type | Content Elements | Media Types | Updates |
|-----------|-----------------|-------------|----------|
| Project Dashboard | Status, Timeline, Team | Charts, Tables | Real-time |
| Document Generator | Templates, Forms | PDFs, Docs | On-demand |
| Task Board | Cards, Lists | Kanban, Calendar | Dynamic |
| Max Interface | Voice Input, Chat | Audio, Text | Streaming |

### Dynamic Content Areas

- [ ] Project Status Updates
- [ ] Task Progress Tracking
- [ ] Document Generation Queue
- [ ] Team Activity Feed
- [ ] Voice Command History

## 6. Technical Considerations

### Navigation Components

- **Primary Menu:**
  - Voice-activated navigation with 95% accuracy
  - Mobile-optimized menu with touch-friendly targets
  - Context-aware breadcrumbs
  - Offline-capable navigation
- **Footer Menu:**
  - Quick links
  - Support access
  - Documentation
- **Utility Navigation:**
  - Search
  - Notifications
  - User settings

### Special Features

- [ ] Voice Command Interface
  - 95% accuracy in construction terminology
  - Real-time feedback
  - Noise-resistant processing
- [ ] Real-time Collaboration
  - Conflict resolution
  - Presence indicators
  - Change tracking
- [ ] Offline Support
  - Local data persistence
  - Background sync
  - Conflict resolution
- [ ] AI Document Processing
  - Template-based generation
  - Context-aware suggestions
  - Real-time preview
- [ ] Mobile-First Design
  - Progressive Web App (PWA)
  - Touch-optimized interface
  - Responsive layouts
  - Network-aware functionality
  - Device-specific optimizations

## 7. Implementation Notes

### Development Tools

- **Sitemap Creation:** Next.js 14 App Router
- **Prototyping:** v0 + shadcn/ui
- **Development:** TypeScript + React 18

### Best Practices Checklist

- [ ] Mobile-responsive navigation
- [ ] Voice-first interaction design
- [ ] Offline-first architecture
- [ ] Real-time sync capabilities
- [ ] Accessibility compliance

## 8. Review & Approval

### Stakeholder Review

- **Client Approval:** [Product Owner Name, Date]
- **Design Lead:** [Design Lead Name, Date]
- **Technical Lead:** [Tech Lead Name, Date]

### Version History

| Version | Date | Changes | Approved By |
|---------|------|---------|-------------|
| 1.0 | 2025-01-31 | Initial sitemap | |
| [Version] | | | |

---
*Note: This sitemap serves as a living document and may be updated as the project evolves. All changes should be tracked in the version history.*

# Product Requirements Document (PRD)

## Project Overview

Build a intuitive Ai Assistant driven construction management platform for small to midsize builders, that eliminates the manual, time-consuming administrative burdens of running a construction business by providing a voice-driven, AI-powered construction management platform that integrates seamlessly into existing workflows, centralizes information, and proactively delivers actionable insights. The Constructiv AI platform is designed to help forward-thinking builders run their construction business smoother, faster, and smarter-giving them more time to focus on growing their business, build their legacy, and get home sooner

This MVP aims to validate the core value proposition of Constructiv AI: allowing small-to-mid sized construction business owners and managers to generate project-specific construction documents and reports by using voice commands. The centerpiece is **Max**, an AI assistant that understands voice input, accesses basic project context, and produces completed documents (e.g., a standard contract) ready for download.

The Constructiv AI platform is a single source of truth for all construction related activities, thus reducing the need for multiple disconnected tools. The platform is designed to be modular and customizable, allowing for the addition of new tools and features as needed. Becuase of this, the platform enables users to reduce administrative workload by quickly generating standardized construction project documents, projectreports, and communication using voice commands, thus shortening the time spent on repetitive tasks, improving accuracy, and simplifying end user experiences.

Constructiv AI is well-positioned to address a significant gap in the construction technology market for small to midsize builders. By focusing on AI-powered administrative task automation, offering a flexible micro-services framework, and providing unique AI agent capabilities, the company can differentiate itself in a competitive landscape.

The modular approach to product development and deployment will allow Constructiv AI to quickly gain market traction while continually refining its offerings based on user feedback. By emphasizing ease of use, customization, and the power of AI to augment small teams, Constructiv AI can become an indispensable tool for its target market, driving efficiency and growth in the construction industry.

Overall Description: Constructiv AI provides an AI-powered, voice-driven assistant designed to streamline operations for small to midsize construction businesses. The flagship product, Max, transforms administrative tasks, project management, and communication processes into seamless, automated workflows. Constructiv AI is tailored for home builders and construction companies managing multiple projects, offering an intuitive solution to reduce inefficiencies and improve productivity in the construction sector.

## Tech stack

**Frontend & Backend:**  

- **Next.js 14 (App Router)**
- **React 18**  
- **TypeScript** for type safety  
- **Tailwind CSS** & **shadcn/ui** for styling/UI components
- **Zustand** for light state management
- **React Query** (@tanstack/react-query) for server data caching
- **React Hook Form + Zod** for form handling & validation
- **Stripe.js** (@stripe/stripe-js) for client-side checkout
- **Prisma** for ORM

**Data & Auth (Supabase):**  

- Postgres database for projects, documents, and user data
- Supabase Auth for user authentication (magic link)
- Storage for generated PDFs

**AI Services:**  

- **OpenAI Whisper** for voice-to-text transcription
- **OpenAI GPT-4 or GPT-3.5** for conversational responses and document drafting
- **Vercel AI SDK (latest version)** for streamlined AI integration, component rendering, and streaming responses
- **OpenAI Assistant** for advanced conversational capabilities

**CI/CD & Hosting:**  

- Hosted on Vercel  
- GitHub Actions for linting, testing, and basic CI  
- Sentry for error tracking (optional at MVP stage)

## Main Interface

### Mobile Responsiveness

- Native-like mobile experience
- Offline capabilities
- Push notifications
- Photo/document capture
- Mobile-specific UI optimizations
- Touch gestures

### Dynamic Dashboard

**Priority**: P2
**User Story**: As a builder/general contractor, I want a quick snapshot of where all my projects stand in the pre-construction phase, so I can prioritize my time and attention effectively.

**Core Features & Implementation Details of dashboard**:

1. Personalized Dashboard Interface
   - Time-based contextual greeting (Good Morning/Afternoon/Evening)
   - Personalized user name display (currently set as "Chip")
   - Grid-based responsive layout adapting to screen sizes
   - Mobile, tablet, and desktop view optimization
   - Expandable/collapsible sections with state management

2. Quick Action Center
   - Quick Report Generation:
     - Modal dialog interface
     - Project selection dropdown
     - Reference option selection
     - Report content text area
     - Voice input with recording controls
     - File attachments (image/camera/document upload)
     - Report generation button
   - New Project Creation:
     - Modal interface for project initialization
     - (Feature in development phase)

3. AI-Powered Insights
   - Collapsible insights card featuring:
     - Daily activity recaps
     - Meeting context summaries
     - Smart reminders
     - AI-generated suggestions
   - Integration with Max AI via getMaxResponse function
   - Toggle controls for insight visibility

4. Project Analytics & Metrics
   - Key Statistics Display:
     - Active Projects counter
     - Pending Tasks tracker
     - Recent Documents overview
     - Team Members count
   - Interactive metric cards with:
     - Distinctive icons
     - Clear titles
     - Numerical data
     - Section navigation links
   - Visual data representation through:
     - Project statistics
     - Task efficiency metrics
     - Performance indicators
     - Growth analysis charts
     - Project completion tracking

5. Project Management Tools
   - Active project visual overview
   - Real-time status updates
   - Project filtering system
   - Simplified tracking interface
   - Priority task highlighting
   - Recent activity monitoring

6. Technical Architecture
   - UI Components:
     - Custom shadcn/ui library integration
     - Lucide icon set implementation
   - Interactivity:
     - Client-side state management
     - Form submission handling
     - Button click processing
   - Accessibility Features:
     - Semantic HTML structure
     - Screen reader optimization
     - Proper form element labeling
     - ARIA compliance

7. Data Visualization
   - Analytics widgets
   - Performance dashboards
   - Task overview displays
   - Project progress indicators
   - Activity tracking visualizations

8. System Integration
   - Real-time data synchronization
   - Cross-component communication
   - State management system
   - API integration points
   - Event handling framework

All features are designed to provide a comprehensive, user-friendly interface that streamlines project management and enhances productivity for construction professionals.

## Core Functionalities

### 1. Authentication & User Session Management

- **Feature:** Simple email-based login (magic link or passwordless).
- **Why:** Ensure secure, controlled access to the platform.
- **Acceptance Criteria:**
  - User can sign in with their email and receive a magic link or code.
  - Once logged in, the user sees their dashboard with the voice interface and project data.
  - Role-based access control with custom permissions
  - User activity tracking and audit logs
  - Users can view their projects and tasks.
  - users can view their tools and their usage.
  - users can view their progress on their tasks.
  - users can view their reports and assessments.
  - users can view their company information.
  - users can view their job description.
  - users can view their standard operating procedures.
  - users can view their project proposals.
  - users can view their meeting minutes.
  - users can view their progress reports.
  - users can view their RFI's.

### 2. AI Assistant (Max) Basic Interaction

**Key Features**:

- Quick answers to common project questions
- Smart lookup of project-specific information
- Proactive reminders about important requirements
- Simple way to find documents and information
- Context-aware suggestions based on project phase
- **Feature:** A chat interface where the user can speak or type a prompt to Max.
- **Why:** Core to the solution—Max is the means of converting user voice commands into documents.
- **Acceptance Criteria:**
  - Users can record a short voice message (e.g., <1 min) and submit it.
  - The system transcribes the voice input to text and displays the transcribed text.
  - The user can review the transcription and confirm sending it to Max.
  - Max responds with a draft of the requested document text or requests missing information.
  - Max renders the document in a canvas component that can be downloaded as a PDF.
  - Max can render components like job reports, daily logs, quick notes, etc in the conversation thread allowing the user to review + submit + edit the documents as needed. (this is a key ux feature that will be used to generate custom documents and reports from the ai assistant)
  - Max can retrieve document templates with placeholders from the database based on the user request. (this is a key ux feature that will be used to generate custom documents and reports from the ai assistant)
  - Max can retrieve project data from the database to populate the document template with project specific information.
  - Context-aware chat interface
  - Project-specific conversations
  - Chat history
  - Conversation search
  - Real-time streaming responses
  - Automated documentation generation
  - Real-time construction guidance

### 3. Voice Input & Transcription (OpenAI Whisper) (Max will use this to transcribe the user's voice input)

- **Feature:** Integration with a speech-to-text model (e.g., OpenAI Whisper) to convert uploaded audio to text.
- **Why:** Enables voice-driven interaction, a unique selling point.
- **Acceptance Criteria:**
  - Users can record or upload a voice snippet.
  - The transcription is returned in under 10 seconds.
  - If transcription fails, the user is prompted to retry or type their request.

## Core Functionalities (project and task management)

### 4. Project Management

- **Feature:** A minimal project record with essential fields (project name, address, start date) accessible by Max.
- **Why:** Ensures generated documents are relevant and contain correct basic details.
- **Acceptance Criteria:**
  - Users can view or set simple project details (name, address, start date) in the dashboard.
  - Max can retrieve these details during document generation without prompting the user repeatedly.
  - Project CRUD operations
  - Multiple view modes (Grid, List, Kanban)
  - Project status tracking
  - Custom project thumbnails
  - Background color themes
  - Progress tracking
  - Milestone tracking and phase management
  - Budget and timeline oversight

### 5. Task Management

**Key Features**:

- Clear task checklist for each project phase
- Automatic task sequencing based on dependencies
- Progress tracking at a glance
- Simple task management without complexity
- Reminders for upcoming deadlines and requirements
- **Feature:** A task management system that allows the user to create, manage, and track tasks for a project.
- **Why:** Ensures generated documents are relevant and contain correct basic details.
- **Acceptance Criteria:**
  - Users can view or set simple project details (name, address, start date) in the dashboard.
  - Max can retrieve these details during document generation without prompting the user repeatedly.
  - Task can be created, edited, and deleted.
  - Task can be assigned to a user.
  - Task can be marked as complete.
  - Task can be filtered by project, user, status, etc.
  - Task can have dependencies on other tasks.
  - Task can have a due date.
  - Task can have a priority.
  - Task can have a status (not started, in progress, completed)
  - Task can have a type (pre-construction, construction, post-construction)
  - Task can have a status (not started, in progress, completed)
  - Task can submit a task to Max for review and approval.
  - Task can be sequenced based on dependencies.
  - Task can be tracked for progress.
  - Task can be tracked for completion.
  - Task can have sub-tasks.
  - Sub-tasks can be assigned to a user.
  - sub-task are displayed when a task card is clicked on the dashboard.
  - Task can be viewd in a timeline view.
  - task can be viewed in a kanban board view.
  - task can be viewed in a list view.
  - task can be viewed in a calendar view.
  - task can be viewed in a gantt chart view.
  - task will generally be project specific, but can be used for other purposes as well.
  - Task can be grouped into a process.
  - Task creation and assignment
  - Priority levels
  - Due dates
  - Status tracking (Pending, In Progress, Completed, Blocked)
  - Task dependencies
  - Kanban board view
  - Visual indicators for due dates

### 5. Document Template & Generation

- **Feature:** A predefined contract template stored in the system. Max takes the user’s instructions and project data to fill this template and produce a final draft.
- **Why:** Delivers tangible value—automatically generated documents reduce admin time.
- **Acceptance Criteria:**
  - At MVP launch, at least one standard template (e.g., a construction contract).
  - Max populates placeholders (e.g., project name, start date) with user-provided data.
  - Generated output is converted into a PDF stored in the system.
  - Automatic document generation
  - Version control
  - Document templates
  - File categorization
  - Search functionality
  - Preview capabilities
  - Integration with cloud storage
  - OCR for scanned documents
  - Batch upload/download
  - Document sharing permissions

### Document Management

#### Document Types and Features

1. **Construction Documents**
   - Contract templates and agreements
   - Change orders and proposals
   - Safety plans and checklists
   - Project handover documents
   - Warranty documentation
   - Version control with approval workflow
   - Template customization

2. **Project Reports**
   - Daily progress reports
   - Site inspection reports
   - Safety incident reports
   - Quality control reports
   - Resource utilization reports
   - Weather impact reports
   - Delay notifications
   - Budget status updates
   - Real-time streaming interface
   - Voice/image capture integration

3. **Field Notes**
   - Voice memos
   - Site observations
   - Meeting minutes
   - Task reminders
   - Issue documentation
   - Photo annotations
   - Location tagging
   - Time stamps
   - Project context linking

#### Image Capture & Processing

- Snap-and-process for handwritten notes
- AI-powered text extraction
- Smart document classification
- Automatic template matching
- Image thumbnail generation
- Original image preservation
- Multi-page support
- Image enhancement
- Batch processing

#### Mobile Integration

- Native camera integration
- Image optimization
- Offline queuing
- Background upload
- Real-time preview
- Edit before upload
- Multiple capture modes

#### Common Features

- Hierarchical organization
- Version control
- AI-assisted generation
- Full-text search
- Sharing capabilities
- Template management
- Mobile optimization
- Offline access
- Quick preview
- Export options
- Access control
- Audit trail

### 6. Document Storage & Download

- **Feature:** After generation, the PDF document is stored in the platform and available for user download.
- **Why:** The user needs to easily retrieve, print, or share the document.
- **Acceptance Criteria:**
  - The generated document can be accessed from the user’s dashboard.
  - The user can click “Download” to save it locally.

### 7. Smart Document Management

- **Feature:** AI-powered document classification using OpenAI API
- **Why:** The user needs to easily retrieve, print, or share the document.
- **Acceptance Criteria:**
  - Documents are automatically classified with 95% accuracy
  - Data is extracted from common document types
  - Version history is maintained
  - Documents are searchable by content
  - Templates can be created and modified
  - Real-time collaborative editing
  - Document search and filtering
  - Automatic document generation
  - Version control
  - Document templates
  - File categorization
  - Search functionality
  - Preview capabilities
  - Integration with popular cloud storage
  - OCR for scanned documents
  - Batch upload/download
  - Document sharing permissions

### Non-Functional Requirements

### Performance

- Voice transcription: response within **10 seconds** for a <1 min audio clip.
- Document generation: completed within **5-10 seconds** after user confirmation.

### Reliability & Uptime

- **99% uptime** during MVP testing.
- Graceful error handling if AI or transcription service is unavailable (prompt user to retry).

### Security & Privacy

- Secure login & sessions (HTTPS).
- Role-based access is not necessary for MVP (all authenticated users have the same basic permissions).
- Basic data encryption at rest and in transit.

### Scalability

- MVP expected user load: small pilot group (<50 users).
- Architecture ready for scaling but optimization not a priority at MVP stage.

---

### Success Metrics

1. **Time Saved:** Document generation reduces manual drafting time by at least 30% (measured via user feedback).
2. **User Adoption:** 80% of pilot users generate at least one document via voice within the first month.
3. **User Satisfaction:** 75% of users report a positive experience using the voice-to-document feature (measured via quick feedback surveys).

## Future Features

## Custom Functionality Documentation

### Next.js SEO

- [Next.js SEO](https://github.com/garmeeh/next-seo)

/**

- SEO Configuration for Constructiv AI
-
- Manages site-wide SEO settings including meta tags, OpenGraph, and Twitter cards.
- Configured specifically for construction industry targeting small to midsize builders.
-
- @packageDocumentation
- @module next-seo
 */

// Define types for OpenGraph images
interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

// Define types for OpenGraph video
interface OpenGraphVideo {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
  secureUrl?: string;
  description?: string;
  duration?: number;
  releaseDate?: string;
  actors?: Array<{
    profile: string;
    role?: string;
  }>;
  directors?: string[];
  writers?: string[];
  tags?: string[];
}

// Define types for OpenGraph profile
interface OpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

// Define types for OpenGraph book
interface OpenGraphBook {
  authors?: string[];
  isbn?: string;
  releaseDate?: string;
  tags?: string[];
}

// Define types for OpenGraph article
interface OpenGraphArticle {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

// Define types for Twitter card
interface TwitterCard {
  cardType?: string;
  site?: string;
  handle?: string;
}

// Define types for additional meta tags
interface AdditionalMetaTag {
  keyOverride?: string;
  content: string;
  property?: string;
  name?: string;
  httpEquiv?: string;
}

// Define types for additional link tags
interface AdditionalLinkTag {
  keyOverride?: string;
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
  as?: string;
  crossOrigin?: string;
}

// Define main SEO configuration interface
interface SEOConfig {
  titleTemplate?: string;
  title?: string;
  defaultTitle?: string;
  noindex?: boolean;
  nofollow?: boolean;
  robotsProps?: {
    nosnippet?: boolean;
    notranslate?: boolean;
    noimageindex?: boolean;
    noarchive?: boolean;
    maxSnippet?: number;
    maxImagePreview?: 'none' | 'standard' | 'large';
    maxVideoPreview?: number;
  };
  description?: string;
  canonical?: string;
  mobileAlternate?: {
    media: string;
    href: string;
  };
  languageAlternates?: Array<{
    hrefLang: string;
    href: string;
  }>;
  openGraph?: {
    url?: string;
    type?: string;
    title?: string;
    description?: string;
    images?: OpenGraphImage[];
    videos?: OpenGraphVideo[];
    locale?: string;
    site_name?: string;
    profile?: OpenGraphProfile;
    book?: OpenGraphBook;
    article?: OpenGraphArticle;
  };
  twitter?: TwitterCard;
  facebook?: {
    appId?: string;
  };
  additionalMetaTags?: AdditionalMetaTag[];
  additionalLinkTags?: AdditionalLinkTag[];
}

// Default SEO configuration
const defaultSEO: SEOConfig = {
  titleTemplate: '%s | Constructiv AI',
  defaultTitle: 'Constructiv AI - Smart Pre-Construction Management for Builders',
  description: 'AI-powered platform helping small to midsize builders streamline pre-construction planning, estimating, and project management. Purpose-built for construction companies managing 15-25 projects annually.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '<https://constructiv.ai/>',
    site_name: 'Constructiv AI',
    images: [
      {
        url: 'https://constructiv.ai/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Constructiv AI - Smart Pre-Construction Management Platform',
      }
    ],
    description: 'Streamline your construction planning with AI-powered tools for accurate estimating, efficient scheduling, and simplified project management.',
  },
  twitter: {
    handle: '@constructiv_ai',
    site: '@constructiv_ai',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'keywords',
      content: 'construction management, pre-construction planning, construction estimating, builder software, construction AI, project management, small builders, construction technology',
    },
    {
      name: 'application-name',
      content: 'Constructiv AI',
    }
  ]
};

export default defaultSEO;

</documentation>

### Next.js Sitemap

- [Next.js Sitemap](https://github.com/garmeeh/next-sitemap)

import { IConfig } from 'next-sitemap'

/** @type {import('next-sitemap').IConfig} */
const config: IConfig = {
  // Base URL of our website
  siteUrl: process.env.SITE_URL || '<https://constructiv.ai>',
  
  // Generate robots.txt file
  generateRobotsTxt: true,
  
  // Change frequency and priority
  changefreq: 'daily',
  priority: 0.7,
  
  // Split large sitemaps into multiple files
  sitemapSize: 5000,
  
  // Exclude paths from sitemap
  exclude: [
    '/api/*', // API routes
    '/dashboard/*', // Private dashboard pages
    '/auth/*' // Auth pages
  ],

  // Add alternate language versions
  alternateRefs: [
    {
      href: 'https://constructiv.ai',
      hreflang: 'en'
    }
  ],

  // Custom transform function
  transform: async (config, path) => {
    // Exclude dynamic routes from sitemap
    if (path.includes('[') || path.includes(']')) {
      return null
    }

    // Default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    }
  },

  // Add additional paths
  additionalPaths: async (config) => {
    const result = []

    // Add blog posts
    result.push({ 
      loc: '/blog',
      changefreq: 'weekly',
      priority: 0.8
    })

    // Add documentation pages
    result.push({
      loc: '/docs',
      changefreq: 'weekly', 
      priority: 0.8
    })

    return result
  },

  // Robots.txt options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api',
          '/auth',
          '/dashboard'
        ]
      }
    ],
    additionalSitemaps: [
      // Add any additional sitemaps here
      'https://constructiv.ai/server-sitemap.xml'
    ]
  }
}

export default config
</documentation>

## File Structure

[Insert file structure from Step 4 in [ai_based_project_instructions.md](ai_based_project_instructions.md) here]

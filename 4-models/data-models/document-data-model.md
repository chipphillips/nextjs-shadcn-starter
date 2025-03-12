# Document Data Model

## Overview

This document defines the document data model for the ConstructivAI platform, implemented using Supabase and TypeScript.

## TypeScript Interface

```typescript
enum DocumentType {
  // Construction Documents
  CHANGE_ORDER = 'change_order',
  QUALITY_CONTROL_CHECKLIST = 'quality_control_checklist',
  PROJECT_PROPOSAL = 'project_proposal',
  
  // Project Reports
  DELAY_NOTIFICATION = 'delay_notification',
  
  // Field Notes
  FIELD_NOTE = 'field_note'
}

interface Document {
  id: string;           // Primary key, UUID
  title: string;        // Document title
  type: DocumentType;   // Document type
  content?: string;     // Document content (for AI-generated/text docs)
  fileUrl?: string;     // File URL for uploaded documents
  fileType?: string;    // MIME type of uploaded file
  fileSize?: number;    // Size in bytes
  templateId?: string;  // Optional template reference
  projectId: string;    // Associated project
  createdBy: string;    // User who created the document
  status: 'draft' | 'published'; // Document status
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}

interface DocumentTemplate {
  id: string;           // Primary key, UUID
  type: DocumentType;   // Document type
  name: string;         // Template name
  content: string;      // Template content with placeholders
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}

interface DocumentTypePermission {
  id: string;           // Primary key, UUID
  userId: string;       // User ID
  documentType: DocumentType; // Document type
  createdBy: string;    // Admin who granted permission
  createdAt: Date;      // Creation timestamp
}

interface DocumentGenerationStream {
  id: string;           // Primary key, UUID
  documentId: string;   // Associated document
  content: string;      // Streamed content
  status: 'streaming' | 'completed' | 'error';
  createdAt: Date;      // Creation timestamp
}
```

## Supabase Schema

```sql
-- Document Types Enum
create type document_type as enum (
  'change_order',
  'quality_control_checklist',
  'project_proposal',
  'delay_notification',
  'field_note'
);

-- Documents Table
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  type document_type not null,
  content text,
  file_url text,
  file_type text,
  file_size bigint,
  template_id uuid references public.document_templates(id),
  project_id uuid references public.projects(id) not null,
  created_by uuid references auth.users(id) not null,
  status text not null check (status in ('draft', 'published')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'B')
  ) stored
);

-- Document Templates Table
create table public.document_templates (
  id uuid default uuid_generate_v4() primary key,
  type document_type not null,
  name text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Document Type Permissions Table
create table public.document_type_permissions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  document_type document_type not null,
  created_by uuid references auth.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, document_type)
);

-- Document Generation Streams Table
create table public.document_generation_streams (
  id uuid default uuid_generate_v4() primary key,
  document_id uuid references public.documents(id) not null,
  content text not null,
  status text not null check (status in ('streaming', 'completed', 'error')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS Policies
alter table public.documents enable row level security;
alter table public.document_templates enable row level security;
alter table public.document_type_permissions enable row level security;
alter table public.document_generation_streams enable row level security;

-- Document access policy
create policy "Users can view documents they have permission for"
  on public.documents for select
  using (
    exists (
      select 1 from public.document_type_permissions
      where user_id = auth.uid()
      and document_type = documents.type
    )
  );

-- Document creation policy
create policy "Users can create documents they have permission for"
  on public.documents for insert
  with check (
    exists (
      select 1 from public.document_type_permissions
      where user_id = auth.uid()
      and document_type = documents.type
    )
  );

-- Helper function to check document permissions
create function check_document_permission(p_user_id uuid, p_document_type document_type)
returns boolean as $$
begin
  return exists (
    select 1 from public.document_type_permissions
    where user_id = p_user_id
    and document_type = p_document_type
  );
end;
$$ language plpgsql security definer;

-- Add search index
create index idx_documents_search on public.documents using gin(search_vector);

-- Add composite indexes for filtering
create index idx_documents_type_date on public.documents (type, created_at desc);
create index idx_documents_project_date on public.documents (project_id, created_at desc);

-- Add search helper function
create function search_documents(
  p_query text,
  p_type document_type[] default null,
  p_project_id uuid default null,
  p_date_start timestamp with time zone default null,
  p_date_end timestamp with time zone default null
) returns table (
  id uuid,
  title text,
  type document_type,
  project_id uuid,
  created_by uuid,
  created_at timestamp with time zone,
  status text,
  rank real
) as $$
begin
  return query
  select
    d.id,
    d.title,
    d.type,
    d.project_id,
    d.created_by,
    d.created_at,
    d.status,
    ts_rank(d.search_vector, websearch_to_tsquery('english', p_query)) as rank
  from public.documents d
  where
    (p_query is null or d.search_vector @@ websearch_to_tsquery('english', p_query))
    and (p_type is null or d.type = any(p_type))
    and (p_project_id is null or d.project_id = p_project_id)
    and (p_date_start is null or d.created_at >= p_date_start)
    and (p_date_end is null or d.created_at <= p_date_end)
    and exists (
      select 1 from public.document_type_permissions
      where user_id = auth.uid()
      and document_type = d.type
    )
  order by
    case when p_query is not null then rank else 0 end desc,
    d.created_at desc;
end;
$$ language plpgsql security definer;

-- Storage bucket for uploaded files
insert into storage.buckets (id, name, public) 
values ('project-documents', 'project-documents', false);

-- Storage policy for uploads
create policy "Users can upload project documents"
  on storage.objects for insert
  with check (
    bucket_id = 'project-documents' and
    exists (
      select 1 from public.document_type_permissions
      where user_id = auth.uid()
      and document_type = (
        select type from public.documents
        where file_url = storage.objects.name
      )
    )
  )

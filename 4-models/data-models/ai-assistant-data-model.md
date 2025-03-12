# AI Assistant Data Model

## Overview

This document defines the AI assistant (Max) data model for the ConstructivAI platform, implemented using Supabase and TypeScript.

## TypeScript Interface

```typescript
interface Chat {
  id: string;           // Primary key, UUID
  title: string;        // Auto-generated or user-defined title
  projectId?: string;   // Optional associated project
  documentType?: DocumentType; // Optional document type intent
  createdBy: string;    // User who started the chat
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}

interface Message {
  id: string;           // Primary key, UUID
  chatId: string;       // Associated chat
  role: 'user' | 'assistant'; // Message sender
  content: string;      // Message content
  contentType: 'text' | 'voice'; // Message type
  transcription?: string; // Voice transcription if applicable
  metadata?: {
    documentId?: string;  // Generated document reference
    voiceUrl?: string;   // Voice recording URL
    duration?: number;    // Voice duration in seconds
  };
  createdAt: Date;      // Creation timestamp
}

interface ChatContext {
  id: string;           // Primary key, UUID
  chatId: string;       // Associated chat
  projectId?: string;   // Project context
  documentType?: DocumentType; // Document type context
  metadata: {
    projectDetails?: any;  // Relevant project information
    templateId?: string;   // Document template reference
    preferences?: any;     // User preferences
  };
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}
```

## Supabase Schema

```sql
-- Chats Table
create table public.chats (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  project_id uuid references public.projects(id),
  document_type document_type,
  created_by uuid references auth.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages Table
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  chat_id uuid references public.chats(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  content_type text not null check (content_type in ('text', 'voice')),
  transcription text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Chat Context Table
create table public.chat_contexts (
  id uuid default uuid_generate_v4() primary key,
  chat_id uuid references public.chats(id) on delete cascade not null,
  project_id uuid references public.projects(id),
  document_type document_type,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(chat_id)
);

-- Add indexes for better performance
create index idx_chats_user on public.chats(created_by, created_at desc);
create index idx_messages_chat on public.messages(chat_id, created_at);

-- Enable RLS
alter table public.chats enable row level security;
alter table public.messages enable row level security;
alter table public.chat_contexts enable row level security;

-- RLS Policies
create policy "Users can view their own chats"
  on public.chats for select
  using (auth.uid() = created_by);

create policy "Users can create chats"
  on public.chats for insert
  with check (auth.uid() = created_by);

create policy "Users can view messages in their chats"
  on public.messages for select
  using (
    exists (
      select 1 from public.chats
      where id = messages.chat_id
      and created_by = auth.uid()
    )
  );

-- Helper function to create new chat with context
create function create_chat_with_context(
  p_title text,
  p_project_id uuid default null,
  p_document_type document_type default null
) returns uuid as $$
declare
  v_chat_id uuid;
begin
  -- Create chat
  insert into public.chats (title, project_id, document_type, created_by)
  values (p_title, p_project_id, p_document_type, auth.uid())
  returning id into v_chat_id;

  -- Create context
  insert into public.chat_contexts (chat_id, project_id, document_type, metadata)
  values (
    v_chat_id,
    p_project_id,
    p_document_type,
    case 
      when p_project_id is not null then
        (select jsonb_build_object(
          'projectDetails', jsonb_build_object(
            'name', name,
            'address', address,
            'status', status
          )
        )
        from public.projects where id = p_project_id)
      else '{}'::jsonb
    end
  );

  return v_chat_id;
end;
$$ language plpgsql security definer;
```

## Relationships

- Many-to-One with Users (each conversation/command belongs to one user)
- Many-to-One with Projects (conversations can be associated with projects)
- One-to-Many with Messages (a conversation has multiple messages)

## Security Considerations

1. **Access Control**:
   - Conversations visible only to the user who created them
   - Messages visible only to conversation participants
   - Commands visible only to the user who issued them

2. **Data Protection**:
   - Sensitive information handling
   - Command validation
   - Rate limiting

## MVP Scope

### Essential Fields

- ✅ Conversations: id, user_id, content
- ✅ Messages: id, conversation_id, role, content
- ✅ Commands: id, user_id, command, intent, status

### Future Enhancements

- 🔄 Voice processing
- 🔄 Multi-user conversations
- 🔄 Advanced context awareness
- 🔄 Command chaining
- 🔄 Learning from interactions
</code_block_to_apply_changes_from>

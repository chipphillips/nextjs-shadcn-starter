# Task Data Model

## Overview

This document defines the task data model for the ConstructivAI platform, implemented using Supabase and TypeScript.

## TypeScript Interface

```typescript
interface Process {
  id: string;           // Primary key, UUID
  name: string;         // Process name
  description?: string; // Optional description
  isTemplate: boolean;  // Whether this is a template for reuse
  category: TaskCategory; // Process category
  phase?: string;       // Optional phase identifier
  estimatedDuration?: number; // Estimated days to complete
  version: number;      // Template version number
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}

interface Task {
  // Primary Fields
  id: string;           // Primary key, UUID
  title: string;        // Task title
  description?: string; // Optional task description
  status: TaskStatus;   // Current status
  priority: Priority;   // Task priority
  category: TaskCategory; // Task category
  completionPercentage: number; // Progress tracking (0-100)
  dueDate?: Date;      // Optional due date
  
  // Process Relationships
  processId?: string;   // Optional process group ID
  processOrder?: number;// Order within process
  
  // Project Relationships
  projectId: string;    // Associated project
  assignedTo?: string;  // Assigned user ID
  parentTaskId?: string;// Parent task for subtasks
  
  // Timestamps
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}

enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  COMPLETED = 'completed'
}

enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

enum TaskCategory {
  PRE_CONSTRUCTION = 'pre-construction',
  CONSTRUCTION = 'construction',
  ADMINISTRATIVE = 'administrative'
}

// Subtask interface (simplified task)
interface Subtask {
  id: string;
  parentTaskId: string;
  title: string;
  status: TaskStatus;
  assignedTo?: string;
}
```

## Supabase Schema

```sql
-- Processes Table
create table public.processes (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  is_template boolean default false,
  category text not null check (category in ('pre-construction', 'construction', 'administrative')),
  phase text,
  estimated_duration integer,
  version integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add process metadata view for quick reference
create view process_metadata as
select 
  p.id,
  p.name,
  p.category,
  p.phase,
  p.estimated_duration,
  p.version,
  count(t.id) as task_count,
  count(distinct t.project_id) as usage_count,
  max(t.created_at) as last_used
from public.processes p
left join public.tasks t on p.id = t.process_id
group by p.id, p.name, p.category, p.phase, p.estimated_duration, p.version;

-- Modify apply_process_template function to handle durations
create or replace function apply_process_template(
  p_process_id uuid,
  p_project_id uuid,
  p_start_date timestamp with time zone default now()
) returns setof uuid as $$
declare
  v_task record;
  v_new_task_id uuid;
  v_duration integer;
begin
  -- Get process estimated duration
  select estimated_duration into v_duration
  from public.processes
  where id = p_process_id;
  
  -- Clone tasks from process template with calculated due dates
  for v_task in (
    select *
    from public.tasks
    where process_id = p_process_id
    order by process_order
  )
  loop
    insert into public.tasks (
      title,
      description,
      category,
      process_id,
      process_order,
      project_id,
      due_date
    )
    values (
      v_task.title,
      v_task.description,
      v_task.category,
      p_process_id,
      v_task.process_order,
      p_project_id,
      -- Calculate due date based on process duration and task order
      p_start_date + (v_duration * v_task.process_order::float / 
        (select count(*) from public.tasks where process_id = p_process_id))::int * interval '1 day'
    )
    returning id into v_new_task_id;
    
    return next v_new_task_id;
  end loop;
end;
$$ language plpgsql security definer;

-- Tasks Table
create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  status text not null check (status in ('todo', 'in_progress', 'review', 'completed')),
  priority text not null check (priority in ('low', 'medium', 'high')),
  category text not null check (category in ('pre-construction', 'construction', 'administrative')),
  completion_percentage integer not null check (completion_percentage between 0 and 100) default 0,
  due_date timestamp with time zone,
  project_id uuid references public.projects on delete cascade not null,
  assigned_to uuid references auth.users on delete set null,
  parent_task_id uuid references public.tasks on delete cascade,
  process_id uuid references public.processes on delete set null,
  process_order integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add index for process grouping
create index idx_tasks_process on public.tasks (process_id, process_order) where process_id is not null;

-- Helper function to create process from existing tasks
create function create_process_from_tasks(
  p_name text,
  p_description text,
  p_task_ids uuid[],
  p_is_template boolean default false
) returns uuid as $$
declare
  v_process_id uuid;
begin
  -- Create new process
  insert into public.processes (name, description, is_template)
  values (p_name, p_description, p_is_template)
  returning id into v_process_id;
  
  -- Update tasks with process ID
  update public.tasks
  set process_id = v_process_id,
      process_order = array_position(p_task_ids, id)
  where id = any(p_task_ids);
  
  return v_process_id;
end;
$$ language plpgsql security definer;

-- Task Dependencies
create table public.task_dependencies (
  dependent_task_id uuid references public.tasks on delete cascade,
  dependency_task_id uuid references public.tasks on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (dependent_task_id, dependency_task_id),
  check (dependent_task_id != dependency_task_id)
);

-- Automatically set updated_at timestamp
create trigger set_tasks_updated_at
  before update on public.tasks
  for each row
  execute procedure moddatetime (updated_at);

-- Enable Row Level Security
alter table public.tasks enable row level security;
alter table public.task_dependencies enable row level security;

-- RLS Policies
create policy "Team members can view project tasks"
  on public.tasks for select
  using (
    exists (
      select 1 from public.project_members
      where project_id = tasks.project_id and user_id = auth.uid()
    )
  );

create policy "Assigned users can update tasks"
  on public.tasks for update
  using (
    auth.uid() = assigned_to or
    exists (
      select 1 from public.project_members
      where project_id = tasks.project_id 
      and user_id = auth.uid() 
      and role in ('owner', 'manager')
    )
  );
```

## Relationships

- Many-to-One with Projects (each task belongs to one project)
- Many-to-One with Users (each task can be assigned to one user)
- One-to-Many with Subtasks (a task can have multiple subtasks)
- Many-to-Many with Dependencies (tasks can depend on other tasks)

## Security Considerations

1. **Access Control**:
   - Task visibility limited to project team members
   - Update permissions for assigned users and project managers
   - Cascading deletes for subtasks and dependencies

2. **Data Validation**:
   - Required fields enforcement
   - Status and priority value restrictions
   - Circular dependency prevention

## MVP Scope

### Essential Fields

- ✅ id
- ✅ title
- ✅ status
- ✅ priority
- ✅ project_id
- ✅ assigned_to

### Future Enhancements

- 🔄 Time tracking
- 🔄 Task templates
- 🔄 Advanced dependencies
- 🔄 Custom workflows
- 🔄 Automated assignments

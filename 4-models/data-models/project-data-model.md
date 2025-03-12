# Project Data Model

## Overview

This document defines the project data model for the ConstructivAI platform, implemented using Supabase and TypeScript.

## TypeScript Interface

```typescript
interface Project {
  // Primary Fields
  id: string;           // Primary key, UUID
  name: string;         // Project name
  address: string;      // Project location
  startDate: Date;      // Project start date
  endDate: Date;        // Project end date
  status: ProjectStatus;// Current project status
  category: ProjectCategory; // Project category
  
  // Optional Fields
  description?: string; // Project description
  budget?: number;      // Project budget
  neighborhood?: string; // Neighborhood name
  lotNumber?: string;   // Lot number
  housePlanName?: string; // House plan name
  
  // Relationships
  teamMembers: string[]; // Array of user IDs
  
  // Timestamps
  createdAt: Date;     // Creation timestamp
  updatedAt: Date;     // Last update timestamp
}

enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed'
}

enum ProjectCategory {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  INDUSTRIAL = 'industrial',
  OTHER = 'other'
}

// Milestone tracking
interface Milestone {
  id: string;
  projectId: string;
  title: string;
  dueDate: Date;
  status: MilestoneStatus;
  description?: string;
}

enum MilestoneStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}
```

## Supabase Schema

```sql
-- Projects Table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  address text not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  status text not null check (status in ('planning', 'in_progress', 'on_hold', 'completed')),
  category text not null check (category in ('residential', 'commercial', 'industrial', 'other')),
  description text,
  budget numeric,
  neighborhood text check (length(neighborhood) <= 100),
  lot_number text check (lot_number ~ '^(Lot\s+|L)?[0-9]+[A-Z]?$'),
  house_plan_name text check (length(house_plan_name) <= 100),
  last_used_neighborhood_at timestamp with time zone,
  last_used_house_plan_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add indexes for faster dropdown searches
create index idx_projects_neighborhood on public.projects (neighborhood) where neighborhood is not null;
create index idx_projects_house_plan_name on public.projects (house_plan_name) where house_plan_name is not null;

-- Helper view for dropdown suggestions
create view project_suggestions as
select distinct 
  neighborhood,
  house_plan_name,
  max(last_used_neighborhood_at) as last_used_neighborhood,
  max(last_used_house_plan_at) as last_used_house_plan
from public.projects
where neighborhood is not null or house_plan_name is not null
group by neighborhood, house_plan_name
order by last_used_neighborhood desc nulls last, last_used_house_plan desc nulls last;

-- Helper views for filtering and suggestions
create view project_filters as
select 
  p.neighborhood,
  p.house_plan_name,
  m.status as milestone_status,
  count(*) as project_count,
  max(p.created_at) as last_created,
  json_agg(json_build_object(
    'id', p.id,
    'name', p.name,
    'status', p.status,
    'milestone_status', m.status,
    'start_date', p.start_date,
    'end_date', p.end_date
  ) order by p.created_at desc) as projects
from public.projects p
left join public.milestones m on p.id = m.project_id
where p.status != 'completed'
group by p.neighborhood, p.house_plan_name, m.status
order by last_created desc;

-- Add composite index for better filter performance including milestone status
create index idx_projects_milestone_filters on public.projects (neighborhood, house_plan_name, status)
include (id);
create index idx_milestones_status on public.milestones (project_id, status);

-- Enhanced API function for filtered project queries
create function get_filtered_projects(
  p_neighborhood text default null,
  p_house_plan_name text default null,
  p_milestone_status text default null,
  p_status text default null
) returns table (
  id uuid,
  name text,
  status text,
  milestone_status text,
  neighborhood text,
  house_plan_name text,
  start_date timestamp with time zone,
  end_date timestamp with time zone
) as $$
  select distinct
    p.id,
    p.name,
    p.status,
    m.status as milestone_status,
    p.neighborhood,
    p.house_plan_name,
    p.start_date,
    p.end_date
  from public.projects p
  left join public.milestones m on p.id = m.project_id
  where 
    (p_neighborhood is null or p.neighborhood = p_neighborhood)
    and (p_house_plan_name is null or p.house_plan_name = p_house_plan_name)
    and (p_milestone_status is null or m.status = p_milestone_status)
    and (p_status is null or p.status = p_status)
  order by p.created_at desc;
$$ language sql security definer;

-- Project Team Members (Junction Table)
create table public.project_members (
  project_id uuid references public.projects on delete cascade,
  user_id uuid references auth.users on delete cascade,
  role text not null check (role in ('owner', 'manager', 'member')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (project_id, user_id)
);

-- Milestones Table
create table public.milestones (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects on delete cascade,
  title text not null,
  due_date timestamp with time zone not null,
  status text not null check (status in ('pending', 'in_progress', 'completed')),
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Automatically set updated_at timestamp
create trigger set_projects_updated_at
  before update on public.projects
  for each row
  execute procedure moddatetime (updated_at);

create trigger set_milestones_updated_at
  before update on public.milestones
  for each row
  execute procedure moddatetime (updated_at);

-- Enable Row Level Security
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.milestones enable row level security;

-- RLS Policies
create policy "Team members can view their projects"
  on public.projects for select
  using (
    exists (
      select 1 from public.project_members
      where project_id = id and user_id = auth.uid()
    )
  );

create policy "Project owners can update their projects"
  on public.projects for update
  using (
    exists (
      select 1 from public.project_members
      where project_id = id and user_id = auth.uid() and role = 'owner'
    )
  );
```

## Relationships

- Many-to-Many with Users (through project_members table)
- One-to-Many with Tasks (a project has multiple tasks)
- One-to-Many with Documents (a project contains multiple documents)
- One-to-Many with Milestones (a project has multiple milestones)

## Security Considerations

1. **Access Control**:
   - Project visibility limited to team members
   - Update permissions restricted to project owners
   - Cascading deletes for related data

2. **Data Validation**:
   - Required fields enforcement
   - Status value restrictions
   - Date range validation

## MVP Scope

### Essential Fields

- ✅ id
- ✅ name
- ✅ address
- ✅ start_date
- ✅ end_date
- ✅ status
- ✅ team_members

### Future Enhancements

- 🔄 Budget tracking
- 🔄 Resource allocation
- 🔄 Progress metrics
- 🔄 Custom fields
- 🔄 Project templates

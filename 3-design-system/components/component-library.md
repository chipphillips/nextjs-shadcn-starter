# Component Library

## Overview

This document outlines the core UI components used throughout the Constructiv AI platform, built using shadcn/ui and roadmap-ui libraries.

## Components

### Core Components (shadcn/ui)

- Accordion
- Alert Dialog
- Avatar
- Button
- Card
- Checkbox
- Command
- Dialog
- Dropdown Menu
- Form
- Input
- Navigation Menu
- Select
- Table
- Tabs
- Toast
- Tooltip

### Project Management Components (roadmap-ui)

- Gantt Chart
  - Timeline visualization
  - Drag-and-drop features
  - Markers for important dates
- Kanban Board
  - Drag-and-drop cards
  - Customizable columns
  - Card details and metadata
- List View
  - Reorderable subtasks within task cards
  - Grouped items
  - Drag-and-drop reordering
- Calendar View
  - Month/Year selection
  - Date pagination
  - Customizable calendar items
  - Feature visualization

### Usage Guidelines

All components follow shadcn/ui's design principles:

- Accessible by default
- Customizable and themeable
- Built with Radix UI primitives
- Styled with Tailwind CSS

## Implementation

Components are implemented using:

- shadcn/ui for core UI components
- roadmap-ui for project management features
- Next.js as the framework
- Tailwind CSS for styling
- TypeScript for type safety

## Best Practices

- Use the shadcn CLI to add and update components
- Maintain dark mode compatibility
- Follow the copy/paste approach of shadcn/ui for customization
- Keep components up to date using the diff command
- Document all custom modifications
- Test accessibility with screen readers
- Ensure responsive design across all viewports

# Component Library

## Design Principles

Our component library adheres to construction-focused interface principles that ensure our components are optimized for builders' needs:

### Core Principles

1. **Clarity Over Cleverness**
   - Components use clear, descriptive labels
   - Interactions are straightforward and predictable
   - Complex features are hidden behind simple interfaces

2. **Builder-First Design**
   - Large touch targets for gloved hands
   - High contrast for outdoor visibility
   - Offline-ready states for poor connectivity
   - Quick actions for common job site tasks

3. **Progressive Disclosure**
   - Basic options shown by default
   - Advanced features accessible through "More Options"
   - Context-sensitive help and tooltips
   - Step-by-step wizards for complex workflows

4. **Consistency**
   - Uniform patterns across all components
   - Standardized spacing and sizing
   - Consistent error handling
   - Predictable interaction patterns

5. **Time-Saving**
   - One-click access to common actions
   - Voice command support
   - Smart defaults based on context
   - Batch operations for repetitive tasks

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



## Implementation Guidelines

### Component Structure

Each component follows these guidelines:

1. **Mobile-First Design**
   ```tsx
   // Example Button component with touch-friendly sizing
   export const Button = styled.button`
     min-height: 48px; // Touch-friendly target
     padding: 12px 24px;
     font-size: 16px; // Readable text size
     @media (min-width: 768px) {
       min-height: 40px; // Smaller on desktop
     }
   `;
   ```

2. **Progressive Enhancement**
   ```tsx
   // Example form field with progressive disclosure
   const FormField = ({ label, value, advanced = false }) => (
     <div className="field-wrapper">
       <label>{label}</label>
       <input value={value} />
       {advanced && (
         <div className="advanced-options">
           {/* Advanced options here */}
         </div>
       )}
     </div>
   );
   ```

3. **Error Handling**
   ```tsx
   // Example error boundary with construction context
   const ErrorFallback = ({ error }) => (
     <div role="alert" className="error-container">
       <h2>Something went wrong</h2>
       <pre>{error.message}</pre>
       <p>Suggested actions:</p>
       <ul>
         <li>Check your internet connection</li>
         <li>Try refreshing the page</li>
         <li>Contact support if the issue persists</li>
       </ul>
     </div>
   );
   ```

## Usage Guidelines

All components follow these principles:

- Accessible by default (WCAG 2.1 AA compliant)
- Customizable and themeable
- Built with Radix UI primitives
- Styled with Tailwind CSS
- Mobile-optimized for field use
- Offline-capable where possible

### Best Practices

1. **Component Selection**
   - Choose the simplest component that meets the need
   - Consider mobile usage first
   - Plan for offline scenarios
   - Test with work gloves and outdoor lighting

2. **Implementation**
   - Use the shadcn CLI to add and update components
   - Maintain dark mode compatibility
   - Follow the copy/paste approach of shadcn/ui
   - Document all custom modifications

3. **Testing**
   - Test accessibility with screen readers
   - Verify touch targets meet size requirements
   - Validate offline functionality
   - Test in various lighting conditions

4. **Performance**
   - Implement lazy loading for heavy components
   - Use skeleton loading states
   - Cache data for offline use
   - Optimize for low bandwidth

## Documentation

Each component should include:

1. **Usage Examples**
   - Basic implementation
   - Common variations
   - Mobile considerations
   - Offline behavior

2. **Props Documentation**
   - Required vs optional props
   - Type definitions
   - Default values
   - Usage notes

3. **Accessibility Features**
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support
   - Touch target sizes

4. **Error States**
   - Common error scenarios
   - Error messages
   - Recovery actions
   - Offline handling

## Layout Components

### AppShell

- Main application layout
- Responsive sidebar
- Top navigation bar
- Content area

### ProjectLayout

- Project header
- Tab navigation
- Contextual sidebar
- Content area

## Custom Components

### Navigation

- Sidebar (collapsible)
- Breadcrumbs
- TabNav
- DropdownMenu

### Data Display

- DataTable
- Card
- List
- Timeline
- StatusBadge
- ProgressBar

### Forms

- TextInput
- TextArea
- Select
- MultiSelect
- DatePicker
- FileUpload
- VoiceRecorder

### Feedback

- Toast
- AlertDialog
- LoadingSpinner
- SkeletonLoader
- ErrorBoundary

### AI Components

- ChatDrawer
- VoiceInput
- DocumentPreview
- AIStreamingResponse

## Component Guidelines

### Usage Guidelines

All components follow shadcn/ui's design principles:

- Accessible by default
- Customizable and themeable
- Built with Radix UI primitives
- Styled with Tailwind CSS

### State Management

- Loading states
- Error states
- Empty states
- Success states

### Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast

### Responsive Design

- Mobile-first approach
- Breakpoint system
- Touch targets
- Viewport considerations

## Theme System

### Colors

```typescript
export const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    900: '#0c4a6e',
  },
  // ... other colors
};
```

### Typography

```typescript
export const typography = {
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  // ... other typography settings
};
```

### Spacing

```typescript
export const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  4: '1rem',
  // ... other spacing values
};
```

## Usage Examples

### Basic Form

```tsx
<Form onSubmit={handleSubmit}>
  <TextInput
    label="Project Name"
    name="name"
    required
    maxLength={100}
  />
  <TextArea
    label="Description"
    name="description"
    rows={4}
  />
  <DatePicker
    label="Start Date"
    name="startDate"
    required
  />
  <Button type="submit">
    Create Project
  </Button>
</Form>
```

### Data Table

```tsx
<DataTable
  columns={columns}
  data={tasks}
  pagination
  sortable
  searchable
  loading={isLoading}
  onRowClick={handleRowClick}
/>
```

### AI Chat

```tsx
<ChatDrawer
  projectId={projectId}
  documentType="FIELD_NOTE"
  onClose={handleClose}
>
  <VoiceInput
    onRecording={handleRecording}
    onComplete={handleComplete}
  />
  <AIStreamingResponse>
    {(content) => (
      <DocumentPreview content={content} />
    )}
  </AIStreamingResponse>
</ChatDrawer>
```

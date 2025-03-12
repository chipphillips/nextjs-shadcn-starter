# Color System

## Brand Colors

### Primary Blues

- Base Scale:
  - Lightest: `hsl(214, 100%, 97%)` [--blue-50]
  - Light: `hsl(214, 95%, 93%)` [--blue-100]
  - Medium: `hsl(213, 75%, 55%)` [--blue-500]
  - Dark: `hsl(213, 70%, 45%)` [--blue-600]
  - Darkest: `hsl(213, 55%, 15%)` [--blue-900]

### Electric Blue Accents

- Vivid Scale:
  - Icon: `hsl(213, 100%, 65%)` [--blue-vivid-400]
  - Tag: `hsl(213, 100%, 55%)` [--blue-vivid-500]
  - Interactive: `hsl(213, 100%, 45%)` [--blue-vivid-600]

### Additional Accents

- Purple:
  - `hsl(280, 100%, 65%)` [--purple-vivid-400]
  - `hsl(280, 100%, 55%)` [--purple-vivid-500]
  - `hsl(280, 100%, 45%)` [--purple-vivid-600]
- Teal:
  - `hsl(180, 100%, 65%)` [--teal-vivid-400]
  - `hsl(180, 100%, 55%)` [--teal-vivid-500]
  - `hsl(180, 100%, 45%)` [--teal-vivid-600]

## Functional Colors

### Status Colors

- Success:
  - Background: `hsl(142, 100%, 97%)` [--success-50]
  - Base: `hsl(142, 75%, 55%)` [--success-500]
  - Vivid: `hsl(142, 100%, 55%)` [--success-vivid-500]
- Warning:
  - Background: `hsl(45, 100%, 97%)` [--warning-50]
  - Base: `hsl(45, 75%, 55%)` [--warning-500]
  - Vivid: `hsl(45, 100%, 55%)` [--warning-vivid-500]
- Error:
  - Background: `hsl(0, 100%, 97%)` [--error-50]
  - Base: `hsl(0, 75%, 55%)` [--error-500]
  - Vivid: `hsl(0, 100%, 55%)` [--error-vivid-500]

## Component Color Tokens

### Card Components

```typescript
const Card = {
  background: "white",
  border: "var(--blue-100)",
  heading: "var(--blue-900)",
  text: "var(--blue-800)"
}
```

### Button Components

```typescript
const Button = {
  primary: {
    background: "var(--blue-600)",
    hover: "var(--blue-700)",
    text: "white"
  },
  secondary: {
    background: "var(--blue-100)",
    hover: "var(--blue-200)",
    text: "var(--blue-800)"
  }
}
```

### Alert Components

```typescript
const Alert = {
  success: {
    background: "var(--success-50)",
    icon: "var(--success-vivid-500)",
    text: "var(--success-500)"
  },
  warning: {
    background: "var(--warning-50)",
    icon: "var(--warning-vivid-500)",
    text: "var(--warning-500)"
  },
  error: {
    background: "var(--error-50)",
    icon: "var(--error-vivid-500)",
    text: "var(--error-500)"
  }
}
```

## Component Variants

### Button Variants

- Primary: `bg-blue-600 text-white hover:bg-blue-700`
  - Use for main calls-to-action
  - High emphasis actions
  - One per major UI section
- Secondary: `bg-blue-100 text-blue-800 hover:bg-blue-200`
  - Use for alternative actions
  - Medium emphasis
- Outline: `border border-blue-600 text-blue-600 hover:bg-blue-50`
  - Use for less prominent actions
  - Low emphasis
- Ghost: `text-blue-600 hover:bg-blue-50`
  - Use for subtle or inline actions
  - Minimal emphasis

### Card Variants

- Default: `bg-white border border-blue-100 rounded-lg`
  - Standard content containers
  - Most common use case
- Elevated: `bg-white shadow-md rounded-lg`
  - Interactive or highlighted content
  - Draggable elements
- Bordered: `bg-white border border-blue-200 rounded-lg`
  - Enhanced visual hierarchy
  - Group related content

### Input Variants

- Default: `border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500`
  - Standard form inputs
  - Normal state
- Error: `border border-error-500 rounded-md focus:ring-2 focus:ring-error-500`
  - Invalid input state
  - Validation errors
- Success: `border border-success-500 rounded-md focus:ring-2 focus:ring-success-500`
  - Valid input state
  - Confirmed entries

### Alert Variants

- Success: `bg-success-50 text-success-500 border-success-500`
  - Positive outcomes
  - Completed actions
- Warning: `bg-warning-50 text-warning-500 border-warning-500`
  - Potential issues
  - Required attention
- Error: `bg-error-50 text-error-500 border-error-500`
  - Critical issues
  - Failed actions

### Tag Variants

- Premium: `bg-purple-vivid-100 text-purple-vivid-600`
  - Premium features
  - Special content
- Technical: `bg-teal-vivid-100 text-teal-vivid-600`
  - Technical categories
  - System features

## Color Usage Guidelines

### Primary Color Applications

- Dark Blue (--blue-600) for:
  - Primary CTAs
  - Navigation elements
  - Interactive components
- Light Blue (--blue-100) for:
  - Secondary UI elements
  - Background highlights
  - Hover states

### Vivid Color Rules

- Restrict usage to:
  - Icons (16px-24px)
  - Category tags
  - Status indicators
  - Small decorative elements
- Never use for:
  - Large backgrounds
  - Primary text
  - Large buttons

### Accessibility Requirements

- Contrast Ratios:
  - Primary text: 4.5:1 minimum
  - Large text: 3:1 minimum
  - Interactive elements: 3:1 minimum
- Color Combinations:
  - Never rely solely on color
  - Always include supporting icons/text
  - Maintain consistent patterns

### Implementation Guidelines

- Use semantic CSS variables
- Implement through component-specific tokens
- Maintain dark mode alternatives
- Follow Tailwind class naming conventions
- Use provided color tokens consistently
- Test all color combinations for accessibility
- Document any custom color implementations
- Validate color usage in component reviews

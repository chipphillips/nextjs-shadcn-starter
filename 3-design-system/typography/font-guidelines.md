# font-guidelines.md

# Typography Guidelines

## Font Families

### Primary Font Stack

```typescript
fontFamily: {
  sans: [
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Arial',
    'sans-serif'
  ],
  display: [
    'Avenir',
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'sans-serif'
  ],
  mono: [
    'JetBrains Mono',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace'
  ]
}
```

### Font Loading Optimization

```html
<link 
  rel="preload" 
  href="/fonts/Inter-var.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin
>
```

## Heading System

### Configuration

```typescript
// tailwind.config.ts
theme: {
  extend: {
    fontSize: {
      'medium-heading': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
    },
    fontWeight: {
      'heading-bold': '700',    // For h3
      'heading-light': '300',   // For h4
    },
  },
}
```

### Heading Hierarchy with Fluid Typography

1. H1 - Primary Headings
   - Base Size: `text-4xl` (2.25rem/36px)
   - Fluid Size: `text-fluid-4xl` (clamp(2.25rem, 2.15rem + 0.5vw, 2.75rem))
   - Weight: `font-extrabold`
   - Margin: `mb-6`
   - Usage: Main page titles

2. H2 - Section Headings
   - Base Size: `text-3xl` (1.875rem/30px)
   - Fluid Size: `text-fluid-3xl` (clamp(1.875rem, 1.775rem + 0.5vw, 2.25rem))
   - Weight: `font-bold`
   - Margin: `mb-5`
   - Usage: Major section divisions

3. H3 - Subsection Headings
   - Base Size: `text-medium-heading` (1.25rem/20px)
   - Fluid Size: `text-fluid-xl` (clamp(1.25rem, 1.2rem + 0.25vw, 1.5rem))
   - Weight: `font-heading-bold` (700)
   - Style: `uppercase tracking-wide`
   - Margin: `mb-4`
   - Usage: Feature headings, section labels

4. H4 - Minor Headings
   - Base Size: `text-medium-heading` (1.25rem/20px)
   - Fluid Size: `text-fluid-lg` (clamp(1.125rem, 1.075rem + 0.25vw, 1.25rem))
   - Weight: `font-heading-light` (300)
   - Style: `normal-case`
   - Margin: `mb-4`
   - Usage: Component titles, subsections

5. H5 - Small Headings
   - Base Size: `text-lg` (1.125rem/18px)
   - Fluid Size: `text-fluid-base` (clamp(1rem, 0.95rem + 0.25vw, 1.125rem))
   - Weight: `font-semibold`
   - Margin: `mb-3`
   - Usage: Minor sections, card titles

6. H6 - Minimal Headings
   - Base Size: `text-base` (1rem/16px)
   - Fluid Size: `text-fluid-sm` (clamp(0.875rem, 0.825rem + 0.25vw, 1rem))
   - Weight: `font-semibold`
   - Margin: `mb-2`
   - Usage: Small subsections, list headers

### Implementation with Fluid Typography

```tsx
// Enhanced Heading Component with Fluid Typography
interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  isFluid?: boolean; // Toggle between fluid and static sizes
}

export function Heading({ 
  level = 1, 
  children, 
  className = '',
  isFluid = true 
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseStyles = 'text-gray-900 dark:text-gray-100';
  const fluidStyles = {
    1: 'text-fluid-4xl font-extrabold mb-6',
    2: 'text-fluid-3xl font-bold mb-5',
    3: 'text-fluid-xl font-heading-bold uppercase tracking-wide mb-4',
    4: 'text-fluid-lg font-heading-light normal-case mb-4',
    5: 'text-fluid-base font-semibold mb-3',
    6: 'text-fluid-sm font-semibold mb-2'
  };
  
  const staticStyles = {
    1: 'text-4xl font-extrabold mb-6',
    2: 'text-3xl font-bold mb-5',
    3: 'text-medium-heading font-heading-bold uppercase tracking-wide mb-4',
    4: 'text-medium-heading font-heading-light normal-case mb-4',
    5: 'text-lg font-semibold mb-3',
    6: 'text-base font-semibold mb-2'
  };

  const levelStyles = isFluid ? fluidStyles[level] : staticStyles[level];

  return (
    <Tag className={`${baseStyles} ${levelStyles} ${className}`}>
      {children}
    </Tag>
  );
}
```

### Usage Examples

```tsx
// Fluid Typography (Default)
<Heading level={1}>Fluid Page Title</Heading>
<Heading level={2}>Fluid Section Heading</Heading>

// Static Typography
<Heading level={1} isFluid={false}>Static Page Title</Heading>
<Heading level={2} isFluid={false}>Static Section Heading</Heading>
```

### Benefits of Fluid Typography

1. Smooth Scaling
   - Eliminates jarring breakpoint transitions
   - Provides consistent reading experience
   - Automatically adjusts to viewport width

2. Mobile Optimization
   - Ensures readability on small screens
   - Prevents text from becoming too small
   - Maintains proper proportions

3. Desktop Enhancement
   - Allows text to grow for larger screens
   - Preserves visual hierarchy
   - Optimizes line lengths

4. Implementation Flexibility
   - Can be toggled on/off per component
   - Maintains consistent base sizes
   - Allows for context-specific adjustments

## Font Sizes

### Static Sizes (Tailwind CSS classes)

| Class | Size | Usage |
|-------|------|--------|
| text-xs | 0.75rem (12px) | Fine print, captions |
| text-sm | 0.875rem (14px) | Small text, labels |
| text-base | 1rem (16px) | Body text |
| text-lg | 1.125rem (18px) | Large body text |
| text-xl | 1.25rem (20px) | Subheadings |
| text-2xl | 1.5rem (24px) | H3 headings |
| text-3xl | 1.875rem (30px) | H2 headings |
| text-4xl | 2.25rem (36px) | H1 headings |
| text-5xl | 3rem (48px) | Large titles |
| text-6xl | 3.75rem (60px) | Hero titles |

### Fluid Typography

```css
@layer utilities {
  .text-fluid-xs {
    font-size: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  }
  .text-fluid-sm {
    font-size: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
  }
  .text-fluid-base {
    font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  }
  .text-fluid-lg {
    font-size: clamp(1.125rem, 1.075rem + 0.25vw, 1.25rem);
  }
  .text-fluid-xl {
    font-size: clamp(1.25rem, 1.2rem + 0.25vw, 1.5rem);
  }
  .text-fluid-2xl {
    font-size: clamp(1.5rem, 1.4rem + 0.5vw, 2rem);
  }
  .text-fluid-3xl {
    font-size: clamp(1.875rem, 1.775rem + 0.5vw, 2.25rem);
  }
  .text-fluid-4xl {
    font-size: clamp(2.25rem, 2.15rem + 0.5vw, 2.75rem);
  }
}
```

## Paragraph Widths

### Width Guidelines

1. Narrow (45 characters)
   - Optimal for focused reading
   - Use for important notices
   - Sidebar content
   - Brief descriptions

   ```jsx
   <Paragraph width="narrow">
     Focused content for enhanced readability
   </Paragraph>
   ```

2. Medium (65 characters)
   - Default width
   - Balanced readability
   - Standard content
   - Blog posts

   ```jsx
   <Paragraph width="medium">
     Standard content with optimal balance of readability and density
   </Paragraph>
   ```

3. Wide (75 characters)
   - Maximum width
   - Dense content
   - Technical documentation
   - Feature descriptions

   ```jsx
   <Paragraph width="wide">
     Maximum width for detailed content while maintaining readability
   </Paragraph>
   ```

## Font Weights

| Weight | Value | Usage |
|--------|-------|--------|
| font-light | 300 | Thin text, used sparingly |
| font-normal | 400 | Regular body text |
| font-medium | 500 | Slightly emphasized text |
| font-semibold | 600 | Subheadings, important text |
| font-bold | 700 | Headings, buttons |
| font-extrabold | 800 | Extra emphasis, used sparingly |

## Line Heights

| Class | Value | Usage |
|-------|-------|--------|
| leading-none | 1 | Headings, single-line text |
| leading-tight | 1.25 | Compact text |
| leading-snug | 1.375 | Slightly tighter than normal |
| leading-normal | 1.5 | Body text |
| leading-relaxed | 1.625 | Slightly looser than normal |
| leading-loose | 2 | Widely spaced text |

## Usage Guidelines

### General Typography Rules

- Use Inter for body text and UI elements
- Use Roboto Slab for headings and emphasis
- Maintain consistent typographic scale using defined font sizes
- Use appropriate font weights to create hierarchy and emphasis
- Adjust line heights based on text size and context for optimal readability
- Implement fluid typography for responsive text scaling
- Follow heading hierarchy consistently
- Use appropriate paragraph widths for content type

### Spacing Guidelines

Using Tailwind CSS classes:

| Class | Size | Usage |
|-------|------|--------|
| p-0, m-0 | 0 | No spacing |
| p-1, m-1 | 0.25rem (4px) | Tiny spacing |
| p-2, m-2 | 0.5rem (8px) | Small spacing |
| p-3, m-3 | 0.75rem (12px) | Medium spacing |
| p-4, m-4 | 1rem (16px) | Default spacing |
| p-5, m-5 | 1.25rem (20px) | Large spacing |
| p-6, m-6 | 1.5rem (24px) | Extra large spacing |
| p-8, m-8 | 2rem (32px) | 2x default spacing |
| p-10, m-10 | 2.5rem (40px) | 2.5x default spacing |
| p-12, m-12 | 3rem (48px) | 3x default spacing |
| p-16, m-16 | 4rem (64px) | 4x default spacing |

### Spacing Implementation

- Use consistent spacing to create visual harmony
- Apply smaller spacing (p-1 to p-3) for tight layouts and compact components
- Use p-4 and m-4 as the default spacing for most elements
- Apply larger spacing (p-6 to p-16) for section separators and major layout elements
- Combine padding and margin classes to fine-tune spacing
- Use responsive variants (e.g., md:p-6) to adjust spacing across different screen sizes

## Advanced Typography Features

### OpenType Features

```typescript
fontFeatureSettings: {
  'numeric': '"tnum" 1, "cv01" 1, "cv02" 1, "cv03" 1, "cv04" 1',
  'heading': '"liga" 1, "kern" 1',
}
```

### Context-Specific Typography

#### Dashboard Typography

```typescript
'.dashboard-number': {
  '@apply font-mono text-lg font-medium tabular-nums': {},
},
'.dashboard-label': {
  '@apply text-sm font-medium text-gray-600': {},
},
'.dashboard-heading': {
  '@apply text-lg font-semibold leading-tight': {},
}
```

#### Marketing Typography

```typescript
'.marketing-hero': {
  '@apply text-5xl md:text-6xl font-extrabold tracking-tight': {},
},
'.marketing-tagline': {
  '@apply text-xl md:text-2xl font-medium text-gray-600': {},
}
```

### Enhanced Type Scale System

```typescript
fontSize: {
  'xs': ['0.75rem', { lineHeight: '1rem' }],
  'sm': ['0.875rem', { lineHeight: '1.25rem' }],
  'base': ['1rem', { lineHeight: '1.5rem' }],
  'lg': ['1.125rem', { lineHeight: '1.75rem' }],
  'xl': ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
  '6xl': ['3.75rem', { lineHeight: '1' }],
  '7xl': ['4.5rem', { lineHeight: '1' }],
  '8xl': ['6rem', { lineHeight: '1' }],
  '9xl': ['8rem', { lineHeight: '1' }],
}
```

### Custom Line Heights

```typescript
lineHeight: {
  'tight-compact': '1.1',
  'article': '1.6',
  'form': '1.3',
  'heading': '1.2',
}
```

## Accessibility Enhancements

### Minimum Font Size

```css
@layer base {
  html {
    font-size: 16px;
    @screen sm {
      font-size: calc(14px + 0.5vw);
    }
  }
}
```

### Font Smoothing

```typescript
extend: {
  fontSmoothing: {
    'optimized': {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    }
  }
}
```

## Enhanced Typography Components

### Responsive Heading Component

```typescript
interface ResponsiveHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  variant?: 'marketing' | 'dashboard' | 'default';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function ResponsiveHeading({
  level,
  children,
  variant = 'default',
  align = 'left',
  className,
}: ResponsiveHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const variants = {
    marketing: {
      1: 'text-5xl md:text-6xl font-extrabold tracking-tight',
      2: 'text-4xl md:text-5xl font-bold tracking-tight',
      // Additional levels...
    },
    dashboard: {
      1: 'text-2xl font-semibold leading-tight',
      2: 'text-xl font-medium leading-tight',
      // Additional levels...
    },
    default: {
      1: 'text-4xl font-bold tracking-tight',
      2: 'text-3xl font-semibold tracking-tight',
      // Additional levels...
    },
  };

  return (
    <Tag 
      className={cn(
        variants[variant][level],
        `text-${align}`,
        className
      )}
    >
      {children}
    </Tag>
  );
}
```

## Implementation Guidelines

### Performance Considerations

- Use system fonts as fallbacks
- Implement effective font loading strategies
- Consider subset loading for large font files
- Monitor and optimize font loading performance

### Maintenance Best Practices

- Document all typography changes
- Create and maintain typography style guide
- Implement automated testing for typography rules
- Regular review of typography system

### Brand Consistency

- Ensure typography aligns with brand guidelines
- Create consistent spacing relationships
- Maintain proper hierarchy across all pages
- Regular audits of typography usage

### Cross-Browser Testing

- Verify rendering in all major browsers
- Test different operating systems
- Validate mobile device rendering
- Document any browser-specific adjustments

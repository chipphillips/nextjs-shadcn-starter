# Contributing to Modern Next.js Component Library

We love your input! We want to make contributing as easy and transparent as possible.

## Development Process

1. Fork the repo
2. Clone your fork
3. Create a new branch
4. Make your changes
5. Push to your fork
6. Create a Pull Request

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── chat/              # Chat interface
│   └── layout.tsx         # Root layout
├── components/
│   ├── demos/            # Component demonstrations
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── ai/              # AI-related utilities
│   └── utils.ts         # General utilities
├── store/               # Zustand store
├── styles/              # Global styles
└── types/               # TypeScript types
```

## Adding New Components

1. Create component file in `components/ui/`
2. Create demo in `components/demos/`
3. Add to navigation in `app/layout.tsx`
4. Add tests if applicable

Example:
```typescript
// components/ui/my-component.tsx
export function MyComponent() {
  return (
    <div className="...">
      // Component content
    </div>
  );
}

// components/demos/my-component-demo.tsx
export function MyComponentDemo() {
  return (
    <div className="demo-wrapper">
      <MyComponent />
    </div>
  );
}
```

## Adding AI Tools

1. Define schema in `lib/ai/tools.ts`:
```typescript
export const myToolSchema = z.object({
  param1: z.string(),
  param2: z.number(),
});
```

2. Create tool implementation:
```typescript
export const myTool: Tool = {
  name: 'my_tool',
  description: 'Description of what the tool does',
  schema: myToolSchema,
  execute: async (args) => {
    // Implementation
    return result;
  },
};
```

3. Add to available tools array

## Code Style

- Use TypeScript for all new code
- Follow existing patterns and naming conventions
- Use functional components
- Implement proper error handling
- Add appropriate TypeScript types
- Use Tailwind CSS for styling

## Testing

- Write tests for new components
- Use Vitest for testing
- Follow existing test patterns
- Run tests before submitting PR

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update the README.md if needed
5. The PR will be merged once you have a review

## Questions?

Feel free to open an issue for any questions!
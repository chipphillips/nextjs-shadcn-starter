# Next.js Component Library with AI Integration

A modern, production-ready component library built with Next.js 14, React, TypeScript, and AI capabilities. Features 25+ beautiful UI components, AI-powered chat, and a comprehensive development environment.

## 🌟 Features

- 🎨 **Beautiful UI Components**
  - Interactive buttons and inputs
  - Layout patterns and grids
  - Advanced animations
  - Responsive design patterns
  
- 🤖 **AI Integration**
  - Chat interface with streaming responses
  - Voice input with visualization
  - Smart suggestions and search
  - Extensible tools system
  
- 🛠️ **Developer Experience**
  - TypeScript support
  - Comprehensive testing setup
  - GitHub Actions CI/CD
  - Automated security checks

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/component-library

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## 📋 Requirements

- Node.js 20.x or later
- npm 10.x or later
- OpenAI API key (for AI features)

## ⚙️ Configuration

1. Configure environment variables in `.env.local`:

```env
# Required
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional - for future Supabase integration
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

2. For deployment, set up Vercel:
   - Create a Vercel project
   - Add environment variables
   - Configure deployment settings

## 🧪 Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run test coverage
npm run test:coverage

# Run linting
npm run lint

# Build for production
npm run build
```

## 🏗️ Project Structure

```
.
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── chat/           # Chat interface
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── demos/         # Component demos
│   ├── layout/        # Layout components
│   └── ui/            # UI components
├── lib/               # Utilities
│   ├── ai/           # AI integration
│   └── utils.ts      # Helper functions
└── types/            # TypeScript types
```

## 🤖 AI Integration

The project uses the Vercel AI SDK for AI features. See [AI Integration Guide](docs/VERCEL_AI_SDK.md) for details.

### Adding New AI Tools

1. Define tool schema in `lib/ai/tools.ts`:
```typescript
export const myToolSchema = z.object({
  param1: z.string(),
  param2: z.number(),
});
```

2. Implement the tool:
```typescript
export const myTool: Tool = {
  name: 'my_tool',
  description: 'Tool description',
  schema: myToolSchema,
  execute: async (args) => {
    // Implementation
    return result;
  },
};
```

3. Add to available tools array

## 🧩 Components

### Adding New Components

1. Create component in `components/ui/`:
```typescript
export function MyComponent() {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
}
```

2. Create demo in `components/demos/`:
```typescript
export function MyComponentDemo() {
  return (
    <div className="demo-wrapper">
      <MyComponent />
    </div>
  );
}
```

3. Add to navigation in `app/layout.tsx`

## 🔒 Security

- Automated security checks via GitHub Actions
- Dependency vulnerability scanning
- Secret detection
- CodeQL analysis

## 🚀 CI/CD

Includes GitHub Actions workflows for:
- Automated testing
- Security scanning
- Vercel deployment
- Version management
- Dependency updates

## 📚 Documentation

- [Contributing Guidelines](CONTRIBUTING.md)
- [AI Integration Guide](docs/VERCEL_AI_SDK.md)
- [Component Guidelines](docs/COMPONENTS.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details
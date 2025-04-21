# Advanced Layout and Spacing System

## Implementation Guide for Tailwind CSS and shadcn/ui

v1.0.0

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [White Space Implementation](#white-space-implementation)
3. [Spacing Scale System](#spacing-scale-system)
4. [Layout Strategies](#layout-strategies)
5. [Component-Specific Guidelines](#component-specific-guidelines)
6. [Responsive Adaptations](#responsive-adaptations)
7. [Implementation Patterns](#implementation-patterns)
8. [Integration with shadcn/ui, TypeScript, Zod, and Prisma](#integration-with-shadcnui-typescript-zod-and-prisma)
9. [TypeScript-First Approach](#typescript-first-approach)
10. [Zod Schema Validation](#zod-schema-validation)
11. [Prisma Integration](#prisma-integration)

---

## Core Principles

### Fundamental Spacing Philosophy

- **Start with excess white space** and remove it systematically
- **Use intentional density** only when functionally beneficial
- **Maintain logical visual grouping** through deliberate spacing relationships
- **Scale elements independently** rather than proportionally

### Design System Integration Benefits

- Creates consistent, predictable interfaces
- Accelerates design and development decisions
- Enhances readability and visual hierarchy
- Reduces cognitive load for users

---

## White Space Implementation

### Tailwind CSS Approach

Tailwind CSS provides utility classes that follow a non-linear spacing scale, aligning perfectly with our spacing philosophy. The default scale follows a similar progression to our recommended approach.

#### Starting with Excess Spacing

Use larger margin/padding values initially, then reduce as needed:

```html
<!-- Initial generous spacing -->
<div class="p-8 space-y-6">
  <!-- Content -->
</div>

<!-- Refined spacing after evaluation -->
<div class="p-6 space-y-4">
  <!-- Content -->
</div>
```

#### Strategic Density Examples

```html
<!-- Standard spacing for content-focused interfaces -->
<article class="space-y-6 max-w-prose">
  <!-- Article content -->
</article>

<!-- Compact spacing for data-dense interfaces -->
<div class="space-y-2">
  <!-- Dashboard components -->
</div>
```

### Optimization Techniques

- Use `space-y-{n}` and `space-x-{n}` utilities for consistent child element spacing
- Apply `gap-{n}` for grid and flex layouts instead of margins on children
- Use `max-w-{size}` constraints instead of percentage-based widths

---

## Spacing Scale System

### Tailwind's Built-in Scale

Tailwind CSS uses a default spacing scale that already implements our non-linear spacing philosophy:

| Tailwind Class | rem | px | Ratio |
|---------------|-----|----|----|
| p-0, m-0 | 0 | 0px | - |
| p-0.5, m-0.5 | 0.125rem | 2px | - |
| p-1, m-1 | 0.25rem | 4px | 2× |
| p-1.5, m-1.5 | 0.375rem | 6px | 1.5× |
| p-2, m-2 | 0.5rem | 8px | 1.33× |
| p-2.5, m-2.5 | 0.625rem | 10px | 1.25× |
| p-3, m-3 | 0.75rem | 12px | 1.2× |
| p-4, m-4 | 1rem | 16px | 1.33× |
| p-5, m-5 | 1.25rem | 20px | 1.25× |
| p-6, m-6 | 1.5rem | 24px | 1.2× |
| p-8, m-8 | 2rem | 32px | 1.33× |
| p-10, m-10 | 2.5rem | 40px | 1.25× |
| p-12, m-12 | 3rem | 48px | 1.2× |
| p-16, m-16 | 4rem | 64px | 1.33× |

For larger values, the scale continues with similar proportional increases.

### Applying the Spacing Scale

#### For Element Sizing

```html
<!-- Element width using spacing scale -->
<div class="w-64"><!-- 16rem/256px width --></div>

<!-- Max-width constraint based on content needs -->
<div class="max-w-md"><!-- 28rem/448px maximum width --></div>
```

#### For Spacing Between Elements

```html
<!-- Vertical rhythm with appropriate scale jumps -->
<div class="space-y-6">
  <h2>Section heading</h2>
  <p class="space-y-4">Paragraph with properly spaced content</p>
</div>
```

---

## Layout Strategies

### Optimal Space Utilization

#### Use Container Constraints

```html
<!-- Central content with appropriate width constraints -->
<main class="container mx-auto px-4 max-w-4xl">
  <!-- Content -->
</main>
```

#### Column-Based Approaches

```html
<!-- Two-column layout with fixed sidebar -->
<div class="flex">
  <!-- Fixed-width sidebar -->
  <aside class="w-64 shrink-0">
    <!-- Sidebar content -->
  </aside>
  
  <!-- Fluid main content -->
  <main class="flex-1 min-w-0">
    <!-- Main content -->
  </main>
</div>
```

### Moving Beyond Grid Limitations

Use Tailwind's flex and grid utilities with fixed and fluid sizing:

```html
<!-- Grid with mixed fixed/fluid columns -->
<div class="grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-span-4 xl:w-80 xl:col-span-3">
    <!-- Fixed width at XL, fluid at smaller sizes -->
  </div>
  <div class="col-span-12 md:col-span-8 xl:col-span-9">
    <!-- Fluid width main content -->
  </div>
</div>
```

### Smart Canvas Management

Start with mobile-first constraints:

```html
<!-- Mobile-optimized card with appropriate sizing -->
<div class="w-full max-w-sm mx-auto">
  <!-- Card content designed for mobile first -->
</div>
```

---

## Component-Specific Guidelines

### Preventing Ambiguous Spacing

#### Forms with Clear Visual Grouping

```html
<!-- Form with proper spacing hierarchy -->
<form class="space-y-8">
  <div class="space-y-2">
    <label>Email</label>
    <input type="email" class="w-full" />
  </div>
  
  <div class="space-y-2">
    <label>Password</label>
    <input type="password" class="w-full" />
  </div>
</form>
```

#### Content with Proper Hierarchy

```html
<!-- Article with clear sectioning -->
<article class="space-y-12">
  <section class="space-y-6">
    <h2 class="text-2xl font-bold">Section Title</h2>
    <p>Paragraph content with appropriate spacing.</p>
    
    <ul class="space-y-4">
      <li>List item with proper spacing</li>
      <li>Another list item</li>
    </ul>
  </section>
</article>
```

### Non-proportional Component Scaling

Buttons with proportionally different padding at various sizes:

```html
<!-- Small button with tighter padding -->
<button class="text-sm px-3 py-1">Small</button>

<!-- Default button -->
<button class="text-base px-4 py-2">Default</button>

<!-- Large button with proportionally more generous padding -->
<button class="text-lg px-6 py-3">Large</button>
```

---

## Responsive Adaptations

### Progressively Adapting Layouts

```html
<!-- Element that scales differently across breakpoints -->
<h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
  Headline scales non-proportionally
</h1>
```

### Smart Breakpoint Handling

```html
<!-- Container with contextual max-width -->
<div class="w-full max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
  <!-- Content constrained appropriately at each breakpoint -->
</div>
```

---

## Implementation Patterns

### Using Custom Utilities

Extend Tailwind with custom utilities for specific spacing needs:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem', // 72px
        '68': '17rem',  // 272px
      }
    }
  }
}
```

### Creating Component-Specific Spacing

For consistent component spacing, use Tailwind's component extraction pattern:

```jsx
// Button.jsx
function Button({ size = 'md', children }) {
  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3 font-medium',
  };
  
  return (
    <button className={`rounded ${sizes[size]}`}>
      {children}
    </button>
  );
}
```

---

## Integration with shadcn/ui, TypeScript, Zod, and Prisma

### Component Spacing and Type Integration

shadcn/ui components integrate well with TypeScript, Zod, and Prisma while maintaining consistent spacing principles.

#### Type-Safe Card Components

```tsx
// Type-safe Card component with appropriate spacing
type CardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function TypedCard({ title, description, children }: CardProps) {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
```

#### Zod Form Integration

Combining Zod schema validation with proper form spacing:

```tsx
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema
const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Infer TypeScript type from Zod schema
type FormValues = z.infer<typeof formSchema>;

function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Enter your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Log in</Button>
      </form>
    </Form>
  );
}
```

### Prisma Integration with Proper UI Spacing

Using Prisma models with consistent UI spacing patterns:

```tsx
// Prisma schema types
import { User } from "@prisma/client";
import { useState } from "react";

type UserCardProps = {
  user: User;
  onUpdate: (id: string, data: Partial<User>) => Promise<void>;
};

function UserProfileCard({ user, onUpdate }: UserCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isEditing ? (
          <EditUserForm user={user} onUpdate={onUpdate} onComplete={() => setIsEditing(false)} />
        ) : (
          <UserDetails user={user} />
        )}
      </CardContent>
    </Card>
  );
}
```

### Custom Variants with TypeScript

Type-safe component variants with spacing profiles:

```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1",
        lg: "h-12 px-6 py-3",
        // Add custom size with different proportional padding
        xl: "h-14 px-8 py-3.5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### Layout Component Patterns

Implement consistent layout patterns with shadcn/ui components:

```jsx
<main className="container mx-auto py-10 max-w-5xl">
  <div className="grid gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
    <aside className="space-y-6">
      {/* Fixed-width sidebar navigation */}
      <nav className="space-y-2">
        {/* Navigation items */}
      </nav>
    </aside>
    
    <div className="space-y-10">
      {/* Main content with appropriate spacing */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        {/* Dashboard content */}
      </section>
    </div>
  </div>
</main>
```

---

## Practical Examples

### Login Form with Optimal Spacing

```jsx
<Card className="max-w-md w-full mx-auto">
  <CardHeader className="space-y-1">
    <CardTitle className="text-xl md:text-2xl">Login</CardTitle>
    <CardDescription>Enter your credentials to access your account</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="m@example.com" />
    </div>
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Password</Label>
        <Button variant="link" className="px-0 h-auto">Forgot password?</Button>
      </div>
      <Input id="password" type="password" />
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Login</Button>
  </CardFooter>
</Card>
```

### Dashboard Card with Appropriate Density

```jsx
<Card>
  <CardHeader className="pb-2">
    <CardTitle className="text-base font-medium">Performance Metrics</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-3">
      {/* Compact metrics display for data-dense UI */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Conversion Rate</span>
        <span className="font-medium">3.24%</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Avg. Order Value</span>
        <span className="font-medium">$54.32</span>
      </div>
      {/* Additional metrics */}
    </div>
  </CardContent>
</Card>
```

### Content Page with Proper Hierarchy

```jsx
<main className="container mx-auto py-10 max-w-3xl">
  <article className="space-y-12">
    <header className="space-y-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        Article Title with Non-proportional Scaling
      </h1>
      <p className="text-xl text-muted-foreground">
        Introduction paragraph with appropriate spacing.
      </p>
    </header>
    
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Section Heading</h2>
      <p className="leading-7">
        Paragraph content with proper line height and spacing.
      </p>
      <ul className="space-y-4 my-6 ml-6 list-disc">
        <li className="leading-7">List item with clear spacing hierarchy</li>
        <li className="leading-7">Another list item with proper spacing</li>
      </ul>
    </section>
    
    {/* Additional sections */}
  </article>
</main>
```

---

## TypeScript-First Approach

### Strong Typing for Components

Combining TypeScript with our spacing system ensures both visual and functional consistency:

```tsx
// types.ts - Define shared types
export type Spacing = 'compact' | 'default' | 'relaxed';
export type ResponsiveSpacing = {
  xs?: Spacing;
  sm?: Spacing;
  md?: Spacing;
  lg?: Spacing;
  xl?: Spacing;
};

// Apply spacing variations consistently
function Section({ 
  spacing = 'default',
  children 
}: { 
  spacing?: Spacing; 
  children: React.ReactNode 
}) {
  // Map spacing values to Tailwind classes
  const spacingClasses = {
    compact: 'space-y-2 p-3',
    default: 'space-y-4 p-6',
    relaxed: 'space-y-8 p-8'
  };
  
  return (
    <section className={spacingClasses[spacing]}>
      {children}
    </section>
  );
}
```

### Type-Safe Layout Components

Create reusable, type-safe layout components with proper spacing:

```tsx
// components/layouts/TwoColumnLayout.tsx
import { type ReactNode } from 'react';

type ColumnWidth = 'narrow' | 'medium' | 'wide' | 'fluid';

interface TwoColumnLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
  sidebarWidth?: ColumnWidth;
  reversed?: boolean;
  gap?: 'sm' | 'md' | 'lg';
}

export function TwoColumnLayout({
  sidebar,
  content,
  sidebarWidth = 'narrow',
  reversed = false,
  gap = 'md'
}: TwoColumnLayoutProps) {
  // Map to concrete width values
  const widthMap: Record<ColumnWidth, string> = {
    narrow: 'w-64',
    medium: 'w-80',
    wide: 'w-96',
    fluid: 'w-1/3'
  };
  
  // Map to gap values
  const gapMap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };
  
  return (
    <div className={`flex flex-col md:flex-row ${gapMap[gap]} ${reversed ? 'md:flex-row-reverse' : ''}`}>
      <div className={`shrink-0 ${widthMap[sidebarWidth]}`}>
        {sidebar}
      </div>
      <div className="flex-1 min-w-0">
        {content}
      </div>
    </div>
  );
}
```

## Zod Schema Validation

### Form Layout with Zod Integration

Using Zod with shadcn/ui Form components, applying spacing principles:

```tsx
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// User schema with validation
const userSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
  role: z.enum(["admin", "user", "editor"], {
    required_error: "Please select a role.",
  }),
  settings: z.object({
    newsletter: z.boolean().default(false),
    notifications: z.boolean().default(true),
  }),
});

// Infer TypeScript type
type UserFormValues = z.infer<typeof userSchema>;

// Form component with proper spacing applied
function ProfileForm() {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      settings: {
        newsletter: false,
        notifications: true,
      },
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8 max-w-2xl">
        {/* Personal information section - increased spacing */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Personal Information</h3>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      className="min-h-32" 
                      placeholder="Tell us about yourself"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum 160 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Settings section - with distinct spacing */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Preferences</h3>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="settings.newsletter"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Email Newsletter</FormLabel>
                    <FormDescription>
                      Receive updates and announcements.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="settings.notifications"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Notifications</FormLabel>
                    <FormDescription>
                      Receive in-app notifications.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
}
```

## Prisma Integration

### Data Display Patterns

When displaying Prisma data, apply consistent spacing and layout principles:

```tsx
// Prisma component with proper spacing
import { prisma } from "@/lib/prisma";
import { type User } from "@prisma/client";
import { useState } from "react";

// Component to display a paginated list of users
async function UserListWithPagination() {
  // Server component data fetching
  const users = await prisma.user.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button>Add User</Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[140px]">Role</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-mono text-sm">{user.id.substring(0, 8)}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  );
}
```

### Form-to-Database Pattern

Combining Zod, Prisma, and spacing principles:

```tsx
// Create a type-safe form for Prisma model data
import { z } from "zod";

// Schema matches Prisma model structure
const projectSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(500).optional(),
  status: z.enum(["planning", "active", "completed", "archived"]),
  dueDate: z.date().optional(),
  teamId: z.string().uuid(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

// Form with appropriate spacing
function ProjectForm({ 
  teams, 
  onSubmit 
}: { 
  teams: { id: string; name: string }[]; 
  onSubmit: (data: ProjectFormValues) => Promise<void>;
}) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Create New Project</CardTitle>
        <CardDescription>
          Add a new project to your workspace.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teamId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teams.map(team => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-4">
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
```

## Best Practices Summary

1. **Start with excess space** and reduce as needed
2. **Use Tailwind's spacing scale** for consistent progression
3. **Apply fixed widths** for elements with specific content requirements
4. **Use max-width constraints** instead of always filling available space
5. **Create clear spacing hierarchy** between related and unrelated elements
6. **Scale elements independently** across breakpoints
7. **Design mobile-first** and adjust for larger screens
8. **Use component extraction** for consistent spacing patterns
9. **Apply TypeScript for type safety** in component props and spacing values
10. **Validate forms with Zod** while maintaining consistent spacing
11. **Structure Prisma data displays** with appropriate density and hierarchy
12. **Group related form fields** with semantic spacing to improve comprehension

By following these guidelines, you'll create interfaces that are visually balanced, type-safe, and more maintainable across projects.
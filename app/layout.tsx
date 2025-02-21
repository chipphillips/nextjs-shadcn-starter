import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Main } from '@/components/layout/main';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Components',
    href: '/components',
    icon: 'Component',
  },
  {
    title: 'AI Chat',
    href: '/chat',
    icon: 'MessageSquare',
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: 'User',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'Settings',
  },
]

export const metadata: Metadata = {
  title: {
    default: 'Modern SaaS Platform',
    template: '%s | Modern SaaS'
  },
  description: 'A modern, AI-powered SaaS platform with beautiful UI and powerful features',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Modern SaaS Platform',
    description: 'A modern, AI-powered SaaS platform with beautiful UI and powerful features',
    siteName: 'Modern SaaS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern SaaS Platform',
    description: 'A modern, AI-powered SaaS platform with beautiful UI and powerful features',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        "selection:bg-primary selection:text-primary-foreground"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <Sidebar items={navigationItems} />
            <Main>{children}</Main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
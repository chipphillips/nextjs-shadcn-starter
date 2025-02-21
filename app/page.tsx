import { ArrowRight, LayoutDashboard, MessageSquare, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container py-8 space-y-12">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
            Modern SaaS Platform with AI-Powered Features
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Experience the future of productivity with our AI-enhanced tools, beautiful interface, and powerful features.
          </p>
        </div>
        <div className="flex gap-4">
          <Button size="lg">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-lg border bg-background p-6">
          <div className="flex h-[180px] flex-col justify-between">
            <LayoutDashboard className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful analytics and insights for your data.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-6">
          <div className="flex h-[180px] flex-col justify-between">
            <MessageSquare className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">AI Chat</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent conversations powered by AI.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-6">
          <div className="flex h-[180px] flex-col justify-between">
            <User className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">Profile</h3>
              <p className="text-sm text-muted-foreground">
                Manage your account and preferences.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-6">
          <div className="flex h-[180px] flex-col justify-between">
            <Settings className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">Settings</h3>
              <p className="text-sm text-muted-foreground">
                Customize your experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
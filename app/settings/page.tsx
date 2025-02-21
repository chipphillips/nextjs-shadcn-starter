'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { businessSettingsSchema, aiSettingsSchema, systemSettingsSchema } from '@/types/settings'

export default function SettingsPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application settings and preferences
          </p>
        </div>
        <SettingsForm />
      </div>
    </div>
  )
}

function SettingsForm() {
  const [activeTab, setActiveTab] = useState("business")
  const [isLoading, setIsLoading] = useState(false)

  const businessForm = useForm<z.infer<typeof businessSettingsSchema>>({
    resolver: zodResolver(businessSettingsSchema),
    defaultValues: {
      companyName: "",
      website: "",
      primaryProjectType: "",
      currentGoals: "",
      industry: "",
      companySize: "1-10",
    },
  })

  const aiForm = useForm<z.infer<typeof aiSettingsSchema>>({
    resolver: zodResolver(aiSettingsSchema),
    defaultValues: {
      enableAI: true,
      aiModel: "gpt-4",
      confidenceThreshold: 0.7,
      maxTokens: 2000,
      temperature: 0.7,
      contextWindow: 5,
      defaultPersona: "professional",
      errorHandling: "strict",
      loggingLevel: "error",
    },
  })

  const systemForm = useForm<z.infer<typeof systemSettingsSchema>>({
    resolver: zodResolver(systemSettingsSchema),
    defaultValues: {
      theme: "system",
      language: "en",
      enableNotifications: true,
      automaticReports: false,
      reportFrequency: "weekly",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
      backupFrequency: "daily",
      retentionPeriod: 30,
    },
  })

  async function onSubmit(values: z.infer<typeof businessSettingsSchema> | z.infer<typeof aiSettingsSchema> | z.infer<typeof systemSettingsSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeTab,
          settings: values
        }),
      })

      if (!response.ok) throw new Error('Failed to save settings')

      toast.success('Settings updated successfully')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to update settings')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="business">Business</TabsTrigger>
        <TabsTrigger value="ai">AI</TabsTrigger>
        <TabsTrigger value="system">System</TabsTrigger>
      </TabsList>
      <TabsContent value="business">
        <Card>
          <CardHeader>
            <CardTitle>Business Settings</CardTitle>
            <CardDescription>
              Configure your business profile and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...businessForm}>
              <form onSubmit={businessForm.handleSubmit(onSubmit)} className="space-y-8">
                {/* Business form fields */}
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ai">
        <Card>
          <CardHeader>
            <CardTitle>AI Settings</CardTitle>
            <CardDescription>
              Configure AI behavior and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...aiForm}>
              <form onSubmit={aiForm.handleSubmit(onSubmit)} className="space-y-8">
                {/* AI form fields */}
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="system">
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>
              Configure system-wide preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...systemForm}>
              <form onSubmit={systemForm.handleSubmit(onSubmit)} className="space-y-8">
                {/* System form fields */}
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
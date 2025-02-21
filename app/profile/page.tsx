'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useImageUpload } from "@/components/hooks/use-image-upload"
import { ImagePlus, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const personalInfoSchema = z.object({
  name: z.string().min(2, { 
    message: "Name must be at least 2 characters." 
  }),
  email: z.string().email({ 
    message: "Invalid email address." 
  }),
  jobTitle: z.string().min(2, { 
    message: "Job title must be at least 2 characters." 
  }),
  department: z.string().min(2, { 
    message: "Department must be at least 2 characters." 
  }),
  bio: z.string().max(500, { 
    message: "Bio must not exceed 500 characters." 
  }),
})

const roleSettingsSchema = z.object({
  role: z.string().min(2, { 
    message: "Role must be at least 2 characters." 
  }),
  responsibilities: z.string().min(10, { 
    message: "Responsibilities must be at least 10 characters." 
  }),
  typicalTasks: z.string().min(10, { 
    message: "Typical tasks must be at least 10 characters." 
  }),
  preferredOutputFormat: z.enum(["detailed", "concise", "bullet-points"]),
})

const customInstructionsSchema = z.object({
  aiInstructions: z.string().min(10, { 
    message: "Custom instructions must be at least 10 characters." 
  }),
  communicationStyle: z.enum(["formal", "casual", "technical"]),
  specialConsiderations: z.string(),
})

const documentsSchema = z.object({
  jobDescription: z.string().url({ 
    message: "Invalid URL for job description." 
  }).optional(),
  standardOperatingProcedures: z.string().url({ 
    message: "Invalid URL for standard operating procedures." 
  }).optional(),
  performanceMetrics: z.string().url({ 
    message: "Invalid URL for performance metrics." 
  }).optional(),
})

const projectSchema = z.object({
  project_name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  technologies: z.array(z.string()).min(1, {
    message: "At least one technology must be selected.",
  }),
  start_date: z.string(),
  end_date: z.string().optional(),
})

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [isAddingProject, setIsAddingProject] = useState(false)

  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload({
    onUpload: (url) => console.log("Uploaded avatar URL:", url),
  })

  const projectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      project_name: "",
      description: "",
      role: "",
      technologies: [],
      start_date: new Date().toISOString().split('T')[0],
    },
  })

  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      jobTitle: "Project Manager",
      department: "Operations",
      bio: "",
    },
  })

  const roleSettingsForm = useForm<z.infer<typeof roleSettingsSchema>>({
    resolver: zodResolver(roleSettingsSchema),
    defaultValues: {
      role: "Project Manager",
      responsibilities: "",
      typicalTasks: "",
      preferredOutputFormat: "detailed",
    },
  })

  const customInstructionsForm = useForm<z.infer<typeof customInstructionsSchema>>({
    resolver: zodResolver(customInstructionsSchema),
    defaultValues: {
      aiInstructions: "",
      communicationStyle: "formal",
      specialConsiderations: "",
    },
  })

  const documentsForm = useForm<z.infer<typeof documentsSchema>>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      jobDescription: "",
      standardOperatingProcedures: "",
      performanceMetrics: "",
    },
  })

  async function onSubmit(values: any) {
    setIsLoading(true)
    
    try {
      console.log(values)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information and preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="role">Role Settings</TabsTrigger>
            <TabsTrigger value="instructions">Custom Instructions</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal details and preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...personalInfoForm}>
                  <form onSubmit={personalInfoForm.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                      <Avatar 
                        className="h-24 w-24 cursor-pointer"
                        onClick={handleThumbnailClick}
                      >
                        {previewUrl ? (
                          <AvatarImage src={previewUrl} alt="Profile" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-muted">
                            <ImagePlus className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <AvatarFallback>
                          <ImagePlus className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleThumbnailClick}
                        >
                          Upload Avatar
                        </Button>
                        {previewUrl && (
                          <Button 
                            type="button"
                            variant="ghost"
                            onClick={handleRemove}
                            className="text-destructive"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                    <FormField
                      control={personalInfoForm.control}
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
                      control={personalInfoForm.control}
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
                      control={personalInfoForm.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={personalInfoForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little about yourself"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Brief description of your professional background and interests.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="role">
            <Card>
              <CardHeader>
                <CardTitle>Role Settings</CardTitle>
                <CardDescription>Configure settings specific to your role in the company.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...roleSettingsForm}>
                  <form onSubmit={roleSettingsForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={roleSettingsForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={roleSettingsForm.control}
                      name="responsibilities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Responsibilities</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List your key responsibilities"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={roleSettingsForm.control}
                      name="typicalTasks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Typical Tasks</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your typical daily tasks"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={roleSettingsForm.control}
                      name="preferredOutputFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Output Format</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select preferred output format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="detailed">Detailed</SelectItem>
                              <SelectItem value="concise">Concise</SelectItem>
                              <SelectItem value="bullet-points">Bullet Points</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose how you prefer information to be presented to you.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions">
            <Card>
              <CardHeader>
                <CardTitle>Custom Instructions</CardTitle>
                <CardDescription>Set up custom instructions for AI interactions.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...customInstructionsForm}>
                  <form onSubmit={customInstructionsForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={customInstructionsForm.control}
                      name="aiInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>AI Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter custom instructions for AI interactions"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide specific instructions on how the AI should interact with you.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={customInstructionsForm.control}
                      name="communicationStyle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Communication Style</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select communication style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="formal">Formal</SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="technical">Technical</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose your preferred style of communication with the AI.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={customInstructionsForm.control}
                      name="specialConsiderations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Considerations</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter any special considerations or preferences"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Mention any specific requirements or preferences for AI interactions.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Job-Related Documents</CardTitle>
                <CardDescription>Manage links to important job-related documents.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...documentsForm}>
                  <form onSubmit={documentsForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={documentsForm.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter URL to job description document" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={documentsForm.control}
                      name="standardOperatingProcedures"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Standard Operating Procedures</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter URL to SOP document" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={documentsForm.control}
                      name="performanceMetrics"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Performance Metrics</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter URL to performance metrics document" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Project History</CardTitle>
                    <CardDescription>Track your project experience and achievements.</CardDescription>
                  </div>
                  <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div>
                        <DialogHeader>
                          <DialogTitle>Add New Project</DialogTitle>
                          <DialogDescription>
                            Add details about a project you've worked on.
                          </DialogDescription>
                        </DialogHeader>
                      </div>
                      <Form {...projectForm}>
                        <form onSubmit={projectForm.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={projectForm.control}
                            name="project_name"
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
                            control={projectForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    className="resize-none"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={projectForm.control}
                            name="role"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Role</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={projectForm.control}
                              name="start_date"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Date</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={projectForm.control}
                              name="end_date"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                              {isLoading ? "Adding..." : "Add Project"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Example project - Replace with real data */}
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">AI-Powered SaaS Platform</h3>
                        <p className="text-sm text-muted-foreground">Lead Developer</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Jan 2024 - Present
                      </div>
                    </div>
                    <p className="mt-2 text-sm">
                      Developed a modern SaaS platform with AI capabilities using Next.js and OpenAI.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="secondary">OpenAI</Badge>
                      <Badge variant="secondary">Supabase</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
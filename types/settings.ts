import { z } from 'zod'

// Business Settings
export const businessSettingsSchema = z.object({
  companyName: z.string().min(2).max(100),
  website: z.string().url().max(200),
  primaryProjectType: z.string().min(2).max(50),
  currentGoals: z.string().min(10).max(1000),
  industry: z.string().min(2).max(50),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]),
})

// AI Settings
export const aiSettingsSchema = z.object({
  enableAI: z.boolean(),
  aiModel: z.enum(["gpt-4", "gpt-3.5-turbo", "custom"]),
  confidenceThreshold: z.number().min(0).max(1),
  maxTokens: z.number().min(100).max(4000),
  temperature: z.number().min(0).max(2),
  contextWindow: z.number().min(1).max(20),
  defaultPersona: z.enum(["professional", "technical", "friendly", "concise"]),
  customInstructions: z.string().max(1000).optional(),
  errorHandling: z.enum(["strict", "lenient", "adaptive"]),
  loggingLevel: z.enum(["error", "warning", "info", "debug"]),
})

// System Settings
export const systemSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.enum(["en", "es", "fr", "de", "zh", "ja"]),
  enableNotifications: z.boolean(),
  automaticReports: z.boolean(),
  reportFrequency: z.enum(["daily", "weekly", "biweekly", "monthly", "quarterly"]),
  timezone: z.string(),
  dateFormat: z.enum(["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]),
  timeFormat: z.enum(["12h", "24h"]),
  backupFrequency: z.enum(["daily", "weekly", "monthly"]),
  retentionPeriod: z.number().min(1).max(365),
})

// Combined Settings Type
export const settingsSchema = z.object({
  business: businessSettingsSchema,
  ai: aiSettingsSchema,
  system: systemSettingsSchema,
})

export type BusinessSettings = z.infer<typeof businessSettingsSchema>
export type AISettings = z.infer<typeof aiSettingsSchema>
export type SystemSettings = z.infer<typeof systemSettingsSchema>
export type Settings = z.infer<typeof settingsSchema>
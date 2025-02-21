import { z } from 'zod'

// Base schemas
export const idSchema = z.string().uuid()
export const emailSchema = z.string().email()
export const dateSchema = z.string().datetime()

// User schemas
export const userSchema = z.object({
  id: idSchema,
  email: emailSchema,
  name: z.string().min(2).optional(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
})

// Task schemas
export const taskSchema = z.object({
  id: idSchema,
  title: z.string().min(1, 'Title is required'),
  completed: z.boolean().default(false),
  userId: idSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
})

// API request/response schemas
export const createTaskSchema = taskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const updateTaskSchema = taskSchema
  .partial()
  .omit({ id: true, userId: true, createdAt: true, updatedAt: true })

// Schema types
export type User = z.infer<typeof userSchema>
export type Task = z.infer<typeof taskSchema>
export type CreateTask = z.infer<typeof createTaskSchema>
export type UpdateTask = z.infer<typeof updateTaskSchema>
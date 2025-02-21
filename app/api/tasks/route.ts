import { NextResponse } from 'next/server'
import { createAPIHandler } from '@/lib/api'
import { createTaskSchema, updateTaskSchema } from '@/types/zodSchemas'
import { prisma } from '@/lib/prisma'

export const GET = createAPIHandler({
  handler: async () => {
    const tasks = await prisma.task.findMany()
    return NextResponse.json(tasks)
  },
})

export const POST = createAPIHandler({
  schema: createTaskSchema,
  handler: async (data) => {
    const task = await prisma.task.create({
      data,
    })
    return NextResponse.json(task)
  },
})

export const PATCH = createAPIHandler({
  schema: updateTaskSchema,
  handler: async (data, req) => {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    const task = await prisma.task.update({
      where: { id },
      data,
    })
    return NextResponse.json(task)
  },
})
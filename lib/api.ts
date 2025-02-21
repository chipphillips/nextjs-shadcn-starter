import { type ZodSchema } from 'zod'
import { type NextRequest, NextResponse } from 'next/server'

interface APIHandlerOptions<T> {
  schema?: ZodSchema<T>
  handler: (data: T, req: NextRequest) => Promise<Response>
}

export function createAPIHandler<T>({ schema, handler }: APIHandlerOptions<T>) {
  return async (req: NextRequest) => {
    try {
      let data = undefined

      if (schema) {
        const body = await req.json()
        const result = schema.safeParse(body)

        if (!result.success) {
          return NextResponse.json(
            { error: 'Validation error', details: result.error.format() },
            { status: 400 }
          )
        }

        data = result.data
      }

      return handler(data as T, req)
    } catch (error) {
      console.error('API Error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { cookies } from 'next/headers'
import { businessSettingsSchema, aiSettingsSchema, systemSettingsSchema } from '@/types/settings'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { type, settings } = body

    // Validate settings based on type
    let validatedSettings
    switch (type) {
      case 'business':
        validatedSettings = businessSettingsSchema.parse(settings)
        break
      case 'ai':
        validatedSettings = aiSettingsSchema.parse(settings)
        break
      case 'system':
        validatedSettings = systemSettingsSchema.parse(settings)
        break
      default:
        throw new Error('Invalid settings type')
    }

    // Update settings in Supabase
    const { error } = await supabase
      .from('settings')
      .upsert({
        user_id: user.id,
        settings: {
          [type]: validatedSettings
        },
        updated_at: new Date().toISOString(),
      })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Settings API Error:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { mockAuth } from '@/lib/mock-auth'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { user } = await mockAuth.getUser()
      setUser(user)
      setIsLoading(false)
      router.refresh()
    }
    checkAuth()
  }, [router])

  const signIn = useCallback(async (email: string, password: string) => {
    return mockAuth.signIn(email, password)
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    return mockAuth.signUp(email, password)
  }, [])

  const signOut = useCallback(async () => {
    return mockAuth.signOut()
  }, [])

  return {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  }
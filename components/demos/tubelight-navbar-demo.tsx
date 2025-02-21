"use client"

import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from '@/components/ui/tubelight-navbar'

export function TubelightNavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'About', url: '#', icon: User },
    { name: 'Projects', url: '#', icon: Briefcase },
    { name: 'Resume', url: '#', icon: FileText },
  ]

  return (
    <div className="relative flex min-h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-muted/50 to-muted p-10">
      <div className="w-full max-w-xl">
        <NavBar items={navItems} className="relative" />
      </div>
    </div>
  )
}
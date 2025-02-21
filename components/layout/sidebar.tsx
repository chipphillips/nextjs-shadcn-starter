'use client'

import { useStore } from '@/store'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import * as Icons from 'lucide-react'

interface SidebarProps {
  items: {
    title: string
    href: string
    icon?: keyof typeof Icons
  }[]
}

export function Sidebar({ items }: SidebarProps) {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen)
  const toggleSidebar = useStore((state) => state.toggleSidebar)

  const navigationItems = useMemo(() => 
    items.map(item => ({
      ...item,
      Icon: item.icon ? Icons[item.icon] : null
    })), [items])

  return (
    <>
      <Sheet open={isSidebarOpen} onOpenChange={toggleSidebar}>
        <SheetContent side="left" className="w-[240px] p-0">
          <ScrollArea className="h-full py-6">
            <div className="space-y-4">
              <div className="px-3 py-2">
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={item.href} className="flex items-center gap-2">
                        {item.Icon && <item.Icon className="h-4 w-4" />}
                        {item.title}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-[240px] border-r bg-background md:block">
        <ScrollArea className="h-full py-6">
          <div className="space-y-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href={item.href} className="flex items-center gap-2">
                      {item.Icon && <item.Icon className="h-4 w-4" />}
                      {item.title}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
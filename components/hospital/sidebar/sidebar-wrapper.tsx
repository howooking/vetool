'use client'

import { Button } from '@/components/ui/button'
import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { isExpanded, toggleSidebar } = useSidebarStore()

  return (
    <aside
      className={cn(
        'flex h-screen shrink-0 flex-col border-r transition-all duration-200',
        isExpanded ? 'w-48' : 'w-14',
      )}
    >
      {children}

      <div className="mb-4 ml-2">
        <Button
          size="icon"
          onClick={toggleSidebar}
          variant="ghost"
          className="rounded-full"
        >
          <ArrowLeft
            className={cn(isExpanded ? '' : 'rotate-180', 'transition-all')}
            size={16}
          />
        </Button>
      </div>
    </aside>
  )
}

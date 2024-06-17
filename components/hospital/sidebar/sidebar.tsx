'use client'

import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../../ui/button'
import SidebarItem from './sidebar-item'
import { SIDE_BAR_ITEMS } from '@/constants/hospital/sidebar/sidebar-items'

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebarStore()

  return (
    <aside
      data-state={isExpanded ? 'expanded' : 'collapse'}
      className={cn(
        'flex h-screen flex-col border-r transition-all duration-200',
        isExpanded ? 'w-48' : 'w-14',
      )}
    >
      <ul>
        {SIDE_BAR_ITEMS.map((item) => (
          <SidebarItem item={item} key={item.name} />
        ))}
      </ul>

      <div className="mb-4 ml-2 mt-auto">
        <Button
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full"
          variant="outline"
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

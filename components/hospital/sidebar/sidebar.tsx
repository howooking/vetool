'use client'

import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  Contact,
  HeartPulse,
  Home,
  ListChecks,
  Slice,
  Syringe,
} from 'lucide-react'
import { Button } from '../../ui/button'
import SidebarItem from './sidebar-item'

const SIDE_BAR_ITEMS = [
  {
    name: '병원 홈',
    path: '',
    icon: Home,
  },
  {
    name: '입원차트',
    path: 'icu',
    icon: Syringe,
  },
  {
    name: '외과차트',
    path: 'surgery',
    icon: Slice,
  },
  {
    name: '심초차트',
    path: 'echocardio',
    icon: HeartPulse,
  },
  {
    name: '건강검진차트',
    path: 'checkup',
    icon: ListChecks,
  },
] as const

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
          <SidebarItem {...item} key={item.name} />
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

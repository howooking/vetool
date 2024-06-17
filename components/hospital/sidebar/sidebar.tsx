'use client'

import { Switch } from '@/components/ui/switch'
import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CircleChevronLeft,
  CircleChevronRight,
  Contact,
  Home,
  UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip'
import { Button } from '../../ui/button'
import SidebarItem from './sidebar-item'

const SIDE_BAR_ITEMS = [
  {
    name: '병원 홈',
    path: '/',
    icon: Home,
  },
  {
    name: '입원실',
    path: '/icu',
    icon: Activity,
  },
  {
    name: '환자 등록',
    path: '/register',
    icon: UserPlus,
  },
  {
    name: '환자 조회',
    path: '/patients',
    icon: Contact,
  },
] as const

export default function Sidebar() {
  const pathname = usePathname()
  const hosId = pathname.split('/').at(2)
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

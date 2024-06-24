'use client'

import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import { Activity, ArrowLeft, Contact, Home, UserPlus } from 'lucide-react'
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
    path: '/patients/register',
    icon: UserPlus,
  },
  {
    name: '환자 조회',
    path: '/patients',
    icon: Contact,
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

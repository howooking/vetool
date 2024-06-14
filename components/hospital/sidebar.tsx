'use client'

import { Switch } from '@/components/ui/switch'
import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, Contact, Home, UserPlus } from 'lucide-react'

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
        'flex h-screen flex-col bg-primary text-white transition-all duration-200',
        isExpanded ? 'w-48' : 'w-14',
      )}
    >
      <ul className="sidebar-list-style">
        {SIDE_BAR_ITEMS.map((item, index) => (
          <li key={index}>
            <Link href={`/hospital/${hosId}${item.path}`} title={item.name}>
              {<item.icon size={20} />}
              <span
                className={cn(
                  'absolute left-12',
                  isExpanded ? 'block' : 'hidden',
                )}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Switch
        checked={isExpanded}
        onCheckedChange={toggleSidebar}
        className="mb-4 ml-2 mt-auto"
      />
    </aside>
  )
}

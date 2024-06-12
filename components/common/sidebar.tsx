'use client'

import { Switch } from '@/components/ui/switch'
import { SIDE_BAR_ITEMS } from '@/constants/common/sidebar'
import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const hosId = pathname.split('/').at(2)
  const { isExpanded, toggleSidebar } = useSidebarStore()

  return (
    <aside
      data-state={isExpanded ? 'expanded' : 'collapse'}
      className={cn(
        'flex min-h-[calc(100vh-48px)] flex-col bg-primary text-white transition-all duration-200',
        isExpanded ? 'w-48' : 'w-14',
      )}
    >
      {/* 사이드바 내용 */}
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

      {/* 사이드바 스위치 버튼 */}
      <Switch
        checked={isExpanded}
        onCheckedChange={toggleSidebar}
        className="mb-4 ml-2 mt-auto"
      />
    </aside>
  )
}

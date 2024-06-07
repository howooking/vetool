'use client'

import { Switch } from '@/components/ui/switch'
import { useSidebarStore } from '@/lib/store/sidebar'
import { cn } from '@/lib/utils'
import { Home, Hospital, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const hosId = pathname.split('/').at(2)
  const { isExpanded, toggleSidebar } = useSidebarStore()

  return (
    <nav
      data-state={isExpanded ? 'expanded' : 'collapse'}
      className={cn(
        'h-screen bg-gray-800 text-white transition-all duration-200',
        isExpanded ? 'w-48' : 'w-14',
      )}
    >
      {/* 사이드바 내용 */}
      <ul className="sidebar-list-style">
        <li>
          <Link href={`/hospital/${hosId}`}>
            <Hospital size={20} />
            <span
              className={cn(
                'absolute left-12',
                isExpanded ? 'block' : 'hidden',
              )}
            >
              병원 홈
            </span>
          </Link>
        </li>

        <li>
          <Link href={`/hospital/${hosId}/admin`}>
            <UserCheck size={20} />
            <span
              className={cn(
                'absolute left-12',
                isExpanded ? 'block' : 'hidden',
              )}
            >
              병원 관리
            </span>
          </Link>
        </li>
      </ul>

      {/* 사이드바 스위치 버튼 */}
      <Switch
        checked={isExpanded}
        onCheckedChange={toggleSidebar}
        className="mt-auto"
      />
    </nav>
  )
}

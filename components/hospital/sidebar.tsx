'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Contact,
  Home,
  NotepadText,
  UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
    name: '입원 차트',
    path: '/icu/chart',
    icon: NotepadText,
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
        {SIDE_BAR_ITEMS.map((item) => (
          <li key={item.name}>
            <TooltipProvider delayDuration={70}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/hospital/${hosId}${item.path}`}>
                    {<item.icon size={16} />}
                    <span
                      className={cn(
                        'absolute left-12',
                        isExpanded ? 'block' : 'hidden',
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
      </ul>

      <div className="mb-4 ml-2 mt-auto">
        <Button size="icon" onClick={toggleSidebar}>
          {isExpanded ? (
            <ArrowLeft className="text-white" size={16} />
          ) : (
            <ArrowRight className="text-white" size={16} />
          )}
        </Button>
      </div>
    </aside>
  )
}

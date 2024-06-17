'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useHospitalId from '@/hooks/useHospitalId'
import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SidebarItem({
  item,
}: {
  item: {
    name: string
    path: string
    icon: any
  }
}) {
  const { isExpanded } = useSidebarStore()
  const hospitalId = useHospitalId()
  const pathname = usePathname()

  const isActive =
    (pathname.split('/').length === 3 && item.path === '/') ||
    pathname.endsWith(item.path)

  return (
    <li key={item.name} className="transition-all hover:bg-muted">
      <TooltipProvider delayDuration={70}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/hospital/${hospitalId}${item.path}`}
              className={cn(
                'flex h-12 items-center',
                isActive && 'bg-primary text-white',
              )}
            >
              {<item.icon size={18} className="ml-[17px]" />}
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
  )
}

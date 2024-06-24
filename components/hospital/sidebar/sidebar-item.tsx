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
import { type LucideProps } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

export default function SidebarItem({
  name,
  path,
  icon: Icon,
}: {
  name: string
  path: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}) {
  const { isExpanded } = useSidebarStore()
  const hosId = useHospitalId()
  const pathname = usePathname()

  const isActive =
    (pathname.split('/').length === 3 && path === '/') ||
    pathname.endsWith(path)

  return (
    <li key={name} className="transition-all hover:bg-muted">
      <TooltipProvider delayDuration={70}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/hospital/${hosId}${path}`}
              className={cn(
                'flex h-12 items-center',
                isActive && 'bg-primary text-white',
              )}
            >
              <Icon size={18} className="ml-[17px]" />
              <span
                className={cn(
                  'absolute left-12',
                  isExpanded ? 'block' : 'hidden',
                )}
              >
                {name}
              </span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  )
}

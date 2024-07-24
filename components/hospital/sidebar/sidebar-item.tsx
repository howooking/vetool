'use client'

import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { type LucideProps } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
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
  const pathname = usePathname()
  const { hos_id } = useParams()

  const isActive =
    pathname.split('/').at(3) === path ||
    (!pathname.split('/').at(3) && name === '병원 홈')

  const dynamicPath =
    path === 'icu' ? `icu/${format(new Date(), 'yyyy-MM-dd')}` : path

  return (
    <li key={name} className="transition-all hover:bg-muted">
      {/* <TooltipProvider delayDuration={70}>
        <Tooltip>
          <TooltipTrigger asChild> */}
      <Link
        href={`/hospital/${hos_id}/${dynamicPath}`}
        className={cn(
          'flex h-12 items-center',
          isActive && 'bg-primary text-white',
        )}
      >
        <Icon size={18} className="ml-[17px]" />
        <span
          className={cn('absolute left-12', isExpanded ? 'block' : 'hidden')}
        >
          {name}
        </span>
      </Link>
      {/* </TooltipTrigger>
          <TooltipContent side="right">
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </li>
  )
}

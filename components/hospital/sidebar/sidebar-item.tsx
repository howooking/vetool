'use client'

import { useSidebarStore } from '@/lib/store/common/sidebar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  BarChart4,
  HeartPulse,
  Home,
  ListChecks,
  Slice,
  Syringe,
} from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

// server component에서 props로 전달이 안됨
const ICON_MAPPER = {
  Home: <Home size={18} className="ml-[17px]" />,
  Syringe: <Syringe size={18} className="ml-[17px]" />,
  Slice: <Slice size={18} className="ml-[17px]" />,
  HeartPulse: <HeartPulse size={18} className="ml-[17px]" />,
  ListChecks: <ListChecks size={18} className="ml-[17px]" />,
  BarChart4: <BarChart4 size={18} className="ml-[17px]" />,
}

export default function SidebarItem({
  name,
  path,
  iconName,
}: {
  name: string
  path: string
  iconName: string
}) {
  const { isExpanded } = useSidebarStore()
  const pathname = usePathname()
  const { hos_id } = useParams()

  const isActive =
    pathname.split('/').at(3) === path ||
    (!pathname.split('/').at(3) && name === '병원 홈')

  const dynamicPath =
    path === 'icu' ? `icu/${format(new Date(), 'yyyy-MM-dd')}/summary` : path

  return (
    <li key={name} className="transition-all hover:bg-muted">
      <Link
        href={`/hospital/${hos_id}/${dynamicPath}`}
        className={cn(
          'flex h-12 items-center',
          isActive && 'bg-primary text-white',
        )}
      >
        {ICON_MAPPER[iconName as keyof typeof ICON_MAPPER]}

        <span
          className={cn('absolute left-12', isExpanded ? 'block' : 'hidden')}
        >
          {name}
        </span>
      </Link>
    </li>
  )
}

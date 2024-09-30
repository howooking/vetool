'use client'

import { Button } from '@/components/ui/button'
import { useSidebarStore } from '@/lib/store/hospital/sidebar'
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
import { useParams, usePathname, useRouter } from 'next/navigation'

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
  isReady,
}: {
  name: string
  path: string
  iconName: string
  isReady: boolean
}) {
  const { isExpanded } = useSidebarStore()
  const pathname = usePathname()
  const { hos_id } = useParams()

  const isActive =
    pathname.split('/').at(3) === path ||
    (!pathname.split('/').at(3) && name === '병원 홈')

  const dynamicPath =
    path === 'icu' ? `icu/${format(new Date(), 'yyyy-MM-dd')}/summary` : path

  const { push } = useRouter()

  return (
    <li key={name}>
      <Button
        onClick={() => push(`/hospital/${hos_id}/${dynamicPath}`)}
        className={cn(
          isActive && 'bg-primary text-white',
          'relative flex h-12 w-full items-center rounded-none p-0',
        )}
        variant="ghost"
        disabled={!isReady}
      >
        <div className="absolute left-0.5">
          {ICON_MAPPER[iconName as keyof typeof ICON_MAPPER]}
        </div>

        <span
          className={cn('absolute left-12', isExpanded ? 'block' : 'hidden')}
        >
          {name}
        </span>
      </Button>
    </li>
  )
}

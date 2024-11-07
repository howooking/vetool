'use client'

import { Button } from '@/components/ui/button'
import CustomTooltip from '@/components/ui/custom-tooltip'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  BarChart4,
  Building,
  HeartPulse,
  Home,
  ListChecks,
  PawPrint,
  Slice,
  Syringe,
} from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'

// server component에서 props로 전달이 안됨
const ICON_MAPPER = {
  Home: <Home size={18} />,
  Syringe: <Syringe size={18} />,
  Slice: <Slice size={18} />,
  HeartPulse: <HeartPulse size={18} />,
  ListChecks: <ListChecks size={18} />,
  BarChart4: <BarChart4 size={18} />,
  PawPrint: <PawPrint size={18} />,
  Building: <Building size={18} />,
}

export default function SidebarItem({
  name,
  path,
  iconName,
  isReady,
  isSuper,
}: {
  name: string
  path: string
  iconName: string
  isReady: boolean
  isSuper: boolean
}) {
  const pathname = usePathname()
  const { hos_id } = useParams()
  const { push } = useRouter()

  const isActive = useMemo(
    () =>
      pathname.split('/').at(3) === path ||
      (!pathname.split('/').at(3) && name === '병원 홈'),
    [name, path, pathname],
  )

  const dynamicPath = useMemo(
    () =>
      path === 'icu' ? `icu/${format(new Date(), 'yyyy-MM-dd')}/summary` : path,
    [path],
  )

  const isSuperOnly = useMemo(
    () => name === '벳툴' && !isSuper,
    [isSuper, name],
  )

  return (
    <li key={name} className={isSuperOnly ? 'hidden' : ''}>
      <CustomTooltip
        contents={name}
        side="right"
        sideOffset={4}
        delayDuration={300}
      >
        <Button
          onClick={() => push(`/hospital/${hos_id}/${dynamicPath}`)}
          className={cn(
            isActive && 'bg-primary text-white',
            'h-12 w-full rounded-none',
          )}
          variant="ghost"
          disabled={!isReady}
        >
          {ICON_MAPPER[iconName as keyof typeof ICON_MAPPER]}
        </Button>
      </CustomTooltip>
    </li>
  )
}

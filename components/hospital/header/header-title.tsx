'use client'

import { SIDE_BAR_ITEMS } from '@/constants/hospital/sidebar/sidebar-items'
import { usePathname } from 'next/navigation'

export default function HeaderTitle() {
  const pathname = usePathname()

  const title =
    SIDE_BAR_ITEMS.find((item) => pathname.endsWith(item.path))?.name ??
    '병원 홈'

  return <h1 className="text-lg font-semibold text-primary">{title}</h1>
}

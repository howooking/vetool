'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SIDE_BAR_ITEMS } from '@/constants/hospital/sidebar-items'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  HeartPulse,
  Home,
  ListChecks,
  Menu,
  Slice,
  Syringe,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SidebarUserInfo from './sidebar-user-info'

const ICON_MAPPER = {
  Home: <Home size={18} className="ml-[17px]" />,
  Syringe: <Syringe size={18} className="ml-[17px]" />,
  Slice: <Slice size={18} className="ml-[17px]" />,
  HeartPulse: <HeartPulse size={18} className="ml-[17px]" />,
  ListChecks: <ListChecks size={18} className="ml-[17px]" />,
}

export default function MobileSidebar({
  hosId,
  userData,
  hosName,
}: {
  hosId: string
  userData: {
    email: string | null
    name: string
    avatar_url: string | null
    position: string
    is_admin: boolean
    user_id: string
  }
  hosName: string
}) {
  const pathname = usePathname()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="absolute left-1 top-1.5 z-30 md:hidden" asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetHeader className="h-12 space-y-0">
          <SheetTitle className="text-md my-auto pl-4 text-left">
            {hosName}
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <ul className="z-50">
          {SIDE_BAR_ITEMS.map(({ path, name, iconName }) => {
            const isActive =
              pathname.split('/').at(3) === path ||
              (!pathname.split('/').at(3) && name === '병원 홈')
            const dynamicPath =
              path === 'icu' ? `icu/${format(new Date(), 'yyyy-MM-dd')}` : path
            return (
              <li
                key={name}
                className="transition-all hover:bg-muted"
                onClick={() => setIsSheetOpen(false)}
              >
                <Link
                  href={`/hospital/${hosId}/${dynamicPath}`}
                  className={cn(
                    'flex h-12 items-center',
                    isActive && 'bg-primary text-white',
                  )}
                >
                  {ICON_MAPPER[iconName as keyof typeof ICON_MAPPER]}

                  <span className={cn('absolute left-12')}>{name}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <SidebarUserInfo hosId={hosId} userData={userData} />
      </SheetContent>
    </Sheet>
  )
}

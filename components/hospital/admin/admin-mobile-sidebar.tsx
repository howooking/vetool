'use client'

import { ADMIN_SIDE_BAR_ITEMS } from '@/app/hospital/[hos_id]/admin/layout'
import AdminSidebarItem from '@/components/hospital/admin/admin-sidebar-item'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function AdminMobileSidebar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const path = usePathname()
  const currentAdminPath = path.split('/').at(-1)

  const activePath = ADMIN_SIDE_BAR_ITEMS.find(
    (item) => item.path === currentAdminPath,
  )

  return (
    <div className="flex items-center gap-2 border-b md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button className="rounded-none" size="icon">
            <Menu size={18} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
          <ul className="flex flex-col gap-2 p-2">
            {ADMIN_SIDE_BAR_ITEMS.map((item) => (
              <AdminSidebarItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                path={item.path}
                setIsSheetOpen={setIsSheetOpen}
              />
            ))}
          </ul>
        </SheetContent>
      </Sheet>

      <div className="w-full pr-9 text-center font-semibold">
        {activePath?.name}
      </div>
    </div>
  )
}

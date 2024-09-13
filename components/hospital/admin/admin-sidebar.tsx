'use client'

import { ADMIN_SIDE_BAR_ITEMS } from '@/app/hospital/[hos_id]/admin/layout'
import AdminSidebarItem from '@/components/hospital/admin/admin-sidebar-item'

export default function AdminSidebar() {
  return (
    <aside className="hidden h-icu-chart w-48 border-r md:block">
      <ul className="flex flex-col gap-2 p-2">
        {ADMIN_SIDE_BAR_ITEMS.map((item) => (
          <AdminSidebarItem
            key={item.name}
            icon={item.icon}
            name={item.name}
            path={item.path}
          />
        ))}
      </ul>
    </aside>
  )
}

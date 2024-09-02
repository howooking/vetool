'use client'

import AdminSidebarItem from '@/components/hospital/admin/admin-sidebar-item'
import {
  BarChart3,
  Pill,
  TestTubeDiagonal,
  UserCheck,
  Users,
  Utensils,
  Syringe,
} from 'lucide-react'

const ADMIN_SIDE_BAR_ITEMS = [
  {
    name: '스태프관리',
    path: 'staff',
    icon: Users,
  },
  {
    name: '사용승인',
    path: 'approval',
    icon: UserCheck,
  },
  {
    name: '입원차트 설정',
    path: 'icu-settings',
    icon: Syringe,
  },
  {
    name: '데이터분석',
    path: 'statistics',
    icon: BarChart3,
  },
  {
    name: '약물설정',
    path: 'drug-settings',
    icon: Pill,
  },
  {
    name: '사료설정',
    path: 'food-settings',
    icon: Utensils,
  },
  {
    name: '검사설정',
    path: 'test-settings',
    icon: TestTubeDiagonal,
  },
]

export default function AdminSidebar() {
  return (
    <aside className="h-[calc(100vh-48px)] w-48 border-r">
      <ul className="flex flex-col gap-2 p-2">
        {ADMIN_SIDE_BAR_ITEMS.map((item) => (
          <AdminSidebarItem key={item.name} {...item} />
        ))}
      </ul>
    </aside>
  )
}

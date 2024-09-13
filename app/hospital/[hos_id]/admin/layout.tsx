import AdminMobileSidebar from '@/components/hospital/admin/admin-mobile-sidebar'
import AdminSidebar from '@/components/hospital/admin/admin-sidebar'
import {
  BarChart3,
  Pill,
  Syringe,
  TestTubeDiagonal,
  UserCheck,
  Users,
  Utensils,
} from 'lucide-react'

export const ADMIN_SIDE_BAR_ITEMS = [
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
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar />

      <AdminMobileSidebar />

      <div className="w-full p-2">{children}</div>
    </div>
  )
}

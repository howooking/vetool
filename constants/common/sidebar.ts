import { Home, Hospital, UserPlus, Contact } from 'lucide-react'

// root/hospital/{hos_id}/
export const SIDE_BAR_ITEMS = [
  {
    name: '병원 홈',
    path: '/',
    icon: Home,
  },
  {
    name: '병원 관리',
    path: '/admin',
    icon: Hospital,
  },
  {
    name: '환자 등록',
    path: '/register',
    icon: UserPlus,
  },
  {
    name: '환자 조회',
    path: '/patients',
    icon: Contact,
  },
] as const

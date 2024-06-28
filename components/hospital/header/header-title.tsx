'use client'

import { usePathname } from 'next/navigation'

export const HOSPITAL_ROUTES = {
  icu: '입원차트',
  register: '환자 등록',
  patients: '환자 조회',
  admin: '관리자',
  'drug-settings': '약물설정',
  statistics: '데이터분석',
  staff: '스태프관리',
  approval: '사용승인',
  'test-settings': '검사설정',
  'food-settings': '사료설정',
  surgery: '외과차트',
  echocardio: '심초차트',
  checkup: '건강검진차트',
} as const

export default function HeaderTitle() {
  const pathname = usePathname()

  const title =
    HOSPITAL_ROUTES[
      pathname.split('/').at(-1) as keyof typeof HOSPITAL_ROUTES
    ] ?? '병원 홈'

  return <h1 className="text-xl font-semibold text-primary">{title}</h1>
}

'use client'

import { usePathname } from 'next/navigation'

export const HOSPITAL_ROUTES = {
  icu: '입원실',
  register: '환자 등록',
  patients: '환자 조회',
  admin: '관리자',
} as const

export default function HeaderTitle() {
  const pathname = usePathname()

  const title =
    HOSPITAL_ROUTES[
      pathname.split('/').at(-1) as keyof typeof HOSPITAL_ROUTES
    ] ?? '병원 홈'

  return <h1 className="text-lg font-semibold text-primary">{title}</h1>
}

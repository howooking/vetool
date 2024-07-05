import { usePathname } from 'next/navigation'
import React from 'react'

export default function useHospitalId() {
  const pathname = usePathname()
  const hosId = pathname.split('/').at(2)
  return hosId
}

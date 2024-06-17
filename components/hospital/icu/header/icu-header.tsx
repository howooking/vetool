'use client'

import IcuAddPatientTrigger from '@/components/hospital/icu/header/icu-add-patient-trigger'
import IcuDateSelector from '@/components/hospital/icu/header/icu-date-selector'
import { usePathname } from 'next/navigation'

export default function IcuHeader() {
  const pathname = usePathname()

  return (
    <>
      {pathname.endsWith('icu') ? (
        <div className="flex items-center gap-2">
          <IcuDateSelector />
          <IcuAddPatientTrigger />
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

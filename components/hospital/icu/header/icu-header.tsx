'use client'

import IcuAddPatientTrigger from '@/components/hospital/icu/header/icu-add-patient-trigger'
import IcuHeaderDateSelector from '@/components/hospital/icu/header/icu-header-date-selector'
import { usePathname } from 'next/navigation'

export default function IcuHeader() {
  const pathname = usePathname()

  return (
    <>
      {pathname.endsWith('icu') ? (
        <div className="flex items-center gap-8 px-4">
          <IcuHeaderDateSelector />
          <IcuAddPatientTrigger />
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

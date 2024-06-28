'use client'

import { usePathname } from 'next/navigation'
import { PatientRegisterDialog } from './patient-register-dialog'

export default function PatientsHeader({ hosId }: { hosId: string }) {
  const pathname = usePathname()

  return (
    <>{pathname.split('/').at(3) === 'patients' && <PatientRegisterDialog />}</>
  )
}

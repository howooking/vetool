'use client'

import { Button } from '@/components/ui/button'
import { useAddPatientTriggerStore } from '@/lib/store/hospital/icu/add-patient'

export default function IcuAddPatientTrigger() {
  const { setIsOpen } = useAddPatientTriggerStore()
  const handleClick = () => setIsOpen()

  return (
    <Button type="button" onClick={handleClick}>
      입원 환자 등록
    </Button>
  )
}

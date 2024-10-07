'use client'

import CustomTooltip from '@/components/ui/custom-tooltip'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updatePatientMovement } from '@/lib/services/icu/movement/update-patient-movement'
import { useEffect, useState } from 'react'

export default function MovementChecklistInput({
  icuIoId,
  value,
  checkType,
  isDischarged,
  visitId,
}: {
  icuIoId: string
  value: string
  checkType: string
  isDischarged: boolean
  visitId?: string
}) {
  const [inputValue, setInputValue] = useState(value)

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim()

    if (trimmedValue.length <= 50) setInputValue(trimmedValue)
  }

  const handleUpdateChecklist = async () => {
    if (value === inputValue) return

    await updatePatientMovement(icuIoId, inputValue, checkType, visitId)

    toast({
      title: `관리 사항이 변경되었습니다`,
    })
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <CustomTooltip
      side="top"
      sideOffset={4}
      delayDuration={300}
      contents={inputValue}
      variant="secondary"
    >
      <Input
        disabled={isDischarged}
        value={inputValue}
        onChange={handleValueChange}
        onBlur={handleUpdateChecklist}
        className="mx-auto w-16 text-center md:w-auto md:max-w-32"
      />
    </CustomTooltip>
  )
}

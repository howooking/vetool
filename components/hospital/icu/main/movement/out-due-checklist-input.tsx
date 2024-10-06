'use client'

import CustomTooltip from '@/components/ui/custom-tooltip'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateIcuOutDuePatient } from '@/lib/services/icu/movement/update-icu-out-due-patient'
import { useState } from 'react'

export default function OutDueChecklistInput({
  hosId,
  icuIoId,
  isDischarged,
  value,
  checkType,
}: {
  hosId: string
  icuIoId: string
  isDischarged: boolean
  value: string
  checkType:
    | 'basic_care'
    | 'belongings'
    | 'prescription'
    | 'medication'
    | 'out_time'
    | 'etc'
}) {
  const [inputValue, setInputValue] = useState(value)

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim()

    if (trimmedValue.length <= 50) setInputValue(trimmedValue)
  }

  const updateOutDueChecklist = async () => {
    if (value === inputValue) return

    await updateIcuOutDuePatient(hosId, icuIoId, inputValue, checkType)

    toast({
      title: `퇴원 관리 사항이 변경되었습니다`,
    })
  }

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
        onBlur={updateOutDueChecklist}
        className="mx-auto w-16 text-center md:w-auto md:max-w-24"
      />
    </CustomTooltip>
  )
}

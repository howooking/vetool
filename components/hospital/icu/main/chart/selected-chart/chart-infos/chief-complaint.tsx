'use client'

import AutoComplete from '@/components/hospital/common/auto-complete/auto-complete'
import { toast } from '@/components/ui/use-toast'
import { updateChiefComplaint } from '@/lib/services/icu/update-icu-chart-infos'
import { useState } from 'react'

export default function ChiefComplaint({
  chiefComplaint,
  icuChartId,
}: {
  chiefComplaint: string
  icuChartId: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateChiefComplaint = async (value: string) => {
    const trimmedValue = value.trim()
    if (!trimmedValue || chiefComplaint === trimmedValue) {
      return
    }

    setIsUpdating(true)

    await updateChiefComplaint(icuChartId, trimmedValue)

    toast({
      title: '주증상을 변경하였습니다',
    })

    setIsUpdating(false)
  }

  return (
    <div className="relative flex w-full items-center">
      <AutoComplete
        label="CC"
        defaultValue={chiefComplaint}
        isUpdating={isUpdating}
        handleChange={handleUpdateChiefComplaint}
      />
    </div>
  )
}

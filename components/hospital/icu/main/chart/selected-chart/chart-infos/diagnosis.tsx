'use client'

import Autocomplete from '@/components/hospital/common/auto-complete/auto-complete'
import { toast } from '@/components/ui/use-toast'
import { updateDiagnosis } from '@/lib/services/icu/update-icu-chart-infos'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Diagnosis({
  diagnosis,
  icuChartId,
}: {
  diagnosis: string
  icuChartId: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateDiagnosis = async (value: string) => {
    const trimmedValue = value.trim()

    if (diagnosis === trimmedValue) {
      return
    }

    setIsUpdating(true)

    await updateDiagnosis(icuChartId, trimmedValue)

    toast({
      title: '진단명을 변경하였습니다',
    })

    setIsUpdating(false)
  }

  return (
    <Autocomplete
      label="DX"
      handleUpdate={handleUpdateDiagnosis}
      defaultValue={diagnosis}
      isUpdating={isUpdating}
    />
  )
}

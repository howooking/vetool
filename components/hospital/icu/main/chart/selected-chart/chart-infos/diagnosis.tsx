'use client'

import AutoComplete from '@/components/hospital/common/auto-complete/auto-complete'
import { toast } from '@/components/ui/use-toast'
import { updateDiagnosis } from '@/lib/services/icu/update-icu-chart-infos'
import { useEffect, useState } from 'react'

export default function Diagnosis({
  diagnosis,
  icuChartId,
}: {
  diagnosis: string
  icuChartId: string
}) {
  const [diagnosisInput, setDiagnosisInput] = useState(diagnosis)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateDiagnosis = async (value: string) => {
    const trimmedValue = value.trim()

    if (!trimmedValue || diagnosis === trimmedValue) {
      return
    }

    setIsUpdating(true)

    await updateDiagnosis(icuChartId, value)

    toast({
      title: '진단명을 변경하였습니다',
    })

    setIsUpdating(false)
  }

  return (
    <div className="relative flex items-center">
      <AutoComplete
        label="DX"
        defaultValue={diagnosis}
        handleChange={handleUpdateDiagnosis}
        isUpdating={isUpdating}
      />
    </div>
  )
}

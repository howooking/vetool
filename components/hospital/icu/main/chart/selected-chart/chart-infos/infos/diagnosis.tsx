'use client'

import AutoComplete from '@/components/hospital/common/auto-complete'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
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

  const handleUpdateDiagnosis = async () => {
    if (diagnosisInput.trim() === '') {
      setDiagnosisInput(diagnosis)
    } else {
      if (diagnosis === diagnosisInput.trim()) {
        setDiagnosisInput(diagnosisInput.trim())
        return
      }

      setIsUpdating(true)
      // await updateDiagnosis(icuChartId, diagnosisInput.trim())

      toast({
        title: '진단명을 변경하였습니다',
      })

      setIsUpdating(false)
    }
  }

  useEffect(() => {
    setDiagnosisInput(diagnosis)
  }, [diagnosis])

  return (
    <div className="relative flex items-center">
      <Label
        className="absolute left-2 top-[10px] z-10 text-xs text-muted-foreground"
        htmlFor="diagnosis"
      >
        DX
      </Label>
      <AutoComplete
        inputValue={diagnosisInput}
        setInputValue={setDiagnosisInput}
        isUpdating={isUpdating}
        handleUpdateDiagnosis={handleUpdateDiagnosis}
        diagnosis={diagnosis}
      />
    </div>
  )
}

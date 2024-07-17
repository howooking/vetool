'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  const [diagnosisInput, setDiagnosisInput] = useState(diagnosis)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  const handleUpdateDiagnosis = async () => {
    if (diagnosisInput.trim() === '') {
      setDiagnosisInput(diagnosis)
    } else {
      if (diagnosis === diagnosisInput.trim()) {
        setDiagnosisInput(diagnosisInput.trim())
        return
      }

      setIsUpdating(true)
      await updateDiagnosis(icuChartId, diagnosisInput.trim())

      toast({
        title: '진단명을 변경하였습니다',
      })

      setIsUpdating(false)
      refresh()
    }
  }

  useEffect(() => {
    setDiagnosisInput(diagnosis)
  }, [diagnosis])

  return (
    <div className="relative flex items-center">
      <Label
        className="absolute left-2 text-xs text-muted-foreground"
        htmlFor="diagnosis"
      >
        DX
      </Label>
      <Input
        disabled={isUpdating}
        id="diagnosis"
        value={diagnosisInput}
        placeholder="진단명"
        onChange={(e) => setDiagnosisInput(e.target.value)}
        onBlur={handleUpdateDiagnosis}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-full pl-8"
        title={diagnosis}
      />
    </div>
  )
}

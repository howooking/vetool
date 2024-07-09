'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { updateDiagnosis } from '@/lib/services/hospital/icu/update-icu-chart-infos'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Diagnosis({
  diagnosis,
  icuIoId,
}: {
  diagnosis: string
  icuIoId: string
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
      await updateDiagnosis(icuIoId, diagnosisInput.trim())

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
        className="absolute left-3 text-sm text-muted-foreground"
        htmlFor="diagnosis"
      >
        Dx
      </Label>
      <Input
        disabled={isUpdating}
        id="diagnosis"
        value={diagnosisInput}
        placeholder="진단명"
        onChange={(e) => setDiagnosisInput(e.target.value)}
        onBlur={handleUpdateDiagnosis}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-48 pl-9"
        title={diagnosis}
      />
    </div>
  )
}

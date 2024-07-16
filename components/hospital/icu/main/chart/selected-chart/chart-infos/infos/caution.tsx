'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { updateCaution } from '@/lib/services/icu/update-icu-chart-infos'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Caution({
  caution,
  icuChartId,
}: {
  caution: string
  icuChartId: string
}) {
  const [cautionInput, setCautionInput] = useState(caution)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  const handleUpdateDiagnosis = async () => {
    if (cautionInput.trim() === '') {
      setCautionInput(caution)
    } else {
      if (caution === cautionInput.trim()) {
        setCautionInput(cautionInput.trim())
        return
      }

      setIsUpdating(true)
      await updateCaution(icuChartId, cautionInput.trim())

      toast({
        title: '주의사항을 변경하였습니다',
      })

      setIsUpdating(false)
      refresh()
    }
  }

  useEffect(() => {
    setCautionInput(caution)
  }, [caution])

  return (
    <div className="relative">
      <Label
        className="absolute left-2 top-[11px] text-xs text-muted-foreground"
        htmlFor="caution"
      >
        주의사항
      </Label>
      <Input
        disabled={isUpdating}
        id="caution"
        value={cautionInput}
        onChange={(e) => setCautionInput(e.target.value)}
        onBlur={handleUpdateDiagnosis}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-full pl-14"
        title={caution}
      />
    </div>
  )
}

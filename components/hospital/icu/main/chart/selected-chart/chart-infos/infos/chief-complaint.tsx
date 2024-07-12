'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { updateChiefComplaint } from '@/lib/services/icu/update-icu-chart-infos'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ChiefComplaint({
  chiefComplaint,
  icuIoId,
}: {
  chiefComplaint: string
  icuIoId: string
}) {
  const [chiefComplaintInput, setChiefComplaintInput] = useState(chiefComplaint)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  const handleUpdateDiagnosis = async () => {
    if (chiefComplaintInput.trim() === '') {
      setChiefComplaintInput(chiefComplaint)
    } else {
      if (chiefComplaint === chiefComplaintInput.trim()) {
        setChiefComplaintInput(chiefComplaintInput.trim())
        return
      }

      setIsUpdating(true)
      await updateChiefComplaint(icuIoId, chiefComplaintInput.trim())

      toast({
        title: '주증상을 변경하였습니다',
      })

      setIsUpdating(false)
      refresh()
    }
  }

  useEffect(() => {
    setChiefComplaintInput(chiefComplaint)
  }, [chiefComplaint])

  return (
    <div className="relative flex items-center">
      <Label
        className="absolute left-2 text-xs text-muted-foreground"
        htmlFor="chiefComplaint"
      >
        CC
      </Label>
      <Input
        disabled={isUpdating}
        id="chiefComplaint"
        value={chiefComplaintInput}
        placeholder="주증상"
        onChange={(e) => setChiefComplaintInput(e.target.value)}
        onBlur={handleUpdateDiagnosis}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-full pl-8"
        title={chiefComplaint}
      />
    </div>
  )
}

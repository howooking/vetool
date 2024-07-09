'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { updateChiefComplaint } from '@/lib/services/hospital/icu/update-icu-chart-infos'
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
  const { refresh } = useRouter()

  const handleUpdateDiagnosis = async () => {
    if (chiefComplaintInput.trim() === '') {
      setChiefComplaintInput(chiefComplaint)
    } else {
      if (chiefComplaint === chiefComplaintInput.trim()) {
        setChiefComplaintInput(chiefComplaintInput.trim())
        return
      }

      await updateChiefComplaint(icuIoId, chiefComplaintInput.trim())

      toast({
        title: '주증상을 변경하였습니다',
      })

      refresh()
    }
  }

  useEffect(() => {
    setChiefComplaintInput(chiefComplaint)
  }, [chiefComplaint])

  return (
    <div className="relative flex items-center gap-2">
      <Label
        className="absolute left-3 text-sm text-muted-foreground"
        htmlFor="chiefComplaint"
      >
        CC
      </Label>
      <Input
        id="chiefComplaint"
        value={chiefComplaintInput}
        placeholder="주증상을 입력해주세요"
        onChange={(e) => setChiefComplaintInput(e.target.value)}
        onBlur={handleUpdateDiagnosis}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-48 pl-10"
        title={chiefComplaint}
      />
    </div>
  )
}

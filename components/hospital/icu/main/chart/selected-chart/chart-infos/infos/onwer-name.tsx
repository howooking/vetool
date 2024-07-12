'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { updateOwnerName } from '@/lib/services/icu/update-icu-chart-infos'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function OwnerName({
  ownerName,
  patientId,
}: {
  ownerName: string
  patientId: string
}) {
  const [ownnerNameInput, setOwnerNameInput] = useState(ownerName)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  const handleUpdateDiagnosis = async () => {
    if (ownerName === ownnerNameInput.trim()) {
      setOwnerNameInput(ownnerNameInput.trim())
      return
    }

    setIsUpdating(true)
    await updateOwnerName(patientId, ownnerNameInput.trim())

    toast({
      title: '보호자명을 변경하였습니다',
    })

    setIsUpdating(false)
    refresh()
  }

  useEffect(() => {
    setOwnerNameInput(ownerName)
  }, [ownerName])

  return (
    <div className="relative flex items-center">
      <Label
        className="absolute left-2 text-xs text-muted-foreground"
        htmlFor="diagnosis"
      >
        보호자
      </Label>
      <Input
        disabled={isUpdating}
        id="diagnosis"
        value={ownnerNameInput}
        onChange={(e) => setOwnerNameInput(e.target.value)}
        onBlur={handleUpdateDiagnosis}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-full pl-11"
        title={ownerName ?? ''}
      />
    </div>
  )
}

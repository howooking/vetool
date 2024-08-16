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
  const [ownerNameInput, setOwnerNameInput] = useState(ownerName)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  const handleUpdateOwnerName = async () => {
    if (ownerName === ownerNameInput.trim()) {
      setOwnerNameInput(ownerNameInput.trim())
      return
    }

    setIsUpdating(true)
    await updateOwnerName(patientId, ownerNameInput.trim())

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
        htmlFor="ownerName"
      >
        보호자
      </Label>
      <Input
        disabled={isUpdating}
        id="ownerName"
        value={ownerNameInput}
        onChange={(e) => setOwnerNameInput(e.target.value)}
        onBlur={handleUpdateOwnerName}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-full pl-11"
        title={ownerName ?? ''}
      />
    </div>
  )
}

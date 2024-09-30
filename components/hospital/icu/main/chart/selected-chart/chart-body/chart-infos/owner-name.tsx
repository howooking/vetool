'use client'

import CustomTooltip from '@/components/ui/custom-tooltip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { updateOwnerName } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { User } from 'lucide-react'
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
        <CustomTooltip contents="보호자 이름" variant="secondary" side="left">
          <User size={16} className="text-muted-foreground" />
        </CustomTooltip>
      </Label>
      <Input
        placeholder="보호자"
        disabled={isUpdating}
        id="ownerName"
        value={ownerNameInput}
        onChange={(e) => setOwnerNameInput(e.target.value)}
        onBlur={handleUpdateOwnerName}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        className="w-full pl-8"
        title={ownerName ?? ''}
      />
    </div>
  )
}

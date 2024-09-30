'use client'

import CustomTooltip from '@/components/ui/custom-tooltip'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { updateCpcr } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { Activity } from 'lucide-react'
import { useState } from 'react'

export default function Cpcr({
  cpcr,
  icuIoId,
}: {
  cpcr: string
  icuIoId: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateCpcr = async (value: string) => {
    if (cpcr === value) {
      return
    }

    setIsUpdating(true)
    await updateCpcr(icuIoId, value)

    toast({
      title: 'CPCR 여부를 변경하였습니다',
    })

    setIsUpdating(false)
  }

  return (
    <Select onValueChange={handleUpdateCpcr} disabled={isUpdating} value={cpcr}>
      <SelectTrigger className="relative pl-8">
        <SelectValue />
        <span className="absolute left-2">
          <CustomTooltip
            contents="심폐소생여부"
            side="left"
            variant="secondary"
          >
            <Activity className="text-muted-foreground" size={16} />
          </CustomTooltip>
        </span>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value="CPCR">CPCR</SelectItem>
          <SelectItem value="DNR">DNR</SelectItem>
          <SelectItem value="unspecified">미지정</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

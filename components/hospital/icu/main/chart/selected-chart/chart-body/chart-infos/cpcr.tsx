import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { updateCpcr } from '@/lib/services/icu/update-icu-chart-infos'
import { Activity } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Cpcr({
  cpcr,
  icuIoId,
}: {
  cpcr: string
  icuIoId: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [cpcrState, setCpcrState] = useState(cpcr)

  const handleUpdateCpcr = async (value: string) => {
    if (cpcr === value) {
      return
    }

    setIsUpdating(true)
    setCpcrState(value)
    await updateCpcr(icuIoId, value)

    toast({
      title: 'CPCR 여부를 변경하였습니다',
    })

    setIsUpdating(false)
  }

  useEffect(() => {
    setCpcrState(cpcr)
  }, [cpcr])

  return (
    <Select
      onValueChange={handleUpdateCpcr}
      disabled={isUpdating}
      value={cpcrState}
    >
      <SelectTrigger className="relative pl-8">
        <SelectValue />
        <span className="absolute left-2">
          <Activity className="text-muted-foreground" size={16} />
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
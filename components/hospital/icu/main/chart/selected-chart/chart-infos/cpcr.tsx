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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Cpcr({
  cpcr,
  icuIoId,
}: {
  cpcr: string
  icuIoId: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

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
    refresh()
  }

  return (
    <Select
      defaultValue={cpcr}
      onValueChange={handleUpdateCpcr}
      disabled={isUpdating}
    >
      <SelectTrigger>
        <SelectValue className="justify-center" />
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

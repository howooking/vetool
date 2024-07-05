import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useHospitalId from '@/hooks/use-hospital-id'
import { createClient } from '@/lib/supabase/client'
import type { Vet } from '@/types/hospital'
import { useState } from 'react'

export default function IcuChartTxVetsSelect({
  vetsData,
}: {
  vetsData: Vet[]
}) {
  const [vetValue, setVetValue] = useState('')
  const supabase = createClient()
  const hosId = useHospitalId()

  return (
    <Select
      onValueChange={(currentValue) => {
        setVetValue(currentValue)
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="담당자 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {vetsData.map((vets) => (
            <SelectItem key={vets.user_id} value={vets.user_id}>
              <div className="flex items-center gap-2 font-normal">
                <span>{vets.name}</span>
                <span className="text-xs text-muted-foreground">
                  {vets.position}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

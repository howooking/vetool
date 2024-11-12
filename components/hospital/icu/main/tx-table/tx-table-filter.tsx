import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { cn } from '@/lib/utils/utils'
import { Dispatch, SetStateAction } from 'react'

export default function TxTableFilter({
  localFilterState,
  setLocalFilterState,
}: {
  localFilterState: string
  setLocalFilterState: Dispatch<SetStateAction<string>>
}) {
  return (
    <Select value={localFilterState} onValueChange={setLocalFilterState}>
      <SelectTrigger
        className={cn(
          'relative mb-2 w-[180px] md:absolute md:right-3 md:top-1',
          localFilterState !== 'all' && 'pl-7',
        )}
      >
        {localFilterState !== 'all' && (
          <span className="absolute left-3 top-[13px] inline-flex h-2 w-2 animate-ping rounded-full bg-primary" />
        )}
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem key={'all'} value={'all'}>
          {'전체'}
        </SelectItem>

        {DEFAULT_ICU_ORDER_TYPE.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

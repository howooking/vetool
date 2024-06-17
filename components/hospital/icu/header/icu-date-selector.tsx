'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import IcuDatePicker from './icu-date-picker'
import { format } from 'date-fns'
import { useSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'

export default function IcuDateSelector() {
  const { selectedDate } = useSelectedDateStore()

  const updateDate = (days: number) => {
    const newDate = new Date(selectedDate)

    newDate.setDate(newDate.getDate() + days)
    useSelectedDateStore.setState({
      selectedDate: format(newDate, 'yyyy-MM-dd'),
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => updateDate(-1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
      >
        <ArrowLeftIcon />
      </Button>

      <div className="flex items-center gap-1">
        <span className="min-w-20 text-sm">{selectedDate}</span>
        <IcuDatePicker />
      </div>

      <Button
        onClick={() => updateDate(1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  )
}

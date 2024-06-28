'use client'

import IcuHeaderDatePicker from '@/components/hospital/icu/header/icu-header-date-picker'
import { Button } from '@/components/ui/button'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

export default function IcuHeaderDateSelector() {
  const { selectedDate, setSelectedDate } = useIcuSelectedDateStore()

  const updateDate = (days: number) => {
    const newDate = new Date(selectedDate)

    newDate.setDate(newDate.getDate() + days)
    setSelectedDate(format(newDate, 'yyyy-MM-dd'))
  }

  return (
    // TODO BG CHANGE
    <div className="absolute left-3 top-3 flex items-center gap-2 bg-white">
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
        <IcuHeaderDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
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

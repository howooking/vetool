'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import { useState } from 'react'

export default function IcuHeaderDatePicker() {
  const { selectedDate } = useSelectedDateStore()
  const [open, setOpen] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    useSelectedDateStore.setState({
      selectedDate: format(date!, 'yyyy-MM-dd'),
    })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex h-6 w-6 items-center justify-center rounded-full"
        >
          <CalendarDays className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          className="text-sm"
          styles={{
            button: { fontSize: 12 },
          }}
          captionLayout="dropdown-buttons"
          showOutsideDays
          fixedWeeks
          locale={ko}
          mode="single"
          initialFocus
          selected={new Date(selectedDate)}
          onSelect={(date) => handleSelect(date)}
        />
      </PopoverContent>
    </Popover>
  )
}

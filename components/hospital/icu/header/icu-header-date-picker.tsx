'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import { useState } from 'react'

export default function IcuHeaderDatePicker({
  selectedDate,
  setSelectedDate,
  onChange,
}: {
  selectedDate: string
  setSelectedDate: (date: string) => void
  onChange?: (date: string) => Promise<void>
}) {
  const [open, setOpen] = useState(false)

  const handleSelectDate = (date: Date | undefined) => {
    const formattedDate = format(date!, 'yyyy-MM-dd')
    setSelectedDate(formattedDate)
    setOpen(false)

    if (onChange) onChange(formattedDate)
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
          onSelect={(date) => handleSelectDate(date)}
        />
      </PopoverContent>
    </Popover>
  )
}

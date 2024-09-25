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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { DATE_REGEX } from './header-date-selector'

export default function HeaderDatePicker({
  targetDate,
}: {
  targetDate: string
}) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const [open, setOpen] = useState(false)
  const path = usePathname()
  const { push } = useRouter()

  const handleSelectDate = (date: Date | undefined) => {
    const formattedDate = format(date!, 'yyyy-MM-dd')
    const newPath = `${path.replace(DATE_REGEX, `/${formattedDate}/`)}?${params.toString()}`
    push(newPath)
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
          selected={new Date(targetDate)}
          onSelect={(date) => handleSelectDate(date)}
        />
      </PopoverContent>
    </Popover>
  )
}

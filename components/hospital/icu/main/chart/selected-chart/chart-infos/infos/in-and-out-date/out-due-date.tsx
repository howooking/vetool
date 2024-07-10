'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { updateOutDueDate } from '@/lib/services/icu/update-icu-chart-infos'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function OutDueDate({
  inDate,
  outDueDate,
  icuIoId,
}: {
  inDate: string
  outDueDate: string
  icuIoId: string
}) {
  const [outDueDateInput, setOutDueDateInput] = useState<Date | undefined>(
    new Date(outDueDate),
  )

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const { refresh } = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateOutDueDate = async (date: Date | undefined) => {
    if (!date) {
      setOutDueDateInput(new Date(outDueDate))
      setIsPopoverOpen(false)
      return
    }

    setIsUpdating(true)

    await updateOutDueDate(icuIoId, format(date, 'yyyy-MM-dd'))

    toast({
      title: '퇴원예정일을 변경하였습니다',
    })

    setIsUpdating(false)
    setIsPopoverOpen(false)
    refresh()
  }

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'flex w-full flex-1 items-center justify-start gap-2 px-2',
              !outDueDateInput && 'text-muted-foreground',
            )}
          >
            <span className="text-xs text-muted-foreground">퇴원예정</span>
            {outDueDateInput ? (
              <span className="text-sm font-normal">
                {format(outDueDateInput, 'yyyy-MM-dd')}
              </span>
            ) : (
              <span>예정일 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={ko}
            mode="single"
            selected={outDueDateInput}
            onSelect={(date) => {
              setOutDueDateInput(date)
              handleUpdateOutDueDate(date)
            }}
            className="rounded-md border"
            disabled={(date) => date < parseISO(inDate) || isUpdating}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}

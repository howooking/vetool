'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import CustomTooltip from '@/components/ui/custom-tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { updateOutDueDate } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn } from '@/lib/utils'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setOutDueDateInput(new Date(outDueDate))
  }, [outDueDate])

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
  }

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger defaultValue={outDueDate} asChild>
          <Button
            variant={'outline'}
            className={cn(
              'flex w-full items-center justify-start gap-2 px-2',
              !outDueDateInput && 'text-muted-foreground',
            )}
          >
            <CustomTooltip
              contents="퇴원예정일"
              variant="secondary"
              side="left"
            >
              <LogOut className="text-muted-foreground" size={16} />
            </CustomTooltip>

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

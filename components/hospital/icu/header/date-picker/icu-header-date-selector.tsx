'use client'

import IcuHeaderDatePicker from '@/components/hospital/icu/header/date-picker/icu-header-date-picker'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'

export default function IcuHeaderDateSelector() {
  const { target_date } = useParams()
  const { push } = useRouter()

  const handleUpdateDate = (days: number) => {
    const newDate = new Date(target_date as string)
    newDate.setDate(newDate.getDate() + days)
    push(`${format(newDate, 'yyyy-MM-dd')}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => handleUpdateDate(-1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
      >
        <ArrowLeftIcon />
      </Button>

      <div className="flex items-center gap-1">
        <span className="min-w-20 text-sm">{target_date}</span>
        <IcuHeaderDatePicker targetDate={target_date as string} />
      </div>

      <Button
        onClick={() => handleUpdateDate(1)}
        size="icon"
        variant="outline"
        className="h-6 w-6 rounded-full"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  )
}

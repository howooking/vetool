/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format, isValid, parse, subMonths, subYears } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { registerPatientFormSchema } from './patient-schema'

export default function BirthDatePicker({
  form,
}: {
  form: UseFormReturn<z.infer<typeof registerPatientFormSchema>>
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isInputDisabled, setIsInputDisabled] = useState(false)
  const [yearInput, setYearInput] = useState('')
  const [monthInput, setMonthInput] = useState('')
  const [dateInput, setDateInput] = useState('')

  const updateBirthDate = useCallback(
    (date: Date) => {
      form.setValue('birth', date)
      setDateInput(format(date, 'yyyy-MM-dd'))
    },
    [form],
  )

  useEffect(() => {
    let currentDate = new Date()

    if (yearInput) currentDate = subYears(currentDate, Number(yearInput))
    if (monthInput) currentDate = subMonths(currentDate, Number(monthInput))

    if (yearInput && monthInput) {
      setIsInputDisabled(true)
    } else {
      setIsInputDisabled(false)
    }

    updateBirthDate(currentDate)
  }, [yearInput, monthInput, updateBirthDate])

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDateInput(value)

    // YYYY-MM-DD 형태로 업데이트
    if (value.length === 8 && /^\d+$/.test(value)) {
      const formatted = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
      const parsedDate = parse(formatted, 'yyyy-MM-dd', new Date())
      if (isValid(parsedDate)) {
        updateBirthDate(parsedDate)
        setYearInput('')
        setMonthInput('')
      }
    }
  }

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2 || Number(e.target.value) < 0) return

    setYearInput(e.target.value)
  }

  const handleMonthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 12 || Number(e.target.value) < 0) return

    setMonthInput(e.target.value)
  }

  return (
    <FormField
      control={form.control}
      name="birth"
      render={({ field }) => (
        <FormItem className="flex flex-col justify-end">
          <FormLabel>생년월일*</FormLabel>
          <div className="flex gap-2">
            <Input
              type="number"
              value={yearInput}
              onChange={handleYearInputChange}
              className="h-8 w-32 text-sm"
              placeholder="나이 (년수)"
              max={99}
            />
            <Input
              type="number"
              value={monthInput}
              onChange={handleMonthInputChange}
              className="h-8 w-32 text-sm"
              placeholder="나이 (개월수)"
            />
            <Input
              type="text"
              value={dateInput}
              onChange={handleDateInputChange}
              disabled={isInputDisabled}
              className="h-8 text-sm"
              placeholder="생년월일 (YYYYMMDD)"
            />
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-8 w-8 border-none px-2"
                  aria-label="Open calendar"
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  className="z-50"
                  styles={{
                    caption_label: { display: 'none' },
                    dropdown_month: { fontSize: 14 },
                    dropdown_year: { fontSize: 14 },
                    button: { fontSize: 14 },
                  }}
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  locale={ko}
                  selected={field.value}
                  mode="single"
                  onSelect={(date) => {
                    if (date) {
                      updateBirthDate(date)
                      setIsPopoverOpen(false)
                    }
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  )
}

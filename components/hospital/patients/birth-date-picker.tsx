'use client'

import { useState, useEffect } from 'react'
import { format, subYears } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
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
import { cn } from '@/lib/utils'
import { UseFormReturn } from 'react-hook-form'
import { registerPatientFormSchema } from './patient-schema'
import { z } from 'zod'

export default function BirthDatePicker({
  form,
}: {
  form: UseFormReturn<z.infer<typeof registerPatientFormSchema>>
}) {
  const [inputValue, setInputValue] = useState('')
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false)
  const [isInputDisabled, setIsInputDisabled] = useState(false)

  useEffect(() => {
    if (inputValue) {
      const yearsAgo = subYears(new Date(), Number(inputValue))

      form.setValue('birth', yearsAgo)
      setIsDatePickerDisabled(true)
      setIsInputDisabled(false)
    } else {
      setIsDatePickerDisabled(false)
    }
  }, [inputValue, form])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 두자릿 수로 제한
    if (e.target.value.length > 2) return

    setInputValue(e.target.value)
  }

  return (
    <FormField
      control={form.control}
      name="birth"
      render={({ field }) => (
        <FormItem className="flex flex-col justify-end">
          <FormLabel>나이 또는 생일*</FormLabel>

          <div className="flex gap-4">
            <Input
              id="birth"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              disabled={isInputDisabled}
              className="h-8 text-sm"
              placeholder="나이 (년수만 입력 ex: 3)"
            />

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'h-8 w-full overflow-hidden border border-input bg-inherit pl-3 text-left text-sm font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                    disabled={isDatePickerDisabled}
                  >
                    {field.value ? (
                      <>{format(field.value, 'yyyy-MM-dd')}</>
                    ) : (
                      <span className="overflow-hidden whitespace-nowrap">
                        출생일을 선택해주세요
                      </span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  styles={{
                    caption_label: { display: 'none' },
                    dropdown_month: { fontSize: 14 },
                    dropdown_year: { fontSize: 14 },
                    button: { fontSize: 14 },
                  }}
                  captionLayout="dropdown-buttons"
                  fromYear={1990}
                  toYear={new Date().getFullYear()}
                  showOutsideDays
                  fixedWeeks
                  locale={ko}
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date)
                    setInputValue('')
                  }}
                  disabled={(date) =>
                    date > new Date() ||
                    date < new Date('1990-01-01') ||
                    isDatePickerDisabled
                  }
                  initialFocus
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

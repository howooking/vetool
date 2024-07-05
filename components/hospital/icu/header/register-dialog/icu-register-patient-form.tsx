'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_NAME } from '@/constants/hospital/icu/chart'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import {
  usePatientRegisterStep,
  useSelectedPatientStore,
} from '@/lib/store/hospital/patients/selected-patient'
import { createClient } from '@/lib/supabase/client'
import { cn, getDaysSince } from '@/lib/utils'
import type { Vet } from '@/types/hospital'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { registerIcuPatientFormSchema } from './schema'

export default function IcuRegisterPatientForm({
  hosId,
  groupList,
  vets,
  setIsDialogOpen,
  tab,
  setTab,
}: {
  hosId: string
  groupList: string[] | null
  vets: Vet[]
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  tab: string
  setTab: Dispatch<SetStateAction<string>>
}) {
  const { refresh } = useRouter()
  const supabase = createClient()
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { patientId, birth, setPatientId } = useSelectedPatientStore()
  const { setSelectedDate } = useIcuSelectedDateStore()
  const { step, setStep } = usePatientRegisterStep()

  const form = useForm<z.infer<typeof registerIcuPatientFormSchema>>({
    resolver: zodResolver(registerIcuPatientFormSchema),
    defaultValues: {
      dx: undefined,
      cc: undefined,
      in_date: range?.from,
      out_due_date: range?.to,
      main_vet: undefined,
      sub_vet: undefined,
    },
  })

  const handleSubmit = async (
    values: z.infer<typeof registerIcuPatientFormSchema>,
  ) => {
    const { dx, cc, in_date, out_due_date, main_vet, sub_vet, group } = values

    setIsSubmitting(true)

    const { data: icuChartId, error: icuChartError } = await supabase.rpc(
      'insert_icu_io_data_with_registered_patient',
      {
        hos_id_input: hosId,
        dx_input: dx,
        cc_input: cc,
        in_date_input: format(in_date, 'yyyy-MM-dd'),
        out_due_date_input: format(out_due_date, 'yyyy-MM-dd'),
        main_vet_input: main_vet,
        sub_vet_input: sub_vet,
        group_list_input: group,
        age_in_days_input: getDaysSince(birth),
        patient_id_input: patientId!,
      },
    )

    if (icuChartError) {
      console.log(icuChartError.message)
      throw new Error(icuChartError.message)
    }

    const { data: icuIoId, error: icuIoError } = await supabase
      .from('icu_io')
      .select('icu_io_id')
      .match({ patient_id: patientId })
      .order('created_at', { ascending: true })
      .single()

    if (icuIoError) {
      console.log(icuIoError)
      throw new Error(icuIoError.message)
    }

    // 기본 차트 삽입
    DEFAULT_ICU_ORDER_NAME.forEach(async (element) => {
      const { error: icuChartOrderError } = await supabase
        .from('icu_chart_order')
        .insert({
          icu_chart_order_type: element.dataType,
          icu_chart_id: icuChartId,
          icu_io_id: icuIoId?.icu_io_id,
          icu_chart_order_name: element.orderName,
          icu_chart_order_comment: element.orderComment,
        })

      if (icuChartOrderError) {
        toast({
          variant: 'destructive',
          title: icuChartOrderError.message,
          description: '관리자에게 문의하세요',
        })
        return
      }
    })

    toast({
      title: '입원 환자가 등록되었습니다',
    })

    setIsDialogOpen(false)
    setIsSubmitting(false)
    setSelectedDate(format(in_date, 'yyyy-MM-dd'))
    refresh()
  }

  // 입원 - 퇴원 예정일 업데이트
  useEffect(() => {
    if (range && range.from && range.to) {
      form.setValue('in_date', range.from)
      form.setValue('out_due_date', range.to)
    }
  }, [form, range])

  // 이전 버튼 클릭 핸들러
  const handlePreviousButtonClick = () => {
    if (tab === 'search') {
      setTab('search')
      setStep('patientSearch')
      return
    }
    if (tab === 'register') {
      setTab('register')
      setStep('ownerSearch')
      return
    }
    setPatientId(null)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-4 grid grid-cols-2 gap-8"
      >
        {/* DX */}
        <FormField
          control={form.control}
          name="dx"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                DX*
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  className="h-8 text-sm"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* CC */}
        <FormField
          control={form.control}
          name="cc"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                CC*
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  className="h-8 text-sm"
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 입원일 */}
        <FormField
          control={form.control}
          name="in_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-semibold">
                입원일 - 퇴원 예정일 선택*
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'h-8 overflow-hidden border border-input bg-inherit pl-3 text-left text-sm font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {range && range.from && range.to ? (
                        <>{`${format(range.from, 'yyyy-MM-dd')} - ${format(range.to, 'yyyy-MM-dd')}`}</>
                      ) : (
                        <span className="overflow-hidden whitespace-nowrap">
                          입원일을 선택해주세요
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    locale={ko}
                    numberOfMonths={2}
                    disabled={(date) => date < new Date('1990-01-01')}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 퇴원 예정일 */}
        {/* <FormField
          control={form.control}
          name="out_due_date"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-semibold">
                퇴원 예정일*
              </FormLabel>
              <div className="flex">
                {range && range.to ? (
                  <Input value={`${format(range.to, 'yyyy-MM-dd')}`} disabled />
                ) : (
                  <span className="overflow-hidden whitespace-nowrap">
                    퇴원일을 선택해주세요
                  </span>
                )}
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        /> */}

        {/* 주치의 */}
        <FormField
          control={form.control}
          name="main_vet"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                주치의*
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vets.map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.user_id}
                      className="text-xs"
                    >
                      {`${vet.name} ${vet.position ?? '미분류'}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 부주치의 */}
        <FormField
          control={form.control}
          name="sub_vet"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                부주치의*
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="부주치의를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vets.map((vet, index) => (
                    <SelectItem
                      key={index}
                      value={vet.user_id}
                      className="text-xs"
                    >
                      {`${vet.name} ${vet.position ?? '미분류'}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* 그룹 */}
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-2 pt-4 text-sm font-semibold">
                그룹*
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      'h-8 text-sm',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <SelectValue placeholder="그룹을 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {groupList?.map((group) => (
                    <SelectItem key={group} value={group} className="text-xs">
                      {group ?? '미분류'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="col-span-2 ml-auto font-semibold">
          <Button
            type="button"
            variant="outline"
            onClick={handlePreviousButtonClick}
          >
            이전
          </Button>

          <Button type="submit" className="ml-2" disabled={isSubmitting}>
            등록
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  usePatientRegisterStep,
  useIcuRegisteringPatient,
} from '@/lib/store/hospital/icu/icu-register'
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
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/hospital/icu/selected-main-view'

export default function IcuRegisterPatientForm({
  hosId,
  groupList,
  vetsData,
  setIsDialogOpen,
  tab,
  setTab,
}: {
  hosId: string
  groupList: string[]
  vetsData: Vet[]
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  tab: string
  setTab: Dispatch<SetStateAction<string>>
}) {
  const { push, refresh } = useRouter()
  const supabase = createClient()
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { registeringPatient } = useIcuRegisteringPatient()
  const { setSelectedPatientId } = useIcuSelectedPatientStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setStep } = usePatientRegisterStep()

  const form = useForm<z.infer<typeof registerIcuPatientFormSchema>>({
    resolver: zodResolver(registerIcuPatientFormSchema),
    defaultValues: {
      dx: undefined,
      cc: undefined,
      in_date: range?.from,
      out_due_date: range?.to,
      main_vet: undefined,
      sub_vet: undefined,
      group_list: [],
    },
  })

  const handleSubmit = async (
    values: z.infer<typeof registerIcuPatientFormSchema>,
  ) => {
    const { dx, cc, in_date, out_due_date, main_vet, sub_vet, group_list } =
      values
    setIsSubmitting(true)

    const { data: returningValue, error: rpcError } = await supabase.rpc(
      'insert_icu_io_and_icu_chart_when_register_icu_patient',
      {
        hos_id_input: hosId,
        dx_input: dx,
        cc_input: cc,
        in_date_input: format(in_date, 'yyyy-MM-dd'),
        out_due_date_input: format(out_due_date, 'yyyy-MM-dd'),
        // ! rpc로직
        group_list_input: JSON.stringify(group_list),
        age_in_days_input: getDaysSince(registeringPatient.birth),
        patient_id_input: registeringPatient.patientId!,
        main_vet_input: main_vet,
        sub_vet_input: sub_vet ?? '',
      },
    )

    if (rpcError) {
      console.log(rpcError)
      toast({
        variant: 'destructive',
        title: rpcError.message,
        description: '관리자에게 문의하세요',
      })
      setIsSubmitting(false)
      return
    }

    const [icuIoId, icuChartId] = returningValue.split(',')

    // 기본차트 삽입
    DEFAULT_ICU_ORDER_NAME.forEach(async (order) => {
      const { error: icuChartOrderError } = await supabase
        .from('icu_chart_order')
        .insert({
          icu_chart_order_type: order.dataType,
          icu_chart_id: icuChartId,
          icu_io_id: icuIoId,
          icu_chart_order_name: order.orderName,
          icu_chart_order_comment: order.orderComment,
        })

      if (icuChartOrderError) {
        console.log(icuChartOrderError)
        toast({
          variant: 'destructive',
          title: icuChartOrderError.message,
          description: '관리자에게 문의하세요',
        })
        setIsSubmitting(false)
        return
      }
    })

    toast({
      title: '입원 환자가 등록되었습니다',
    })

    setIsDialogOpen(false)
    setIsSubmitting(false)
    setSelectedPatientId(registeringPatient.patientId)
    setSelectedIcuMainView('chart')
    push(`${format(in_date, 'yyyy-MM-dd')}`)
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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-4 grid grid-cols-2 gap-8"
      >
        <FormField
          control={form.control}
          name="dx"
          render={({ field }) => (
            <FormItem>
              <FormLabel>진단명 DX*</FormLabel>
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

        <FormField
          control={form.control}
          name="cc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>주증상 CC*</FormLabel>
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

        <FormField
          control={form.control}
          name="in_date"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>입원일 - 퇴원 예정일 선택*</FormLabel>
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
        <FormField
          control={form.control}
          name="group_list"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">그룹</FormLabel>
              <div className="flex flex-wrap items-center gap-4">
                {groupList.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="group_list"
                    render={({ field }) => {
                      return (
                        <FormItem key={item} className="flex items-end gap-1">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item,
                                      ),
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="main_vet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>주치의*</FormLabel>
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
                  {vetsData.map((vet) => (
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

        <FormField
          control={form.control}
          name="sub_vet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>부주치의</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? undefined}
              >
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
                  {vetsData.map((vet, index) => (
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

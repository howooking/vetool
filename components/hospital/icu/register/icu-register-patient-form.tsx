'use client'

import { registerIcuPatientFormSchema } from '@/components/hospital/icu/schema'
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
import { useIcuRegisterPatientStore } from '@/lib/store/hospital/icu/register-patient'
import { useSelectedPatientStore } from '@/lib/store/hospital/patients/selected-patient'
import { createClient } from '@/lib/supabase/client'
import { cn, getDaysSince } from '@/lib/utils'
import { IcuDialogProps } from '@/types/hospital/icu'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function IcuRegisterPatientForm({
  hosId,
  groupList,
  vets,
}: Omit<IcuDialogProps, 'patients'>) {
  const { push } = useRouter()
  const supabase = createClient()
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setIsNextStep } = useIcuRegisterPatientStore()
  const { patientId, birth, setPatientId } = useSelectedPatientStore()

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

    const { data: IcuChartId, error: IcuIoError } = await supabase.rpc(
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

    if (IcuIoError) {
      console.log(IcuIoError.message)
      throw new Error(IcuIoError.message)
    }

    toast({
      title: '입원 환자가 등록되었습니다.',
    })

    setIsSubmitting(false)

    push(`/hospital/${hosId}/icu/${IcuChartId}`)
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
    setIsNextStep()
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
                <Input {...field} className="h-8 text-sm" />
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
                <Input {...field} className="h-8 text-sm" />
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
                      {range && range.from ? (
                        <>{format(range.from, 'yyyy-MM-dd')}</>
                      ) : (
                        <span className="overflow-hidden whitespace-nowrap">
                          입원일을 선택해주세요.
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
        <FormField
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
                    퇴원일을 선택해주세요.
                  </span>
                )}
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

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
                    <SelectValue placeholder="주치의를 선택해주세요." />
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
                    <SelectValue placeholder="부주치의를 선택해주세요." />
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
                    <SelectValue placeholder="그룹을 선택해주세요." />
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
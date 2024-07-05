import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/'
import {
  TIME,
  TX_ORDER_TIME_INTERVAL,
} from '@/constants/hospital/icu/chart/time'
import { useCreateOrderStore } from '@/lib/store/hospital/icu/chart/create-order'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { GroupCheckFormSchema } from './schema'

export default function IcuChartOrderForm({
  chartId,
  ioId,
}: {
  chartId: string
  ioId: string
}) {
  const { refresh } = useRouter()
  const { setIsOpen, chartOrder } = useCreateOrderStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startTime, setStartTime] = useState<string | undefined>(undefined)
  const [timeTerm, setTimeTerm] = useState<string | undefined>(undefined)
  const [orderTime, setOrderTime] = useState<string[]>(
    chartOrder.icu_chart_order_time,
  )
  const { selectedPatientId: patientId } = useIcuSelectedPatientStore()

  const form = useForm<z.infer<typeof GroupCheckFormSchema>>({
    resolver: zodResolver(GroupCheckFormSchema),
    defaultValues: {
      icu_chart_order_type: chartOrder.icu_chart_order_type ?? '',
      icu_chart_order_name: chartOrder.icu_chart_order_name ?? '',
      icu_chart_order_comment: chartOrder.icu_chart_order_comment ?? '',
    },
  })

  const handleSelectAllClick = () => {
    const allSelected = Array(24).fill(1)
    setOrderTime(allSelected)

    allSelected.forEach((time, index) => {
      form.setValue(
        `icu_chart_order_tx_${index + 1}` as keyof z.infer<
          typeof GroupCheckFormSchema
        >,
        time ? true : false,
      )
    })
  }

  const handleCancelAllClick = () => {
    const allCanceled = Array(24).fill(0)
    setOrderTime(allCanceled)

    allCanceled.forEach((time, index) => {
      form.setValue(
        `icu_chart_order_tx_${index + 1}` as keyof z.infer<
          typeof GroupCheckFormSchema
        >,
        time ? true : false,
      )
    })
  }

  const handleSubmit = async (data: z.infer<typeof GroupCheckFormSchema>) => {
    setIsSubmitting(true)

    const supabase = createClient()
    const { error: createOrderError } = await supabase
      .from('icu_chart_order')
      .insert({
        icu_chart_id: chartId,
        icu_io_id: ioId,
        icu_chart_order_type: data.icu_chart_order_type,
        icu_chart_order_name: data.icu_chart_order_name,
        icu_chart_order_comment: data.icu_chart_order_comment,
        icu_chart_order_time: orderTime,
      })
      .match({ patient_id: patientId })

    if (createOrderError) {
      console.log(createOrderError)
      throw new Error(createOrderError.message)
    }

    toast({
      title: `${data.icu_chart_order_name} 오더를 추가하였습니다`,
    })

    refresh()
    setIsSubmitting(false)
    setIsOpen()
  }

  useEffect(() => {
    const orderTime = Array(24).fill(0)

    const start = Number(startTime)
    const term = Number(timeTerm)

    for (let i = start - 1; i < 24; i += term) {
      orderTime[i] = '1'
    }

    orderTime.forEach((time, index) => {
      form.setValue(
        `icu_chart_order_tx_${index + 1}` as keyof z.infer<
          typeof GroupCheckFormSchema
        >,
        time === '1' ? true : false,
      )
    })
    setOrderTime(orderTime)
  }, [form, startTime, timeTerm, setOrderTime])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-8"
      >
        {/* 처치 타입 */}
        <FormField
          control={form.control}
          name="icu_chart_order_type"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-semibold">처치 타입*</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-3 space-x-2"
                >
                  {DEFAULT_ICU_ORDER_TYPE.map((item) => (
                    <FormItem
                      key={item.value}
                      className="flex items-center space-x-2 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 처치 이름 */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="icu_chart_order_name"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel className="font-semibold">처치명*</FormLabel>
                <FormControl>
                  <Input placeholder="처치명을 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 처치 설명 */}
          <FormField
            control={form.control}
            name="icu_chart_order_comment"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel className="font-semibold">처치 설명*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="처치에 대한 설명을 입력해주세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* 처치 시간 */}
          <span className="text-sm font-semibold">처치 시간 설정</span>
          {/* 처치 시간 - 시작 시간 */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Select onValueChange={setStartTime} value={startTime}>
                <SelectTrigger className="h-9 w-36 text-xs">
                  <SelectValue placeholder="시작 시간" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {TIME.map((element) => (
                      <SelectItem
                        value={element.toString()}
                        key={element}
                        className="text-xs"
                      >
                        {element}시 시작
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* 처치 시간 - 시간 간격 */}
              <Select onValueChange={setTimeTerm} value={timeTerm}>
                <SelectTrigger className="h-9 w-36 text-xs">
                  <SelectValue placeholder="시간 간격" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>시간간격</SelectLabel>
                    {TX_ORDER_TIME_INTERVAL.map((element) => (
                      <SelectItem
                        value={element.toString()}
                        key={element}
                        className="text-xs"
                      >
                        {element}시간 간격
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleSelectAllClick}
              >
                전체선택
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancelAllClick}
              >
                전체취소
              </Button>
            </div>
          </div>
        </div>

        {/* 처치 시간 - 타임 테이블 */}
        <div className="col-span-2 flex w-full">
          {TIME.map((element, index) => (
            <FormField
              key={element}
              control={form.control}
              name={`icu_chart_order_tx_${element}`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    className={cn(
                      'flex h-7 w-full cursor-pointer items-center justify-center border hover:opacity-80',
                      field.value ? 'bg-red-400 text-white' : 'bg-white',
                      index === 0 ? 'border-l-2' : 'border-l',
                      index === TIME.length - 1 ? 'border-r-2' : 'border-r',
                      'border-b border-t border-slate-600',
                    )}
                  >
                    {element}
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      className="hidden"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>

        <DialogFooter className="ml-auto">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              닫기
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isSubmitting}>
            추가
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

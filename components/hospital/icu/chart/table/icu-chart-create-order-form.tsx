import { GroupCheckFormSchema } from '@/components/hospital/icu/chart/table/schema'
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
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function IcuChartCreateOrderForm({
  chartId,
  ioId,
  setIsOpen,
}: {
  chartId: string
  ioId: string
  setIsOpen: Dispatch<React.SetStateAction<boolean>>
}) {
  const { refresh } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startTime, setStartTime] = useState<string | undefined>(undefined)
  const [timeTerm, setTimeTerm] = useState<string | undefined>(undefined)
  const [orderTime, setOrderTime] = useState<string[]>([])
  const { selectedPatientId: patientId } = useIcuSelectedPatientStore()

  const form = useForm<z.infer<typeof GroupCheckFormSchema>>({
    resolver: zodResolver(GroupCheckFormSchema),
    defaultValues: {
      icu_chart_order_name: '',
      icu_chart_order_comment: '',
    },
  })

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
      title: `${data.icu_chart_order_name} 오더를 추가하였습니다.`,
    })

    refresh()
    setIsSubmitting(false)
    setIsOpen(false)
  }

  useEffect(() => {
    const start = Number(startTime)
    const term = Number(timeTerm)
    const initialArray = Array(23).fill(0)

    for (let i = start; i <= 24; i += term) {
      initialArray[i] = 1
    }

    initialArray.forEach((time, index) => {
      form.setValue(
        `icu_chart_order_tx_${index}` as keyof z.infer<
          typeof GroupCheckFormSchema
        >,
        time ? true : false,
      )
    })

    setOrderTime(initialArray)
  }, [form, startTime, timeTerm])

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

        {/* 처치 시간 */}
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>처치 시간 설정</span>
          <div>
            {/* 처치 시간 - 시작 시간 */}
            <Select onValueChange={setStartTime} value={startTime}>
              <SelectTrigger className="h-6 text-xs">
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
          </div>
          {/* 처치 시간 - 시간 간격 */}
          <div>
            <Select onValueChange={setTimeTerm} value={timeTerm}>
              <SelectTrigger className="h-6 text-xs">
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
          <div>전체선택</div>
          <div>전체취소</div>
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
                      field.value ? 'bg-primary text-white' : 'bg-white',
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

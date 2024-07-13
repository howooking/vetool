import { Button } from '@/components/ui/button'
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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/'
import {
  HOURS,
  TX_ORDER_HOUR_INTERVALS,
} from '@/constants/hospital/icu/chart/time'
import { upsertOrder } from '@/lib/services/icu/create-new-order'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DeleteOrderAlertDialog from './delete-order-alert-dialog'
import { GroupCheckFormSchema } from './schema'

export default function IcuChartOrderForm({
  icuIoId,
  icuChartId,
}: {
  icuIoId: string
  icuChartId: string
}) {
  const { refresh } = useRouter()
  const { toggleModal, selectedChartOrder, isEditMode } = useCreateOrderStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  // 왜 undefined로 안하고 "undefined"로 했냐면, 값을 undefined로 만들었을 때 ui가 초기화되지 않음
  const [startTime, setStartTime] = useState<string>('undefined')
  const [timeTerm, setTimeTerm] = useState<string>('undefined')
  const [orderTime, setOrderTime] = useState<string[]>(
    selectedChartOrder.icu_chart_order_time || new Array(24).fill('0'),
  )

  // !! 어차피 orderTime은 form으로 관리 못하기 때문에 form에서 제외
  // const updateOrderTime = (orderTime: string[]) => {
  //   setOrderTime(orderTime)
  //   orderTime.forEach((time, index) => {
  //     form.setValue(
  //       `icu_chart_order_tx_${index + 1}` as keyof z.infer<
  //         typeof GroupCheckFormSchema
  //       >,
  //       time === '1',
  //     )
  //   })
  // }

  const form = useForm<z.infer<typeof GroupCheckFormSchema>>({
    resolver: zodResolver(GroupCheckFormSchema),
    defaultValues: {
      // !! 기본값을 undefined로 해야 새로운 오더추가시 폼 validation에 걸림
      icu_chart_order_type:
        selectedChartOrder.icu_chart_order_type ?? undefined,
      icu_chart_order_name:
        selectedChartOrder.icu_chart_order_name ?? undefined,
      icu_chart_order_comment:
        selectedChartOrder.icu_chart_order_comment ?? undefined,
    },
  })

  const handleSelectAllClick = () => {
    setStartTime('undefined')
    setTimeTerm('undefined')
    setOrderTime(Array(24).fill('1'))
  }

  const handleCancelAllClick = () => {
    setStartTime('undefined')
    setTimeTerm('undefined')
    setOrderTime(Array(24).fill('0'))
  }

  const handleSubmit = async (values: z.infer<typeof GroupCheckFormSchema>) => {
    setIsSubmitting(true)

    await upsertOrder(
      icuChartId,
      icuIoId,
      selectedChartOrder.icu_chart_order_id,
      orderTime,
      {
        icu_chart_order_type: values.icu_chart_order_type,
        icu_chart_order_name: values.icu_chart_order_name,
        icu_chart_order_comment: values.icu_chart_order_comment ?? null,
      },
    )

    toast({
      title: `${values.icu_chart_order_name} 오더를 추가하였습니다`,
    })

    refresh()
    setIsSubmitting(false)
    toggleModal()
  }

  const handleTimeToggle = (index: number) => () => {
    setOrderTime((prevOrderTime) => {
      const newOrderTime = [...prevOrderTime]
      newOrderTime[index] = newOrderTime[index] === '1' ? '0' : '1'
      return newOrderTime
    })
    setStartTime('undefined')
    setTimeTerm('undefined')
  }

  useEffect(() => {
    if (startTime !== 'undefined' && timeTerm !== 'undefined') {
      const start = Number(startTime)
      const term = Number(timeTerm)
      const newOrderTime = Array(24).fill('0')
      for (let i = start - 1; i < 24; i += term) {
        newOrderTime[i] = '1'
      }
      setOrderTime(newOrderTime)
    }
  }, [form, startTime, timeTerm])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="icu_chart_order_type"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="font-semibold">오더 타입*</FormLabel>
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

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="icu_chart_order_name"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel className="font-semibold">오더명*</FormLabel>
                <FormControl>
                  <Input placeholder="오더명을 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="icu_chart_order_comment"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel className="font-semibold">오더 설명</FormLabel>
                <FormControl>
                  <Input
                    placeholder="오더에 대한 설명을 입력해주세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">오더 시간 설정</span>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Select onValueChange={setStartTime} value={startTime}>
                <SelectTrigger className="h-9 w-36 text-xs">
                  <SelectValue placeholder="시작 시간" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {['undefined', ...HOURS].map((hour) => (
                      <SelectItem
                        value={hour.toString()}
                        key={hour}
                        className="text-xs"
                      >
                        {hour === 'undefined' ? '시작 시간' : `${hour}시 시작`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={setTimeTerm}
                value={timeTerm}
                disabled={startTime === 'undefined'}
              >
                <SelectTrigger className="h-9 w-36 text-xs">
                  <SelectValue placeholder="시간 간격" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {['undefined', ...TX_ORDER_HOUR_INTERVALS].map(
                      (interval) => (
                        <SelectItem
                          value={interval.toString()}
                          key={interval}
                          className="text-xs"
                        >
                          {interval === 'undefined'
                            ? '시간 간격'
                            : `${interval}시간 간격`}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleSelectAllClick}
              >
                전체선택
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelAllClick}
              >
                전체취소
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-2 flex w-full justify-between">
          {HOURS.map((hour, index) => (
            <Button
              tabIndex={-1}
              type="button"
              variant="outline"
              key={hour}
              className={cn(
                orderTime[index] === '1' && 'bg-rose-100 hover:bg-rose-200',
                'h-6 w-7 px-3 py-2 text-xs',
              )}
              onClick={handleTimeToggle(index)}
            >
              {hour}
            </Button>
          ))}
        </div>

        <DialogFooter className="ml-auto w-full">
          {isEditMode && (
            <DeleteOrderAlertDialog
              selectedChartOrder={selectedChartOrder}
              toggleModal={toggleModal}
            />
          )}

          <DialogClose asChild>
            <Button type="button" variant="outline">
              닫기
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isSubmitting}>
            {isEditMode ? '변경' : '추가'}
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

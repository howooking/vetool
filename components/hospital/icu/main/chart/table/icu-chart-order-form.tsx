/* eslint-disable react-hooks/exhaustive-deps */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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
  const supabase = createClient()
  const { refresh } = useRouter()
  const { setIsOpen, chartOrder, isEditMode } = useCreateOrderStore()
  const { selectedPatientId: patientId } = useIcuSelectedPatientStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startTime, setStartTime] = useState<string>()
  const [timeTerm, setTimeTerm] = useState<string>()
  const [orderTime, setOrderTime] = useState<string[]>(
    chartOrder.icu_chart_order_time || [],
  )

  const updateOrderTime = (orderTime: string[]) => {
    setOrderTime(orderTime)
    orderTime.forEach((time, index) => {
      form.setValue(
        `icu_chart_order_tx_${index + 1}` as keyof z.infer<
          typeof GroupCheckFormSchema
        >,
        time === '1',
      )
    })
  }

  const form = useForm<z.infer<typeof GroupCheckFormSchema>>({
    resolver: zodResolver(GroupCheckFormSchema),
    defaultValues: {
      icu_chart_order_type: chartOrder.icu_chart_order_type ?? '',
      icu_chart_order_name: chartOrder.icu_chart_order_name ?? '',
      icu_chart_order_comment: chartOrder.icu_chart_order_comment ?? '',
    },
  })

  // 오더 삭제 핸들러
  const handleDeleteOrderClick = async () => {
    setIsSubmitting(true)

    const { error: deleteChartOrderError } = await supabase
      .from('icu_chart_order')
      .delete()
      .match({ icu_chart_order_id: chartOrder.icu_chart_order_id })

    if (deleteChartOrderError) {
      console.log(deleteChartOrderError)
      throw new Error(deleteChartOrderError.message)
    }

    refresh()
    setIsOpen()
    setIsSubmitting(false)
  }

  // 오더 시간 전체 선택 핸들러
  const handleSelectAllClick = () => {
    updateOrderTime(Array(24).fill('1'))
  }

  // 오더 시간 전체 취소 핸들러
  const handleCancelAllClick = () => {
    updateOrderTime(Array(24).fill('0'))
  }

  const handleSubmit = async (data: z.infer<typeof GroupCheckFormSchema>) => {
    setIsSubmitting(true)

    const { error: createChartOrderError } = await supabase
      .from('icu_chart_order')
      .upsert({
        icu_chart_id: chartId,
        icu_io_id: ioId,
        icu_chart_order_type: data.icu_chart_order_type,
        icu_chart_order_name: data.icu_chart_order_name,
        icu_chart_order_comment: data.icu_chart_order_comment,
        icu_chart_order_time: orderTime,
      })
      .match({ patient_id: patientId })

    if (createChartOrderError) {
      console.log(createChartOrderError)
      throw new Error(createChartOrderError.message)
    }

    toast({
      title: `${data.icu_chart_order_name} 오더를 추가하였습니다`,
    })

    refresh()
    setIsSubmitting(false)
    setIsOpen()
  }

  useEffect(() => {
    if (startTime && timeTerm) {
      const start = Number(startTime)
      const term = Number(timeTerm)
      const newOrderTime = Array(24).fill('0')
      for (let i = start - 1; i < 24; i += term) {
        newOrderTime[i] = '1'
      }
      updateOrderTime(newOrderTime)
    }
  }, [form, startTime, timeTerm])

  useEffect(() => {
    form.reset({
      ...Object.fromEntries(
        orderTime.map((time, index) => [
          `icu_chart_order_tx_${index + 1}`,
          time === '1',
        ]),
      ),
    })
  }, [chartOrder, form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col space-y-8"
      >
        {/* 오더 타입 */}
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

        {/* 오더 이름 */}
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

          {/* 오더 설명 */}
          <FormField
            control={form.control}
            name="icu_chart_order_comment"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel className="font-semibold">오더 설명*</FormLabel>
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
          {/* 오더 시간 */}
          <span className="text-sm font-semibold">오더 시간 설정</span>
          {/* 오더 시간 - 시작 시간 */}
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
              {/* 오더 시간 - 시간 간격 */}
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

        {/* 오더 시간 - 타임 테이블 */}
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

        <DialogFooter className="ml-auto w-full">
          {/* 삭제 버튼 && Dialog */}
          {isEditMode && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  className="mr-auto"
                  variant="destructive"
                  disabled={isSubmitting}
                >
                  삭제
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {chartOrder.icu_chart_order_name} 오더 삭제
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    선택하신 오더를 삭제합니다 <br /> 삭제 후에 이 작업은 되돌릴
                    수 없습니다
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive hover:bg-destructive/80"
                    onClick={handleDeleteOrderClick}
                  >
                    삭제
                    <LoaderCircle
                      className={cn(
                        isSubmitting ? 'ml-2 animate-spin' : 'hidden',
                      )}
                    />
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {/* 닫기 버튼 */}
          <DialogClose asChild>
            <Button type="button" variant="outline">
              닫기
            </Button>
          </DialogClose>

          {/* 변경 및 추가 버튼 */}
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

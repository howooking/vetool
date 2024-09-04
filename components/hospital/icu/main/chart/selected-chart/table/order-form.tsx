import OrderColorPicker from '@/components/hospital/admin/icu/order/order-color-picker'
import DeleteOrderAlertDialog from '@/components/hospital/icu/main/chart/selected-chart/table/delete-order-alert-dialog'
import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/table/order-schema'
import OrderTimeSettings from '@/components/hospital/icu/main/chart/selected-chart/table/order-time-settings'
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
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { upsertOrder } from '@/lib/services/icu/create-new-order'
import {
  updateDefaultChartOrder,
  updateOrderColor,
} from '@/lib/services/icu/hospital-orders'
import { useCreateOrderStore } from '@/lib/store/icu/create-order'
import type { Json } from '@/lib/supabase/database.types'
import { cn } from '@/lib/utils'
import type { IcuChartOrderJoined, OrderColorProps } from '@/types/icu'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function OrderForm({
  icuIoId,
  icuChartId,
  isSettingMode,
  orderColor,
}: {
  icuIoId?: string
  icuChartId?: string
  isSettingMode?: boolean
  orderColor?: Json
}) {
  const orderColorJson: { [key: string]: string } =
    orderColor as OrderColorProps

  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const { toggleModal, selectedChartOrder, isEditMode, defaultChartId } =
    useCreateOrderStore()

  const [isSubmitting, setIsSubmitting] = useState(false)
  // 왜 undefined로 안하고 "undefined"로 했냐면, 값을 undefined로 만들었을 때 ui가 초기화되지 않음
  const [startTime, setStartTime] = useState<string>('undefined')
  const [timeTerm, setTimeTerm] = useState<string>('undefined')
  const [orderTime, setOrderTime] = useState<string[]>(
    selectedChartOrder.icu_chart_order_time || new Array(24).fill('0'),
  )
  const [color, setColor] = useState(
    orderColorJson[selectedChartOrder.icu_chart_order_type!],
  )

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      icu_chart_order_type:
        selectedChartOrder.icu_chart_order_type ?? undefined,
      icu_chart_order_name:
        selectedChartOrder.icu_chart_order_name ?? undefined,
      icu_chart_order_comment:
        selectedChartOrder.icu_chart_order_comment ?? undefined,
    },
  })

  const handleSubmit = async (values: z.infer<typeof orderSchema>) => {
    setIsSubmitting(true)

    if (color !== orderColorJson[selectedChartOrder.icu_chart_order_type!]) {
      orderColorJson[selectedChartOrder.icu_chart_order_type!] = color

      await updateOrderColor(hos_id as string, orderColorJson)
    }

    if (isSettingMode) {
      await updateDefaultChartOrder(defaultChartId, {
        default_chart_order_name: values.icu_chart_order_name.trim(),
        default_chart_order_comment: values.icu_chart_order_comment ?? '',
        default_chart_order_type: values.icu_chart_order_type,
      })
      refresh()
    } else {
      await upsertOrder(
        icuChartId!,
        icuIoId!,
        selectedChartOrder.icu_chart_order_id!,
        orderTime,
        hos_id as string,
        {
          icu_chart_order_type: values.icu_chart_order_type,
          icu_chart_order_name: values.icu_chart_order_name.trim(),
          icu_chart_order_comment: values.icu_chart_order_comment ?? null,
        },
      )
    }

    toast({
      title: `${values.icu_chart_order_name} 오더를 추가하였습니다`,
    })

    toggleModal()
    setIsSubmitting(false)
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
        className="flex flex-col space-y-4"
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

        {isSettingMode ? (
          <OrderColorPicker value={color} onChange={setColor} />
        ) : (
          <OrderTimeSettings
            startTime={startTime}
            timeTerm={timeTerm}
            orderTime={orderTime}
            setStartTime={setStartTime}
            setTimeTerm={setTimeTerm}
            setOrderTime={setOrderTime}
          />
        )}

        <DialogFooter className="ml-auto w-full">
          {isEditMode && (
            <DeleteOrderAlertDialog
              selectedChartOrder={selectedChartOrder as IcuChartOrderJoined}
              toggleModal={toggleModal}
              isSettingMode={isSettingMode}
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

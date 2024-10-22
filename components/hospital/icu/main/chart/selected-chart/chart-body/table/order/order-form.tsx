'use client'

import DeleteOrderAlertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/delete-order-alert-dialog'
import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-schema'
import OrderTimeSettings from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-time-settings'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FeedOrderField from './feed-order/feed-order-filed'
import FluidOrderFiled from './fluid-order/fluid-order-filed'
import OrderFormField from './order-form-field'

export default function OrderForm({
  showOrderer,
  icuChartId,
  weight,
  species,
  ageInDays,
}: {
  showOrderer: boolean
  icuChartId: string
  weight: string
  species: string
  ageInDays: number
}) {
  const {
    setStep,
    selectedChartOrder,
    isEditMode,
    setSelectedChartOrder,
    reset,
  } = useIcuOrderStore()

  const { hos_id } = useParams()
  const {
    basicHosData: { vetsListData },
  } = useBasicHosDataContext()

  const [isUpdating, setIsUpdating] = useState(false)
  const [startTime, setStartTime] = useState<string>('undefined')
  const [timeTerm, setTimeTerm] = useState<string>('undefined')
  const [orderTime, setOrderTime] = useState<string[]>(
    selectedChartOrder.order_times || new Array(24).fill('0'),
  )

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      icu_chart_order_type: selectedChartOrder.order_type ?? undefined,
      icu_chart_order_name: selectedChartOrder.order_name ?? undefined,
      icu_chart_order_comment: selectedChartOrder.order_comment ?? undefined,
    },
  })

  const orderType = form.watch('icu_chart_order_type')

  const handleNextStep = async (values: z.infer<typeof orderSchema>) => {
    setSelectedChartOrder({
      order_name: values.icu_chart_order_name,
      order_comment: values.icu_chart_order_comment,
      order_type: values.icu_chart_order_type,
      order_times: orderTime,
      order_id: selectedChartOrder.order_id,
    })
    setStep('selectOrderer')
  }
  const handleSubmitWithoutOrderer = async (
    values: z.infer<typeof orderSchema>,
  ) => {
    setIsUpdating(true)

    await upsertOrder(
      hos_id as string,
      icuChartId,
      selectedChartOrder.order_id!,
      orderTime.map((time) => (time === '1' ? vetsListData[0].name : '0')),
      {
        icu_chart_order_name: values.icu_chart_order_name.trim(),
        icu_chart_order_comment: values.icu_chart_order_comment!.trim(),
        icu_chart_order_type: values.icu_chart_order_type!,
      },
    )

    toast({
      title: `${selectedChartOrder.order_name!.split('#')[0]} 오더를 ${isEditMode ? '수정' : '추가'} 하였습니다`,
    })

    reset()
    setStep('closed')
    setIsUpdating(false)
  }

  const handleSubmit = showOrderer ? handleNextStep : handleSubmitWithoutOrderer

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
        className="flex flex-col gap-4"
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
                  className="flex flex-wrap gap-4"
                >
                  {DEFAULT_ICU_ORDER_TYPE.map((item) => (
                    <FormItem
                      key={item.value}
                      className="flex cursor-pointer items-center space-x-1 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
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

        {orderType === 'fluid' && (
          <FluidOrderFiled
            form={form}
            species={species}
            ageInDays={ageInDays}
            weight={weight}
          />
        )}

        {orderType === 'feed' && (
          <FeedOrderField
            form={form}
            species={species}
            ageInDays={ageInDays}
            weight={weight}
          />
        )}

        {orderType !== 'fluid' && orderType !== 'feed' && (
          <OrderFormField form={form} />
        )}

        <OrderTimeSettings
          startTime={startTime}
          timeTerm={timeTerm}
          orderTime={orderTime}
          setStartTime={setStartTime}
          setTimeTerm={setTimeTerm}
          setOrderTime={setOrderTime}
        />

        <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
          {isEditMode && (
            <DeleteOrderAlertDialog
              selectedChartOrder={selectedChartOrder}
              setStep={setStep}
            />
          )}

          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              닫기
            </Button>
          </DialogClose>

          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>{isEditMode ? '변경' : '추가'}</>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

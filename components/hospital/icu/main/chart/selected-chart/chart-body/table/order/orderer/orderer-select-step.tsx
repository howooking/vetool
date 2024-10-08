'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn, formatOrders } from '@/lib/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-privider'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ordererSchema } from './orderer-schema'

export default function OrdererSelectStep({
  icuChartId,
  orders,
}: {
  icuChartId: string
  orders: SelectedIcuOrder[]
}) {
  const { hos_id } = useParams()
  const {
    basicHosData: { vetsListData },
  } = useBasicHosDataContext()

  const {
    reset,
    selectedChartOrder,
    orderTimePendingQueue,
    isEditMode,
    setStep,
  } = useIcuOrderStore()

  const [isUpdating, setIsUpdating] = useState(false)
  const isSingleOrder = useMemo(
    () => orderTimePendingQueue.length === 0,
    [orderTimePendingQueue],
  )

  const handleUpsertSingleOrder = useCallback(
    async (values: z.infer<typeof ordererSchema>) => {
      setIsUpdating(true)

      await upsertOrder(
        hos_id as string,
        icuChartId,
        selectedChartOrder.order_id!,
        selectedChartOrder.order_times!.map((time) =>
          time === '1' ? values.orderer : time,
        ),
        {
          icu_chart_order_name: selectedChartOrder.order_name!,
          icu_chart_order_comment: selectedChartOrder.order_comment!,
          icu_chart_order_type: selectedChartOrder.order_type!,
        },
      )

      toast({
        title: `${selectedChartOrder.order_name!.split('#')[0]} 오더를 ${isEditMode ? '수정' : '추가'} 하였습니다`,
      })

      reset()
      setStep('closed')
      setIsUpdating(false)
    },
    [
      hos_id,
      icuChartId,
      isEditMode,
      reset,
      selectedChartOrder.order_comment,
      selectedChartOrder.order_id,
      selectedChartOrder.order_name,
      selectedChartOrder.order_times,
      selectedChartOrder.order_type,
      setStep,
    ],
  )

  const handleUpsertMultipleOrders = useCallback(
    async (values: z.infer<typeof ordererSchema>) => {
      setIsUpdating(true)
      const formattedOrders = formatOrders(orderTimePendingQueue)

      for (const order of formattedOrders) {
        const currentOrder = orders.find((o) => o.order_id === order.orderId)
        if (!currentOrder) continue

        const updatedOrderTimes = [...currentOrder.order_times]
        for (const time of order.orderTimes) {
          updatedOrderTimes[time - 1] =
            updatedOrderTimes[time - 1] === '0' ? values.orderer : '0'
        }

        await upsertOrder(
          hos_id as string,
          icuChartId,
          order.orderId,
          updatedOrderTimes,
          {
            icu_chart_order_name: currentOrder.order_name,
            icu_chart_order_comment: currentOrder.order_comment,
            icu_chart_order_type: currentOrder.order_type,
          },
        )
      }

      toast({
        title: '오더시간을 변경하였습니다',
      })

      reset()
      setStep('closed')
      setIsUpdating(false)
    },
    [hos_id, icuChartId, orderTimePendingQueue, orders, reset, setStep],
  )

  const handleSubmit = useCallback(
    async (values: z.infer<typeof ordererSchema>) => {
      if (isSingleOrder) {
        await handleUpsertSingleOrder(values)
      } else {
        await handleUpsertMultipleOrders(values)
      }
    },
    [isSingleOrder, handleUpsertSingleOrder, handleUpsertMultipleOrders],
  )

  const form = useForm<z.infer<typeof ordererSchema>>({
    resolver: zodResolver(ordererSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="orderer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>오더결정 수의사</FormLabel>
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
                    <SelectValue placeholder="수의사를 선택해주세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vetsListData.map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <Image
                            unoptimized
                            src={vet.avatar_url ?? ''}
                            alt={vet.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                        )}
                        <span>{vet.name}</span>
                        {vet.position && (
                          <span className="text-xs">({vet.position})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            onClick={() => setStep('upsert')}
            variant="outline"
            type="button"
            className={isSingleOrder ? '' : 'hidden'}
          >
            뒤로
          </Button>
          <Button type="submit" disabled={isUpdating} className="ml-auto">
            확인
            <LoaderCircle
              className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}
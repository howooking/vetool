'use client'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useParams, useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useState } from 'react'

export default function QuickOrderInsertInput({
  icuChartId,
  setSortedOrders,
}: {
  icuChartId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const { isSubscriptionReady } = useRealtimeSubscriptionStore()
  const [orderNameInput, setOrderNameInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!orderNameInput) return
    if (e.key === 'Enter') {
      setIsSubmitting(true)

      setSortedOrders((prev) => [
        ...prev,
        {
          id: 1,
          order_id: crypto.randomUUID(),
          order_name: orderNameInput,
          order_comment: '',
          order_type: 'manual',
          order_times: Array(24).fill('0'),
          treatments: [],
        },
      ])

      await upsertOrder(
        hos_id as string,
        icuChartId,
        undefined,
        Array(24).fill('0'),
        {
          icu_chart_order_name: orderNameInput.trim(),
          icu_chart_order_comment: '',
          icu_chart_order_type: 'manual',
        },
      )

      setOrderNameInput('')
      setIsSubmitting(false)

    toast({
      title: `${orderNameInput} 오더를 생성하였습니다`,
    })

    setOrderNameInput('')
    setIsSubmitting(false)

    if (!isSubscriptionReady) refresh()
  }
  return (
    <Input
      className="h-11 rounded-none border-b-0 border-l-0 border-t-0 focus-visible:ring-0"
      disabled={isSubmitting}
      placeholder="빠른 오더 등록"
      value={isSubmitting ? '' : orderNameInput}
      onChange={(e) => setOrderNameInput(e.target.value)}
      onKeyDown={handleSubmit}
    />
  )
}

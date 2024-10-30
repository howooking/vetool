'use client'

import { Input } from '@/components/ui/input'
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

  const handleSubmit = async () => {
    if (!orderNameInput) return

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

    if (!isSubscriptionReady) refresh()
  }
  return (
    <Input
      className="w-[320px]"
      disabled={isSubmitting}
      placeholder="오더명 입력 후 Enter"
      value={isSubmitting ? '전송중...' : orderNameInput}
      onChange={(e) => setOrderNameInput(e.target.value)}
      onBlur={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const target = e.currentTarget
          setTimeout(() => {
            if (target) {
              target.blur()
            }
          }, 0)
        }
      }}
    />
  )
}

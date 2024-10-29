'use client'

import { Input } from '@/components/ui/input'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function QuickOrderInsertInput({
  icuChartId,
}: {
  icuChartId: string
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const [orderNameInput, setOrderNameInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!orderNameInput) return

    setIsSubmitting(true)

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
    refresh()
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

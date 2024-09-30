'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { updateOrderColor } from '@/lib/services/icu/hospital-orders'
import { cn } from '@/lib/utils'
import type { IcuOrderColors } from '@/types/adimin'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import OrderColorPicker from './order-color-picker'

export default function OrderColorSetting({
  orderColor,
}: {
  orderColor: IcuOrderColors
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const [locatColorState, setLocalColorState] = useState(orderColor)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleOrderColor = async (orderType: string, color: string) => {
    setLocalColorState({ ...locatColorState, [orderType]: color })
  }

  const handleUpdateOrderColor = async () => {
    setIsUpdating(true)

    await updateOrderColor(hos_id as string, locatColorState)
    toast({
      title: '오더의 색상을 변경하였습니다.',
    })

    setIsUpdating(false)
    refresh()
  }

  const sortedOrders = Object.entries(locatColorState).sort((a, b) => {
    return (
      DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
        (order) => order === a[0],
      ) -
      DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
        (order) => order === b[0],
      )
    )
  })

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col flex-wrap justify-between gap-3">
        {sortedOrders.map(([key, value]) => (
          <li key={key}>
            <OrderColorPicker
              color={value}
              orderType={key}
              handleChangeOrderTypeColor={handleOrderColor}
            />
          </li>
        ))}
      </ul>
      <Button
        type="button"
        onClick={handleUpdateOrderColor}
        disabled={isUpdating}
        className="w-16"
      >
        수정
        <LoaderCircle
          className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
        />
      </Button>
    </div>
  )
}

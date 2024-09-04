import { Button } from '@/components/ui/button'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { updateOrderColor } from '@/lib/services/icu/hospital-orders'
import { IcuOrderTypeColor } from '@/types/adimin'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import OrderColorPicker from './order-color-picker'
import { toast } from '@/components/ui/use-toast'

export default function OrderTypeColorSetting({
  orderTypeColors,
}: {
  orderTypeColors: IcuOrderTypeColor
}) {
  const [colors, setColors] = useState(orderTypeColors)
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const handleChangeOrderTypeColor = async (
    orderType: string,
    color: string,
  ) => {
    setColors({ ...colors, [orderType]: color })
  }

  const handleUpdateOrderTypeColor = async () => {
    await updateOrderColor(hos_id as string, colors)
    toast({
      title: '오더의 색생을 변경하였습니다.',
    })
    refresh()
  }

  const sortedOrders = Object.entries(colors).sort((a, b) => {
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
    <div>
      <div className="flex items-end gap-4">
        <ul className="flex justify-between gap-2">
          {sortedOrders.map(([key, value]) => (
            <li key={key}>
              <OrderColorPicker
                color={value}
                orderType={key}
                handleChangeOrderTypeColor={handleChangeOrderTypeColor}
              />
            </li>
          ))}
        </ul>
        <Button onClick={handleUpdateOrderTypeColor} size="sm">
          수정
        </Button>
      </div>
    </div>
  )
}

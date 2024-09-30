import { getHosOrderColor } from '@/lib/services/admin/icu/order-color'
import type { IcuOrderColors } from '@/types/adimin'
import OrderColorSetting from './order-color-setting'

export default async function OrderColorTab({ hosId }: { hosId: string }) {
  const orderColor = await getHosOrderColor(hosId)
  return <OrderColorSetting orderColor={orderColor as IcuOrderColors} />
}

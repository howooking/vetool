import IcuMain from '@/components/hospital/icu/main/icu-main'
import { getIcuMainData } from '@/lib/services/icu/get-icu-main-data'

export default async function IcuMainAsync({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  const { icuChartData, icuChartOrderData, icuIoData, icuUsersData } =
    await getIcuMainData(hosId, targetDate)

  return (
    <IcuMain
      icuChartData={icuChartData}
      icuChartOrderData={icuChartOrderData}
      icuIoData={icuIoData}
      targetDate={targetDate}
      icuUsersData={icuUsersData}
    />
  )
}

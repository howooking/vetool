import IcuEntry from '@/components/hospital/icu/icu-entry'
import { getAllIcuData } from '@/lib/services/icu/get-all-icu-data'
import TanstackQueryProvider from '@/providers/tanstack-query-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string; target_date: string }
}) {
  const initialIcuData = await getAllIcuData(
    params.hos_id as string,
    params.target_date as string,
  )

  return (
    <TanstackQueryProvider>
      <IcuEntry
        hosId={params.hos_id}
        targetDate={params.target_date}
        initialIcuData={initialIcuData}
      />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </TanstackQueryProvider>
  )
}

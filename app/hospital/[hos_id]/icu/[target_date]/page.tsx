import IcuEntry from '@/components/hospital/icu/icu-entry'
import { getVetsList } from '@/lib/services/icu/get-vets-list'
import TanstackQueryProvider from '@/providers/tanstack-query-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string; target_date: string }
}) {
  const vetsList = await getVetsList(params.hos_id)

  return (
    <TanstackQueryProvider>
      <IcuEntry
        hosId={params.hos_id}
        targetDate={params.target_date}
        vetsListData={vetsList}
      />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </TanstackQueryProvider>
  )
}

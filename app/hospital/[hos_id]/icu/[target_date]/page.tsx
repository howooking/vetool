import IcuEntry from '@/components/hospital/icu/icu-entry'
import TanstackQueryProvider from '@/providers/tanstack-query-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default async function IcuPage({
  params,
}: {
  params: { hos_id: string; target_date: string }
}) {
  return (
    <TanstackQueryProvider>
      <IcuEntry hosId={params.hos_id} targetDate={params.target_date} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </TanstackQueryProvider>
  )
}

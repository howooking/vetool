'use client'

import IcuEntry from '@/components/hospital/icu/icu-entry'
import { getAllIcuData } from '@/lib/services/icu/get-all-icu-data'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function IcuPage({
  params,
}: {
  params: { hos_id: string; target_date: string }
}) {
  const queryClient = new QueryClient()
  // const icuData = await getAllIcuData(params.hos_id, params.target_date)

  return (
    <QueryClientProvider client={queryClient}>
      <IcuEntry hosId={params.hos_id} targetDate={params.target_date} />
    </QueryClientProvider>
  )
}

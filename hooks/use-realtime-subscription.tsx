import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useRealtimeSubscription(hosId: string) {
  const supabase = createClient()
  const [shouldRefresh, setShouldRefresh] = useState(false)
  const { refresh } = useRouter()

  useEffect(() => {
    const icuIoSubscription = supabase
      .channel(`icu_io_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_io',
          filter: `hos_id=eq.${hosId}`,
        },
        () => {
          console.log('io changed')
          setShouldRefresh(true)
        },
      )
      .subscribe()

    const icuChartSubscription = supabase
      .channel(`icu_chart_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_chart',
          filter: `hos_id=eq.${hosId}`,
        },
        () => {
          console.log('chart changed')
          setShouldRefresh(true)
        },
      )
      .subscribe()

    const icuChartOrderSubscription = supabase
      .channel(`icu_chart_order_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_chart_order',
          filter: `hos_id=eq.${hosId}`,
        },
        () => {
          console.log('order changed')
          setShouldRefresh(true)
        },
      )
      .subscribe()

    const icuChartTxSupscription = supabase
      .channel(`icu_chart_tx_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_chart_tx',
          filter: `hos_id=eq.${hosId}`,
        },
        () => {
          console.log('tx changed')
          setShouldRefresh(true)
        },
      )
      .subscribe()

    return () => {
      icuIoSubscription.unsubscribe()
      icuChartSubscription.unsubscribe()
      icuChartOrderSubscription.unsubscribe()
      icuChartTxSupscription.unsubscribe()
    }
  }, [hosId, supabase])

  useEffect(() => {
    if (shouldRefresh) {
      refresh()
    }
    setShouldRefresh(false)
  }, [refresh, shouldRefresh])
}

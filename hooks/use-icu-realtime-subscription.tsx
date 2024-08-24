import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const supabase = createClient()

export function useIoRealtime(hosId: string) {
  const { refresh } = useRouter()

  useEffect(() => {
    const subscriptions = supabase
      .channel(`io_realtime`)
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
          refresh()
        },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(subscriptions)
    }
  }, [hosId, refresh])
}

export function useChartRealtime(hosId: string) {
  const { refresh } = useRouter()

  useEffect(() => {
    const subscriptions = supabase
      .channel(`chart_realtime`)
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
          refresh()
        },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(subscriptions)
    }
  }, [hosId, refresh])
}

export function useOrderRealtime(hosId: string) {
  const { refresh } = useRouter()

  const debouncedRefresh = useDebouncedCallback(() => {
    refresh()
    console.log('order changed')
  }, 300)

  useEffect(() => {
    const subscriptions = supabase
      .channel(`order_realtime`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_chart_order',
          filter: `hos_id=eq.${hosId}`,
        },
        () => {
          debouncedRefresh()
        },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(subscriptions)
    }
  }, [debouncedRefresh, hosId, refresh])
}

export function useTxRealtime(hosId: string) {
  const { refresh } = useRouter()

  useEffect(() => {
    const subscriptions = supabase
      .channel(`tx_realtime`)
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
          refresh()
        },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(subscriptions)
    }
  }, [hosId, refresh])
}

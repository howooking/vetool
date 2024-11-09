import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'
import { createClient } from '@/lib/supabase/client'
import { type SelectedChart } from '@/types/icu/chart'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const supabase = createClient()
const TABLES = ['icu_io', 'icu_charts', 'icu_orders', 'icu_txs'] as const

export function useIcuRealtime(
  hosId: string,
  targetDate: string,
  patientId: string,
  initialChartData: SelectedChart,
) {
  const subscriptionRef = useRef<RealtimeChannel | null>(null)
  const { setIsSubscriptionReady } = useRealtimeSubscriptionStore()
  const queryClient = useQueryClient()

  const { data, error } = useQuery({
    queryKey: ['icu_realtime', hosId, targetDate, patientId],
    queryFn: () => getIcuChart(hosId, targetDate, patientId),
    initialData: initialChartData,
  })

  const debouncedQueryInvalidation = useDebouncedCallback(() => {
    console.log('Debouced invalidation')
    queryClient.invalidateQueries({
      queryKey: ['icu_realtime', hosId, targetDate, patientId],
    })
  }, 500)

  const handleChange = useCallback(
    (payload: any) => {
      console.log(
        `%c${payload.table} ${payload.eventType}`,
        `background:${getLogColor(payload.table)}; color:white`,
      )
      debouncedQueryInvalidation()
    },
    [debouncedQueryInvalidation],
  )

  const subscribeToChannel = useCallback(() => {
    if (subscriptionRef.current) {
      console.log('Subscription already exists. Skipping...')
      return
    }

    console.log('Creating new subscription...')
    const channel = supabase.channel(`icu_realtime_${hosId}`)

    TABLES.forEach((table) => {
      channel
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table,
            filter: `hos_id=eq.${hosId}`,
          },
          handleChange,
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table,
            filter: `hos_id=eq.${hosId}`,
          },
          handleChange,
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table },
          handleChange,
        )
    })

    subscriptionRef.current = channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Subscribed to all tables')
        setTimeout(() => {
          setIsSubscriptionReady(true)
        }, 5000)
      } else {
        console.log('Subscription failed with status:', status)
        setIsSubscriptionReady(false)
      }
    })
  }, [hosId, handleChange])

  const unsubscribe = useCallback(() => {
    if (subscriptionRef.current) {
      console.log('Unsubscribing from channel...')
      supabase.removeChannel(subscriptionRef.current)
      subscriptionRef.current = null
      setIsSubscriptionReady(false)
    }
  }, [])

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      console.log('Page is hidden, unsubscribing...')
      unsubscribe()
    } else {
      console.log('Page is visible, resubscribing...')
      subscribeToChannel()
    }
  }, [subscribeToChannel, unsubscribe])

  useEffect(() => {
    console.log('initial subscription')
    subscribeToChannel()

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      console.log('Cleanup: unsubscribing and removing event listener...')
      unsubscribe()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [handleVisibilityChange, subscribeToChannel, unsubscribe])

  return {
    data,
    error,
  }
}

export function getLogColor(table: string): string {
  switch (table) {
    case 'icu_io':
      return 'blue'
    case 'icu_charts':
      return 'red'
    case 'icu_orders':
      return 'green'
    case 'icu_txs':
      return 'purple'
    default:
      return 'gray'
  }
}

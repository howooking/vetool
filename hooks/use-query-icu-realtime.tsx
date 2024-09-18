import {
  getIcuChart,
  getIcuIo,
  getIcuOrder,
} from '@/lib/services/icu/get-icu-data'
import { createClient } from '@/lib/supabase/client'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
} from '@/types/icu'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useQueries, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const supabase = createClient()
const TABLES = [
  'icu_io',
  'icu_chart',
  'icu_chart_order',
  'icu_chart_tx',
] as const
type TableName = (typeof TABLES)[number]

export function useQueryIcuRealtime(
  hosId: string,
  targetDate: string,
  icuIoData: IcuIoJoined[],
  icuChartData: IcuChartJoined[],
  icuChartOrderData: IcuChartOrderJoined[],
) {
  const subscriptionRef = useRef<RealtimeChannel | null>(null)
  const revalidationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const revalidationQueueRef = useRef<Set<TableName>>(new Set())
  const [isSubscriptionReady, setIsSubscriptionReady] = useState(false)

  const queryClient = useQueryClient()
  const [icuIoQuery, icuChartQuery, icuOrderQuery] = useQueries({
    queries: [
      {
        queryKey: ['icu_io', hosId, targetDate],
        queryFn: () => getIcuIo(hosId, targetDate),
        refetchOnWindowFocus: true,
        refetchInterval: isSubscriptionReady ? false : 60000,
        initialData: icuIoData,
      },
      {
        queryKey: ['icu_chart', hosId, targetDate],
        queryFn: () => getIcuChart(hosId, targetDate),
        refetchOnWindowFocus: true,
        refetchInterval: isSubscriptionReady ? false : 60000,
        initialData: icuChartData,
      },
      {
        queryKey: ['icu_chart_order', hosId, targetDate],
        queryFn: () => getIcuOrder(hosId, targetDate),
        refetchOnWindowFocus: true,
        refetchInterval: isSubscriptionReady ? false : 60000,
        initialData: icuChartOrderData,
      },
    ],
  })

  const processRevalidationQueue = useCallback(async () => {
    if (revalidationQueueRef.current.has('icu_chart_tx')) {
      revalidationQueueRef.current.delete('icu_chart_order')
    }

    const revalidationPromises = Array.from(revalidationQueueRef.current).map(
      (table) => {
        if (table === 'icu_chart_tx' || table === 'icu_chart_order') {
          return queryClient.invalidateQueries({
            queryKey: ['icu_chart_order', hosId, targetDate],
          })
        } else {
          return queryClient.invalidateQueries({
            queryKey: [table, hosId, targetDate],
          })
        }
      },
    )
    await Promise.all(revalidationPromises)
    revalidationQueueRef.current.clear()
  }, [hosId, queryClient, targetDate])

  const debouncedProcessRevalidationStack = useDebouncedCallback(
    processRevalidationQueue,
    500,
  )

  const handleChange = useCallback(
    (payload: any) => {
      console.log(
        `%c${payload.table.toUpperCase()} ${payload.eventType}`,
        `background:${getLogColor(payload.table)}; color:white`,
      )

      revalidationQueueRef.current.add(payload.table as TableName)

      if (revalidationTimerRef.current) {
        clearTimeout(revalidationTimerRef.current)
      }

      revalidationTimerRef.current = setTimeout(processRevalidationQueue, 900)
    },
    [processRevalidationQueue],
  )

  const subscribeToChannel = useCallback(() => {
    if (subscriptionRef.current) {
      console.log('Subscription already exists. Skipping...')
      return
    }

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
        setIsSubscriptionReady(true)
      } else {
        console.log('Subscription failed')
        setIsSubscriptionReady(false)
      }
    })
  }, [hosId, handleChange])

  const unsubscribe = useCallback(() => {
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current)
      subscriptionRef.current = null
      setIsSubscriptionReady(false)
    }
  }, [])

  const resubscribe = useCallback(() => {
    unsubscribe()
    subscribeToChannel()
  }, [unsubscribe, subscribeToChannel])

  useEffect(() => {
    subscribeToChannel()

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        resubscribe()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      unsubscribe()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      debouncedProcessRevalidationStack.cancel()
    }
  }, [
    subscribeToChannel,
    unsubscribe,
    resubscribe,
    debouncedProcessRevalidationStack,
  ])

  return {
    icuIoQuery,
    icuChartQuery,
    icuOrderQuery,
    isSubscriptionReady,
  }
}

export function getLogColor(table: string): string {
  switch (table) {
    case 'icu_io':
      return 'blue'
    case 'icu_chart':
      return 'red'
    case 'icu_chart_order':
      return 'green'
    case 'icu_chart_tx':
      return 'purple'
    default:
      return 'gray'
  }
}

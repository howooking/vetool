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
import { useQueries, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'

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
  const [isSubscriptionReady, setIsSubscriptionReady] = useState(false)
  const subscriptionRef = useRef<ReturnType<typeof supabase.channel> | null>(
    null,
  )
  const revalidationStackRef = useRef<Set<TableName>>(new Set())
  const revalidationTimerRef = useRef<NodeJS.Timeout | null>(null)

  const queryClient = useQueryClient()

  const [icuIoQuery, icuChartQuery, icuOrderQuery] = useQueries({
    queries: [
      {
        queryKey: ['icu_io', hosId, targetDate],
        queryFn: () => getIcuIo(hosId, targetDate),
        refetchOnWindowFocus: true,
        refetchInterval: 60000,
        initialData: icuIoData,
      },
      {
        queryKey: ['icu_chart', hosId, targetDate],
        queryFn: () => getIcuChart(hosId, targetDate),
        refetchOnWindowFocus: true,
        refetchInterval: 60000,
        initialData: icuChartData,
      },
      {
        queryKey: ['icu_chart_order', hosId, targetDate],
        queryFn: () => getIcuOrder(hosId, targetDate),
        refetchOnWindowFocus: true,
        refetchInterval: 60000,
        initialData: icuChartOrderData,
      },
    ],
  })

  const processRevalidationStack = useCallback(async () => {
    if (revalidationStackRef.current.has('icu_chart_tx')) {
      revalidationStackRef.current.delete('icu_chart_order')
    }

    const revalidationPromises = Array.from(revalidationStackRef.current).map(
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
    revalidationStackRef.current.clear()
    revalidationTimerRef.current = null
  }, [hosId, queryClient, targetDate])

  const handleChange = useCallback(
    (payload: any) => {
      console.log(
        `%c${payload.table.toUpperCase()} ${payload.eventType}`,
        `background:${getLogColor(payload.table)}; color:white`,
      )

      revalidationStackRef.current.add(payload.table as TableName)

      if (revalidationTimerRef.current) {
        clearTimeout(revalidationTimerRef.current)
      }

      revalidationTimerRef.current = setTimeout(processRevalidationStack, 700)
    },
    [processRevalidationStack],
  )

  useEffect(() => {
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
      if (status !== 'SUBSCRIBED') {
        setIsSubscriptionReady(false)
      } else {
        setIsSubscriptionReady(true)
        console.log('Subscribed to all tables')
      }
    })

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current)
      }
      if (revalidationTimerRef.current) {
        clearTimeout(revalidationTimerRef.current)
        revalidationTimerRef.current = null
      }
    }
  }, [handleChange, hosId])

  return { icuIoQuery, icuChartQuery, icuOrderQuery, isSubscriptionReady }
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

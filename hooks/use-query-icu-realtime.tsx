import {
  getIcuChart,
  getIcuIo,
  getIcuOrder,
} from '@/lib/services/icu/get-icu-data'
import { createClient } from '@/lib/supabase/client'
import { IcuChartJoined, IcuChartOrderJoined, IcuIoJoined } from '@/types/icu'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'

const supabase = createClient()
const TABLES = ['icu_io', 'icu_chart', 'icu_chart_order', 'icu_chart_tx']

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
  const revalidationStackRef = useRef<Set<string>>(new Set())
  const revalidationTimerRef = useRef<NodeJS.Timeout | null>(null)

  const queryClient = useQueryClient()

  const icuIoQuery = useQuery({
    queryKey: ['icu_io', hosId, targetDate],
    queryFn: () => getIcuIo(hosId, targetDate),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
    initialData: icuIoData,
  })

  const icuChartQuery = useQuery({
    queryKey: ['icu_chart', hosId, targetDate],
    queryFn: () => getIcuChart(hosId, targetDate),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
    initialData: icuChartData,
  })

  const icuOrderQuery = useQuery({
    queryKey: ['icu_chart_order', hosId, targetDate],
    queryFn: () => getIcuOrder(hosId, targetDate),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
    initialData: icuChartOrderData,
  })

  const processRevalidationStack = useCallback(() => {
    revalidationStackRef.current.forEach((table) => {
      queryClient.invalidateQueries({
        queryKey: [table, hosId, targetDate],
      })
    })
    revalidationStackRef.current.clear()
    revalidationTimerRef.current = null
  }, [queryClient, hosId, targetDate])

  const handleChange = useCallback(
    (payload: any) => {
      console.log(
        `%c${payload.table.toUpperCase()} ${payload.eventType.toUpperCase()}`,
        `background:${getLogColor(payload.table)}; color:white`,
      )

      revalidationStackRef.current.add(payload.table)

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

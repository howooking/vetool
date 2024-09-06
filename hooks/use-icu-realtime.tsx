import {
  getIcuChart,
  getIcuIo,
  getIcuOrder,
} from '@/lib/services/icu/get-icu-data'
import { createClient } from '@/lib/supabase/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const supabase = createClient()

export function useIcuRealtime(hosId: string, targetDate: string) {
  const queryClient = useQueryClient()
  const refetchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const icuIoQuery = useQuery({
    queryKey: ['icu_io', hosId, targetDate],
    queryFn: () => getIcuIo(hosId, targetDate),
    staleTime: 0,
    refetchOnWindowFocus: true,
  })

  const icuChartQuery = useQuery({
    queryKey: ['icu_chart', hosId, targetDate],
    queryFn: () => getIcuChart(hosId, targetDate),
    staleTime: 0,
    refetchOnWindowFocus: true,
  })

  const icuChartOrderQuery = useQuery({
    queryKey: ['icu_order', hosId, targetDate],
    queryFn: () => getIcuOrder(hosId, targetDate),
    staleTime: 0,
    refetchOnWindowFocus: true,
  })

  const invalidateQueries = useDebouncedCallback((queryKey: string) => {
    console.log(`Invalidating ${queryKey}`)
    queryClient.invalidateQueries({
      queryKey: [queryKey, hosId, targetDate],
    })

    if (refetchTimeoutRef.current) {
      clearTimeout(refetchTimeoutRef.current)
    }

    refetchTimeoutRef.current = setTimeout(() => {
      console.log(`Refetching ${queryKey}`)
      queryClient.refetchQueries({
        queryKey: [queryKey, hosId, targetDate],
      })
    }, 500)
  }, 1000)

  useEffect(() => {
    const icuIoSubscription = supabase
      .channel(`icu_io_realtime_${hosId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_io',
          filter: `hos_id=eq.${hosId}`,
        },
        () => {
          console.log('%cio changed', 'background:blue; color:white')
          invalidateQueries('icu_io')
          // queryClient.refetchQueries({
          //   queryKey: ['icu_io', hosId, targetDate],
          // })
        },
      )
      .subscribe()

    const icuChartSubscription = supabase
      .channel(`icu_chart_realtime_${hosId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_chart',
          filter: `hos_id=eq.${hosId}`,
        },
        () => {
          console.log('%cchart changed', 'background:red; color:white')
          invalidateQueries('icu_chart')
          // queryClient.refetchQueries({
          //   queryKey: ['icu_chart', hosId, targetDate],
          // })
        },
      )
      .subscribe()

    const icuOrderSubscription = supabase
      .channel(`icu_chart_order_realtime_${hosId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_chart_order',
          filter: `hos_id=eq.${hosId}`,
        },
        () => {
          console.log('%corder changed', 'background:green; color:white')
          invalidateQueries('icu_order')
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(icuIoSubscription)
      supabase.removeChannel(icuChartSubscription)
      supabase.removeChannel(icuOrderSubscription)
      if (refetchTimeoutRef.current) {
        clearTimeout(refetchTimeoutRef.current)
      }
    }
  }, [hosId, queryClient])

  return {
    icuIoQuery,
    icuChartQuery,
    icuChartOrderQuery,
  }
}

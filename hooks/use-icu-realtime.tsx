import {
  getIcuChart,
  getIcuIo,
  getIcuOrder,
} from '@/lib/services/icu/get-icu-data'
import { createClient } from '@/lib/supabase/client'
import type { IcuData } from '@/types/icu'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const supabase = createClient()
// const TABLES = ['icu_io', 'icu_chart', 'icu_chart_order'] as const

export function useIcuRealtime(
  hosId: string,
  targetDate: string,
  initialIcuData: IcuData,
) {
  const queryClient = useQueryClient()

  const icuIoQuery = useQuery({
    queryKey: [`icu_io_realtime_${hosId}_${targetDate}`],
    queryFn: () => getIcuIo(hosId, targetDate),
    initialData: initialIcuData.icuIoData,
  })

  const icuChartQuery = useQuery({
    queryKey: [`icu_chart_realtime_${hosId}_${targetDate}`],
    queryFn: () => getIcuChart(hosId, targetDate),
    initialData: initialIcuData.icuChartData,
  })

  const icuChartOrderQuery = useQuery({
    queryKey: [`icu_chart_order_realtime_${hosId}_${targetDate}`],
    queryFn: () => getIcuOrder(hosId, targetDate),
    initialData: initialIcuData.icuChartOrderData,
  })

  const debouncedRevalidation = useDebouncedCallback((table: string) => {
    console.log(`${table} changed`)
    queryClient.invalidateQueries({
      queryKey: [`${table}_realtime_${hosId}_${targetDate}`],
    })
  }, 400)

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
          console.log(`icu_io changed`)
          queryClient.invalidateQueries({
            queryKey: [`icu_io_realtime_${hosId}_${targetDate}`],
          })
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
          console.log(`icu_cahrt changed`)
          queryClient.invalidateQueries({
            queryKey: [`icu_chart_realtime_${hosId}_${targetDate}`],
          })
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
          debouncedRevalidation('icu_chart_order')
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(icuIoSubscription)
      supabase.removeChannel(icuChartSubscription)
      supabase.removeChannel(icuOrderSubscription)
    }
  }, [debouncedRevalidation, hosId, queryClient, targetDate])

  return {
    icuIoQuery,
    icuChartQuery,
    icuChartOrderQuery,
  }
}

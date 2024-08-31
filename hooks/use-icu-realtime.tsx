import {
  getIcuChart,
  getIcuIo,
  getIcuOrder,
} from '@/lib/services/icu/get-icu-data'
import { createClient } from '@/lib/supabase/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

const supabase = createClient()
// const tables = ['icu_io', 'icu_chart', 'icu_chart_order', 'icu_chart_tx']

export function useIcuIoRealtime(hosId: string, targetDate: string) {
  const queryClient = useQueryClient()

  const ioQuery = useQuery({
    queryKey: [`icu_io_realtime_${hosId}`],
    queryFn: () => getIcuIo(hosId, targetDate),
    staleTime: 0,
  })

  useEffect(() => {
    const subscription = supabase
      .channel(`io_realtime_${hosId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_io',
          filter: `hos_id=eq.${hosId}`,
        },
        (payload) => {
          console.log('io changed', payload)
          queryClient.invalidateQueries({
            queryKey: [`icu_io_realtime_${hosId}`],
          })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [hosId, queryClient])
  return ioQuery
}

export function useIcuChartRealtime(hosId: string, targetDate: string) {
  const queryClient = useQueryClient()

  const chartQuery = useQuery({
    queryKey: [`icu_chart_realtime_${hosId}`],
    queryFn: () => getIcuChart(hosId, targetDate),
    staleTime: 0,
  })

  useEffect(() => {
    const subscription = supabase
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
          queryClient.invalidateQueries({
            queryKey: [`icu_chart_realtime_${hosId}`],
          })
        },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(subscription)
    }
  }, [hosId, queryClient])

  return chartQuery
}
export function useIcuOrderRealtime(hosId: string, targetDate: string) {
  const queryClient = useQueryClient()

  const orderQuery = useQuery({
    queryKey: [`icu_order_realtime_${hosId}`],
    queryFn: () => getIcuOrder(hosId, targetDate),
    staleTime: 0,
  })

  useEffect(() => {
    const subscription = supabase
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
          console.log('order changed')
          queryClient.invalidateQueries({
            queryKey: [`icu_order_realtime_${hosId}`],
          })
        },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(subscription)
    }
  }, [hosId, queryClient])

  return orderQuery
}

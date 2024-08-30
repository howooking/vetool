import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const supabase = createClient()
const tables = ['icu_io', 'icu_chart', 'icu_chart_order', 'icu_chart_tx']

export function useIcuRealTime(hosId: string) {
  const subscriptionsRef = useRef<Array<ReturnType<typeof supabase.channel>>>(
    [],
  )
  const statusRef = useRef<'connected' | 'disconnected'>('disconnected')

  const { refresh } = useRouter()

  const debouncedRefresh = useDebouncedCallback(() => {
    refresh()
  }, 300)

  const handleChange = useCallback(
    (table: string) => {
      if (table === 'icu_chart_order') {
        console.log(table + ' changed')
        debouncedRefresh()
      } else {
        console.log(table + ' changed')
        refresh()
      }
    },
    [debouncedRefresh, refresh],
  )

  const updateStatus = useCallback(
    (newStatus: 'connected' | 'disconnected') => {
      if (newStatus !== statusRef.current) {
        statusRef.current = newStatus
        console.log('Status updated:', newStatus)
      }
    },
    [],
  )

  const setupSubscriptions = useCallback(() => {
    let allConnected = true
    subscriptionsRef.current = tables.map((table) =>
      supabase
        .channel(`${table}_changes`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table,
            filter: `hos_id=eq.${hosId}`,
          },
          () => handleChange(table),
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log(`${table} channel connected`)
          } else {
            console.log(`${table} channel status: ${status}`)
            allConnected = false
          }
        }),
    )
    updateStatus(allConnected ? 'connected' : 'disconnected')
  }, [handleChange, hosId, updateStatus])

  const reconnect = useCallback(() => {
    console.log('Attempting to reconnect...')
    subscriptionsRef.current.forEach((subscription) =>
      subscription.unsubscribe(),
    )
    setupSubscriptions()
  }, [setupSubscriptions])

  useEffect(() => {
    setupSubscriptions()

    // 10초마다 웹소켓 커넥션 확인
    const reconnectInterval = setInterval(() => {
      if (statusRef.current === 'disconnected') {
        reconnect()
      }
    }, 10000)

    const handleVisibilityChange = () => {
      if (!document.hidden && statusRef.current === 'disconnected') {
        reconnect()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      subscriptionsRef.current.forEach((subscription) =>
        subscription.unsubscribe(),
      )
      clearInterval(reconnectInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [reconnect, refresh, setupSubscriptions])
}

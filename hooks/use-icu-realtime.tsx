import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const supabase = createClient()
const TABLES = ['icu_io', 'icu_charts', 'icu_orders', 'icu_txs'] as const
type TableName = (typeof TABLES)[number]

export function useIcuRealtime(hosId: string, targetDate: string) {
  const subscriptionRef = useRef<RealtimeChannel | null>(null)
  const [isSubscriptionReady, setIsSubscriptionReady] = useState(false)
  const { refresh } = useRouter()

  const deboucedRefresh = useDebouncedCallback(() => {
    console.log('deboucedRefresh')
    refresh()
  }, 500)

  const handleChange = useCallback(
    (payload: any) => {
      console.log(
        `%c${payload.table.toUpperCase()} ${payload.eventType}`,
        `background:${getLogColor(payload.table)}; color:white`,
      )
      deboucedRefresh()
    },
    [deboucedRefresh],
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

  useEffect(() => {
    subscribeToChannel()

    return () => {
      unsubscribe()
    }
  }, [subscribeToChannel, unsubscribe])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !subscriptionRef.current) {
        subscribeToChannel()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      unsubscribe()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [subscribeToChannel, unsubscribe])

  return isSubscriptionReady
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

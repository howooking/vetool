import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const supabase = createClient()
const TABLES = ['icu_io', 'icu_chart', 'icu_chart_order', 'icu_chart_tx']

export function useIcuRealTimeSubscription(hosId: string) {
  const [isSubscriptionReady, setIsSubscriptionReady] = useState(false)
  const { refresh } = useRouter()
  const debouncedRefresh = useDebouncedCallback(refresh, 500)
  const subscriptionRef = useRef<ReturnType<typeof supabase.channel> | null>(
    null,
  )

  const handleChange = useCallback(
    (payload: any) => {
      console.log(
        `%c${payload.table.toUpperCase()} ${payload.eventType.toUpperCase()}`,
        `background:${getColor(payload.table)}; color:white`,
      )
      console.log('Payload:', payload)
      debouncedRefresh()
    },
    [debouncedRefresh],
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
      if (status === 'SUBSCRIBED') {
        setIsSubscriptionReady(true)
        console.log('Subscribed to all tables')
      }
    })

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current)
      }
    }
  }, [hosId, handleChange])

  return isSubscriptionReady
}

function getColor(table: string): string {
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

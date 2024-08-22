import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function useIcuRealtimeSubscription(hosId: string) {
  const supabase = createClient()
  const { refresh } = useRouter()
  const [pendingChanges, setPendingChanges] = useState(false)

  const debouncedRefresh = useDebouncedCallback(() => {
    if (pendingChanges) {
      refresh()
      setPendingChanges(false)
    }
  }, 300)

  const handleChange = useCallback(
    (tableName: string) => {
      console.log(`${tableName} changed`)
      setPendingChanges(true)
      debouncedRefresh()
    },
    [debouncedRefresh],
  )

  useEffect(() => {
    const tables = ['icu_io', 'icu_chart', 'icu_chart_order', 'icu_chart_tx']
    const subscriptions = tables.map((table) =>
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
        .subscribe(),
    )

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
  }, [hosId, supabase, handleChange])

  // Ensure a refresh happens if there are pending changes
  useEffect(() => {
    if (pendingChanges) {
      debouncedRefresh()
    }
  }, [pendingChanges, debouncedRefresh])
}

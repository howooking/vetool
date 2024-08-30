import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useHomeRealtimeSubscription(hosId: string) {
  const supabase = createClient()
  const { refresh } = useRouter()

  //!!디바운스 불필요
  useEffect(() => {
    const tables = ['notices', 'todos']
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
          refresh,
        )
        .subscribe(),
    )

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
  }, [hosId, supabase, refresh])
}

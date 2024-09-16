import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const HOSPITAL_HOME_TABLES = ['notices', 'todos']

export function useHomeRealtimeSubscription(hosId: string) {
  const supabase = createClient()
  const { refresh } = useRouter()

  useEffect(() => {
    const subscriptions = HOSPITAL_HOME_TABLES.map((table) =>
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

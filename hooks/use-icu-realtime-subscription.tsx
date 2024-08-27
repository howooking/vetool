import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const supabase = createClient()
const tables = ['icu_io', 'icu_chart', 'icu_chart_order', 'icu_chart_tx']

export function useIcuRealTime(hosId: string) {
  const debouncedRefresh = useDebouncedCallback(() => {
    // 여러개 생성되더라도 한번만 실행
    console.log('order changed')
    refresh()
  }, 300)
  const { refresh } = useRouter()

  const handleChange = (table: string) => {
    if (table === 'icu_chart_order') {
      debouncedRefresh()
    } else {
      console.log(table + 'changed')
      refresh()
    }
  }

  useEffect(() => {
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
  }, [hosId, refresh])
}

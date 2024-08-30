import { getIcuNotification } from '@/lib/services/icu/get-icu-notification'
import { createClient } from '@/lib/supabase/client'
import type { IcuNotificationJoined } from '@/types/icu'
import { useCallback, useEffect, useState } from 'react'

const supabase = createClient()
export default function useRealtimeNotification(
  page: number = 1,
  hosId: string,
) {
  const [notifications, setNotifications] = useState<IcuNotificationJoined[]>(
    [],
  )
  const fetchIcuNotification = useCallback(async () => {
    const notificationData = await getIcuNotification(hosId, page)
    if (page === 1) {
      setNotifications(notificationData)
    } else {
      setNotifications((prev) => [...prev, ...notificationData])
    }
  }, [hosId, page])

  useEffect(() => {
    fetchIcuNotification()
  }, [fetchIcuNotification, hosId, page])

  useEffect(() => {
    const channel = supabase
      .channel('icu_notification_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_notification',
          filter: `hos_id=eq.${hosId}`,
        },
        fetchIcuNotification,
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [hosId, fetchIcuNotification])

  return { notifications }
}

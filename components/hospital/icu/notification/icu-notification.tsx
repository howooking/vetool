import MenuToggle from '@/components/hospital/icu/notification/menu-toggle'
import Navigation from '@/components/hospital/icu/notification/navigation'
import { SIDEBAR_STYLE } from '@/constants/hospital/icu/notification'
import { useDimensions } from '@/hooks/use-dimensions'
import { useRealtimeSubscription } from '@/hooks/use-realtime-subscription'
import { getIcuNotification } from '@/lib/services/icu/get-icu-notification'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'

import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { createClient } from '@/lib/supabase/client'
import type { IcuNotification } from '@/types'
import { format } from 'date-fns'
import { motion, useCycle } from 'framer-motion'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function IcuNotification() {
  const containerRef = useRef(null)
  const searchParams = useSearchParams()

  const { hos_id } = useParams()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setSelectedPatientId } = useIcuSelectedPatientIdStore()
  const { height } = useDimensions(containerRef)
  const { push } = useRouter()

  const [page, setPage] = useState(1)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isToggleOpen, setIsToggleOpen] = useCycle(false, true)
  const [readStatus, setReadStatus] = useState<{ [key: string]: boolean }>({})
  const [notificationData, setNotificationData] = useState<IcuNotification[]>(
    [],
  )

  useRealtimeSubscription(hos_id as string)

  const fetchNotifications = useCallback(async () => {
    const data = await getIcuNotification(hos_id as string, page)

    setNotificationData(data)
  }, [hos_id, page])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  useEffect(() => {
    const channel = createClient()
      .channel('icu_notification_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'icu_notification',
          filter: `hos_id=eq.${hos_id}`,
        },
        fetchNotifications,
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [hos_id, fetchNotifications])

  useEffect(() => {
    // 읽은 알림 key-value state
    const storedReadStatus: { [key: string]: boolean } = {}
    // 읽지 않은 알림의 개수
    let newUnreadCount = 0

    // 읽은 알림 저장
    notificationData.forEach((notification) => {
      const isRead =
        localStorage.getItem(`notification_${notification.notification_id}`) ===
        'true'

      storedReadStatus[notification.notification_id] = isRead

      // 읽지 않은 알림이라면 개수 +1
      if (!isRead) newUnreadCount += 1
    })

    setReadStatus(storedReadStatus)
    setUnreadCount(newUnreadCount)
  }, [notificationData])

  const handleUpdateDate = useCallback(
    (targetDate: string) => {
      const newDate = new Date(targetDate)
      newDate.setDate(newDate.getDate())

      const newDateString = format(newDate, 'yyyy-MM-dd')
      const params = new URLSearchParams(searchParams)
      const newPath = `/hospital/${hos_id}/icu/${newDateString}?${params.toString()}`

      push(newPath)
    },
    [hos_id, push, searchParams],
  )

  const handleReadStatusChange = useCallback(
    (notificationId: string, patientId: string, targetDate: string) => {
      setReadStatus((prevStatus) => ({
        ...prevStatus,
        [notificationId]: true,
      }))

      // 읽은 알림 localStorage에 저장
      localStorage.setItem(`notification_${notificationId}`, 'true')
      // 미확인 알림 개수 -1
      setUnreadCount((prevCount) => prevCount - 1)
      handleUpdateDate(targetDate)
      setSelectedIcuMainView('chart')
      setSelectedPatientId(patientId)
      setIsToggleOpen()
    },
    [
      handleUpdateDate,
      setIsToggleOpen,
      setSelectedIcuMainView,
      setSelectedPatientId,
    ],
  )

  return (
    <motion.nav
      initial={false}
      animate={isToggleOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      className="fixed bottom-3 right-3 top-1/2 ml-auto w-[300px]"
    >
      <motion.div
        className="fixed bottom-3 right-3 top-1/2 w-[300px] rounded-lg bg-primary"
        variants={SIDEBAR_STYLE}
      />
      <Navigation
        notificationData={notificationData}
        readStatus={readStatus}
        isToggleOpen={isToggleOpen}
        setIsToggleOpen={setIsToggleOpen}
        page={page}
        setPage={setPage}
        handleReadStatusChange={handleReadStatusChange}
        handleUpdateDate={handleUpdateDate}
      />
      <MenuToggle toggle={() => setIsToggleOpen()} unReadCount={unreadCount} />
    </motion.nav>
  )
}

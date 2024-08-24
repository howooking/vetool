import MenuToggle from '@/components/hospital/icu/notification/menu-toggle'
import Navigation from '@/components/hospital/icu/notification/navigation'
import { SIDEBAR_STYLE } from '@/constants/hospital/icu/notification'
import { useDimensions } from '@/hooks/use-dimensions'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { getIcuNotification } from '@/lib/services/icu/get-icu-notification'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import type { IcuNotificationJoined } from '@/types/icu'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function IcuNotification() {
  const searchParams = useSearchParams()
  const containerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { hos_id } = useParams()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setSelectedPatientId } = useIcuSelectedPatientIdStore()
  const { height } = useDimensions(containerRef)
  const { push } = useRouter()

  const [page, setPage] = useState(1)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isToggleOpen, setIsToggleOpen] = useState(false)
  const [readStatus, setReadStatus] = useState<{ [key: string]: boolean }>({})
  const [notificationData, setNotificationData] = useState<
    IcuNotificationJoined[]
  >([])

  const fetchNotifications = useCallback(async () => {
    const data = await getIcuNotification(hos_id as string, page)

    if (page > 1) {
      setNotificationData((prevNotificationData) => [
        ...prevNotificationData,
        ...data,
      ])
    } else {
      setNotificationData(data)
    }
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
      setIsToggleOpen(false)
    },
    [
      handleUpdateDate,
      setIsToggleOpen,
      setSelectedIcuMainView,
      setSelectedPatientId,
    ],
  )

  useOutsideClick(containerRef, () => {
    setIsToggleOpen(false)
  })

  return (
    <>
      <motion.nav
        initial={false}
        animate={isToggleOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
        className={cn(
          'fixed bottom-3 right-3 top-1/2 ml-auto w-[300px]',
          !isToggleOpen && 'pointer-events-none',
        )}
      >
        <motion.div
          className={cn(
            'fixed bottom-3 right-3 top-1/2 w-[300px] rounded-lg bg-primary',
            !isToggleOpen && 'pointer-events-none',
          )}
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
      </motion.nav>
      <MenuToggle
        isToggleOpen={isToggleOpen}
        setIsToggleOpen={setIsToggleOpen}
        unReadCount={unreadCount}
        buttonRef={buttonRef}
      />
    </>
  )
}

// 함수 사용하는 곳에서 선언

import { Button } from '@/components/ui/button'
import useRealtimeNotification from '@/hooks/use-realtime-notification'
import { cn } from '@/lib/utils'
import { ChevronDown, X } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import SingleNotification from './single-notification'

export type LocalReadNotification = {
  id: string
  created_at: string
}

export default function Notifications({
  isPopupOpen,
  setIsPopupOpen,
  hosId,
  setUnreadCount,
}: {
  isPopupOpen: boolean
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>
  hosId: string
  setUnreadCount: Dispatch<SetStateAction<number>>
}) {
  const [localReadNotifications, setLocalReadNotification] = useState<
    LocalReadNotification[]
  >([])

  // 실제 데이터가 사용되는 곳에서 커스텀 훅(웹소켓 연결 + 데이터 가져오기)
  const [page, setPage] = useState(1)
  const { notifications } = useRealtimeNotification(page, hosId)
  const isLastPage = useMemo(
    () =>
      notifications.length % 10 !== 0 ||
      (page > 1 && notifications.length === 10) ||
      notifications.length === 0,
    [page, notifications.length],
  )

  useEffect(() => {
    const stringifiedReadNotifications = localStorage.getItem('notifications')
    const parsedLocalStorageNotification: LocalReadNotification[] =
      stringifiedReadNotifications
        ? JSON.parse(stringifiedReadNotifications)
        : []
    setLocalReadNotification(parsedLocalStorageNotification)

    const readNotificationIds = new Set(
      parsedLocalStorageNotification.map((readNote) => readNote.id),
    )

    if (notifications.length === 0) {
      setUnreadCount(0)
      return
    }

    const unreadCount = notifications.reduce((count, notification) => {
      const isRead = readNotificationIds.has(notification.notification_id)
      return isRead ? count : count + 1
    }, 0)
    setUnreadCount(unreadCount)
  }, [notifications, setUnreadCount])

  return (
    <ul
      className={cn(
        'flex w-[300px] flex-col gap-3 overflow-auto',
        !isPopupOpen && 'hidden',
      )}
    >
      <div
        className={
          'relative flex items-center justify-between rounded-lg text-white'
        }
      >
        <span className="font-bold">
          {notifications.length > 0 ? '알림 목록' : '알림이 없습니다'}
        </span>
        <X
          onClick={() => setIsPopupOpen(false)}
          className="cursor-pointer p-1"
        />
      </div>

      {notifications.map((notification) => {
        const isRead = localReadNotifications.some(
          (n) => n.id === notification.notification_id,
        )
        return (
          <SingleNotification
            key={notification.notification_id}
            notification={notification}
            isRead={isRead}
            setIsPopupOpen={setIsPopupOpen}
            setUnreadCount={setUnreadCount}
            setLocalReadNotification={setLocalReadNotification}
            localReadNotifications={localReadNotifications}
          />
        )
      })}

      {!isLastPage && (
        <Button
          variant="outline"
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="z-10"
        >
          더보기
          <ChevronDown className="ml-1" />
        </Button>
      )}
    </ul>
  )
}

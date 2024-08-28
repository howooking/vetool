// 함수 사용하는 곳에서 선언

import { Button } from '@/components/ui/button'
import useRealtimeNotification from '@/hooks/use-realtime-notification'
import { ChevronDown, X } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import SingleNotification from './single-notification'
import { cn } from '@/lib/utils'

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
  const [page, setPage] = useState(1)
  // 실제 데이터가 사용되는 곳에서 커스텀 훅(웹소켓 연결 + 데이터 가져오기)
  const { notifications } = useRealtimeNotification(page, hosId)
  const isLastPage = useMemo(
    () =>
      notifications.length % 10 !== 0 ||
      (page > 1 && notifications.length === 10) ||
      notifications.length === 0,
    [page, notifications.length],
  )

  // 로컬저장소에서 저장만하고 삭제는 안하고 있음 나중에 문제발생 가능성
  const [readStatus, setReadStatus] = useState<{ [key: string]: boolean }>({})
  useEffect(() => {
    // 읽은 알림 key-value state
    const storedReadStatus: { [key: string]: boolean } = {}
    // 읽지 않은 알림의 개수
    let newUnreadCount = 0

    // 읽은 알림 저장
    notifications.forEach((notification) => {
      const isRead =
        localStorage.getItem(`notification_${notification.notification_id}`) ===
        'true'

      storedReadStatus[notification.notification_id] = isRead

      // 읽지 않은 알림이라면 개수 +1
      if (!isRead) newUnreadCount += 1
    })

    setReadStatus(storedReadStatus)
    setUnreadCount(newUnreadCount)
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
        const isRead = readStatus[notification.notification_id]
        return (
          <SingleNotification
            key={notification.notification_id}
            notification={notification}
            isRead={isRead}
            setIsPopupOpen={setIsPopupOpen}
            setUnreadCount={setUnreadCount}
            setReadStatus={setReadStatus}
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

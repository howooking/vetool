import { LI_MOTION } from '@/constants/hospital/icu/notification/aniimations'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn, getTimeSince, isDaysBehind } from '@/lib/utils'
import { IcuNotificationJoined } from '@/types/icu'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { LocalReadStatus } from './notifications'

type MenuItemProps = {
  notification: IcuNotificationJoined
  isRead: boolean
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>
  setUnreadCount: Dispatch<SetStateAction<number>>
  setLocalReadStatus: Dispatch<SetStateAction<LocalReadStatus[]>>
  localReadStatus: LocalReadStatus[]
}

export default function SingleNotification({
  notification,
  isRead,
  setIsPopupOpen,
  setUnreadCount,
  setLocalReadStatus,
  localReadStatus,
}: MenuItemProps) {
  const { push } = useRouter()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setSelectedPatientId } = useIcuSelectedPatientIdStore()

  const handleClick = () => {
    setSelectedIcuMainView('chart')
    setSelectedPatientId(notification.patient_id.patient_id)
    // !! 새로운 url만들필요 없이 push하며 끝
    push(`${notification.target_date}`)
    setIsPopupOpen(false)

    if (isRead) return

    // !!안읽은 알림을 눌렀을 때 10일이상 된 로컬저장소 기록을 삭제
    const feshedNotifications = localReadStatus.filter(
      (n) => !isDaysBehind(n.created_at, 10),
    )

    const newNotifications = [
      ...feshedNotifications,
      {
        id: notification.notification_id,
        created_at: notification.created_at,
      },
    ]
    setLocalReadStatus(newNotifications)
    localStorage.setItem('notifications', JSON.stringify(newNotifications))
    setUnreadCount((prev) => prev - 1)
  }

  return (
    <motion.li
      variants={LI_MOTION}
      className={cn(
        'z-10 flex cursor-pointer items-center rounded-md bg-white p-2 shadow-md',
        isRead && 'bg-opacity-50',
      )}
      onClick={handleClick}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="mb-1 flex items-center justify-between">
          <span className="line-clamp-1 text-sm font-bold text-primary">
            {`${notification.patient_id.name} · 
              ${notification.patient_id.breed} · 
              ${notification.patient_id.gender}`}
          </span>

          <span className="text-right text-xs text-gray-600">
            {getTimeSince(notification.created_at)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="shrink-0 text-xs text-muted-foreground">
            {notification.notification_time}시
          </span>
          <span className="line-clamp-1 text-sm font-bold text-gray-600">
            {notification.notification_title}
          </span>
        </div>

        <span className="truncate text-xs">
          {notification.notification_content}
        </span>
      </div>
    </motion.li>
  )
}

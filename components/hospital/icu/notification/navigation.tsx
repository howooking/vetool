import MenuItem from '@/components/hospital/icu/notification/menu-item'
import { LI_STYLE, UL_STYLE } from '@/constants/hospital/icu/notification'
import type { IcuNotificationJoined } from '@/types/icu'
import { motion } from 'framer-motion'
import { ChevronDown, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

type NavigationProps = {
  page: number
  isToggleOpen: boolean
  notificationData: IcuNotificationJoined[]
  readStatus: { [key: string]: boolean }
  setPage: Dispatch<SetStateAction<number>>
  setIsToggleOpen: Dispatch<SetStateAction<boolean>>
  handleUpdateDate: (targetDate: string) => void
  handleReadStatusChange: (
    notificationId: string,
    patientId: string,
    targetDate: string,
  ) => void
}

export default function Navigation({
  notificationData,
  readStatus,
  isToggleOpen,
  setIsToggleOpen,
  page,
  setPage,
  handleReadStatusChange,
  handleUpdateDate,
}: NavigationProps) {
  const isLastPage =
    notificationData.length % 10 !== 0 ||
    (page > 1 && notificationData.length === 10) ||
    notificationData.length === 0

  return (
    <motion.ul
      variants={UL_STYLE}
      className="flex h-[85%] w-[300px] flex-col gap-4 overflow-auto p-6"
    >
      <motion.li
        variants={LI_STYLE}
        className={
          'relative flex items-center justify-between rounded-lg text-center text-xl font-bold text-white'
        }
      >
        {notificationData.length > 0 ? '알림 목록' : '표시할 알림이 없습니다'}

        <X
          size={20}
          onClick={() => setIsToggleOpen(false)}
          className="cursor-pointer"
        />
      </motion.li>

      {notificationData.map((data) => (
        <MenuItem
          key={data.notification_id}
          data={data}
          isToggleOpen={isToggleOpen}
          isRead={readStatus[data.notification_id]}
          handleReadStatusChange={handleReadStatusChange}
          setIsToggleOpen={setIsToggleOpen}
          handleUpdateDate={handleUpdateDate}
        />
      ))}

      {!isLastPage && (
        <motion.button
          variants={LI_STYLE}
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="relative z-10 flex items-center justify-center rounded-lg bg-green-100 p-1 text-sm font-bold"
        >
          더보기
          <ChevronDown size={20} />
        </motion.button>
      )}
    </motion.ul>
  )
}

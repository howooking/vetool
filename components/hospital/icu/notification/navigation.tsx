import MenuItem from '@/components/hospital/icu/notification/menu-item'
import { LI_STYLE, UL_STYLE } from '@/constants/hospital/icu/notification'
import { cn } from '@/lib/utils'
import type { IcuNotification } from '@/types'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

type NavigationProps = {
  page: number
  isToggleOpen: boolean
  notificationData: IcuNotification[]
  readStatus: { [key: string]: boolean }
  setPage: Dispatch<SetStateAction<number>>
  setIsToggleOpen: () => void
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
      className="z-20 flex h-[85%] w-[300px] flex-col gap-4 overflow-auto p-6"
    >
      <motion.li
        variants={LI_STYLE}
        className={cn(
          'relative z-10 rounded-lg text-center text-lg font-bold text-white',
          isToggleOpen && 'bg-primary',
          !isToggleOpen && 'hidden',
        )}
      >
        {notificationData.length > 0 ? '알림 목록' : '표시할 알림이 없습니다'}
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

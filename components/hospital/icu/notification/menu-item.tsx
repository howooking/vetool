import { LI_STYLE } from '@/constants/hospital/icu/notification'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn, getTimeSince } from '@/lib/utils'
import { IcuNotificationJoined } from '@/types/icu'
import { motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'

type MenuItemProps = {
  data: IcuNotificationJoined
  isRead: boolean
  isToggleOpen: boolean
  setIsToggleOpen: Dispatch<SetStateAction<boolean>>
  handleUpdateDate: (targetDate: string) => void
  handleReadStatusChange: (
    notificationId: string,
    patientId: string,
    targetDate: string,
  ) => void
}

export default function MenuItem({
  data,
  isRead,
  isToggleOpen,
  setIsToggleOpen,
  handleReadStatusChange,
  handleUpdateDate,
}: MenuItemProps) {
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setSelectedPatientId } = useIcuSelectedPatientIdStore()

  const handleClick = () => {
    if (!isRead) {
      handleReadStatusChange(
        data.notification_id,
        data.patient_id.patient_id,
        data.target_date,
      )
    } else {
      setSelectedIcuMainView('chart')
      setSelectedPatientId(data.patient_id.patient_id)
      setIsToggleOpen(false)
      handleUpdateDate(data.target_date)
    }
  }

  return (
    <motion.li
      variants={LI_STYLE}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative z-10 flex cursor-pointer items-center rounded-lg bg-white p-3 shadow-md',
        isRead && 'bg-opacity-50 opacity-50',
        !isToggleOpen && 'hidden',
      )}
      onClick={handleClick}
    >
      <div className="flex w-full flex-col">
        <div className="mb-1 flex items-center justify-between font-semibold text-primary">
          <span className="line-clamp-2 max-w-[90%]">
            {data.notification_title}
          </span>

          {!isRead && (
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          )}
        </div>

        <div className="mb-2 mt-1 line-clamp-5 text-sm text-gray-600">
          {data.notification_content}
        </div>

        <div className="flex justify-between">
          <div className="text-[11px] text-gray-600">
            {`${data.patient_id.name}·
              ${data.patient_id.breed}·
              ${data.patient_id.gender}`}
          </div>
          <div className="text-right text-xs text-gray-600">
            {getTimeSince(data.created_at)}
          </div>
        </div>
      </div>
    </motion.li>
  )
}

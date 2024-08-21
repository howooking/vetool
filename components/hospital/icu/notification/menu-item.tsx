import { cn } from '@/lib/utils'
import { IcuNotification } from '@/types'
import { motion } from 'framer-motion'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { LI_STYLE } from '@/constants/hospital/icu/notification'

type MenuItemProps = {
  data: IcuNotification
  isRead: boolean
  isToggleOpen: boolean
  setIsToggleOpen: () => void
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
  const { setSelectedPatient } = useIcuSelectedPatientStore()

  const handleClick = () => {
    if (!isRead) {
      handleReadStatusChange(
        data.notification_id,
        data.patient_id,
        data.target_date,
      )
    } else {
      setSelectedIcuMainView('chart')
      setSelectedPatient({ patientId: data.patient_id, patientName: '' })
      setIsToggleOpen()
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
          <span>{data.notification_title}</span>
          {!isRead && (
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          )}
        </div>
        <div className="text-sm text-gray-600">{data.notification_content}</div>
      </div>
    </motion.li>
  )
}

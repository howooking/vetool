import { useState } from 'react'
import NotificationButton from './notification-button'
import NotificationPopup from './popup/notification-popup'

export default function IcuNotification({ hosId }: { hosId: string }) {
  const [unReadCount, setUnreadCount] = useState(0)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <div>
      <NotificationPopup
        isPopupOpen={isPopupOpen}
        hosId={hosId}
        setIsPopupOpen={setIsPopupOpen}
        setUnreadCount={setUnreadCount}
      />

      <NotificationButton
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        unReadCount={unReadCount}
      />
    </div>
  )
}

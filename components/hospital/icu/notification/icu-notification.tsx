// todo : footer폴더 안으로
// !!거대 컴포넌트 >> 컴포넌트 추상화. 하나의 컴포넌트가 여러가지 작업을 하고 있음

import NotificationButton from '@/components/hospital/icu/notification/menu-toggle'
import { useState } from 'react'
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

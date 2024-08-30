// todo : 파일명  변경

import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import UnReadCount from './unread-count'

export default function NotificationButton({
  isPopupOpen,
  setIsPopupOpen,
  unReadCount,
}: {
  isPopupOpen: boolean
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>
  unReadCount: number
}) {
  // !!간단한 함수는 그냥 바로 사용
  // const handleButtonClick = () => {
  //   setIsPopupOpen(true)
  // }

  return (
    // !!Shadcn Button 사용
    <Button
      onClick={() => setIsPopupOpen(true)}
      disabled={isPopupOpen}
      size="sm"
      variant="ghost"
      className="relative z-10 mr-1"
    >
      <MessageSquare />

      {/* 추상화 */}
      {unReadCount > 0 && <UnReadCount unReadCount={unReadCount} />}
    </Button>
  )
}

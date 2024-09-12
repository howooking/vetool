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
  return (
    <Button
      onClick={() => setIsPopupOpen(true)}
      disabled={isPopupOpen}
      size="sm"
      variant="ghost"
      className="relative z-10 mr-1"
    >
      <MessageSquare />

      {unReadCount > 0 && <UnReadCount unReadCount={unReadCount} />}
    </Button>
  )
}

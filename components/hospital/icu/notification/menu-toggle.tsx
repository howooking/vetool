import { MessageSquareWarning } from 'lucide-react'
import { Dispatch, SetStateAction, useRef } from 'react'

export default function MenuToggle({
  isToggleOpen,
  setIsToggleOpen,
  unReadCount,
  buttonRef,
}: {
  isToggleOpen: boolean
  setIsToggleOpen: Dispatch<SetStateAction<boolean>>
  unReadCount: number
  buttonRef: React.RefObject<HTMLButtonElement>
}) {
  const handleButtonClick = () => {
    setIsToggleOpen((prevIsToggleOpen) => !prevIsToggleOpen)
  }

  return (
    <button
      onClick={handleButtonClick}
      ref={buttonRef}
      disabled={isToggleOpen}
      className="fixed bottom-5 right-5 flex h-12 w-12 transform items-center justify-center rounded-full bg-primary transition-transform duration-100 hover:scale-105"
    >
      <MessageSquareWarning size={24} color="#fff" />

      {unReadCount > 0 && (
        <div className="absolute bottom-7 left-7 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {unReadCount}
        </div>
      )}
    </button>
  )
}

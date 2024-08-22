import { MessageSquareWarning } from 'lucide-react'

export default function MenuToggle({
  toggle,
  unReadCount,
}: {
  toggle: () => void
  unReadCount: number
}) {
  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary"
    >
      <MessageSquareWarning size={24} color={'#acdac9'} />
      {unReadCount > 0 && (
        <div className="absolute bottom-7 left-7 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {unReadCount}
        </div>
      )}
    </button>
  )
}

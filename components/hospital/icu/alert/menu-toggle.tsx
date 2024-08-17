import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Bell, MessageSquareWarning } from 'lucide-react'

export default function MenuToggle({ toggle }: { toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full"
    >
      <MessageSquareWarning size={24} />
    </button>
  )
}

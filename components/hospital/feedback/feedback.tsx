'use client'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MessageCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import FeedbackForm from './feedback-form'

const DynamicFeedbackForm = dynamic(() => import('./feedback-form'), {
  ssr: false,
  loading: () => <FeedbackForm />,
})

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-20">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80">
          {isOpen && <DynamicFeedbackForm />}
        </PopoverContent>
      </Popover>
    </div>
  )
}

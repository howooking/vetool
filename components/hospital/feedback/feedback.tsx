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
import useIsMobile from '@/hooks/use-is-mobile'
import { cn } from '@/lib/utils'

const DynamicFeedbackForm = dynamic(() => import('./feedback-form'), {
  ssr: false,
  loading: () => <FeedbackForm />,
})

export default function Feedback() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className={cn(isMobile ? 'hidden' : 'fixed bottom-5 right-8 z-20')}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full shadow-lg"
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

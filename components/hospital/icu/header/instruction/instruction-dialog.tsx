'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Info } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import InstructionSidebar from './instruction-sidebar'

const DynamicInstructionContents = dynamic(
  () => import('./instruction-contents'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle />,
  },
)

export function InstructionDialog() {
  const [currentVideo, setCurrentVideo] = useState({
    menuId: 1,
    slideId: 1,
  })

  return (
    <Dialog>
      <DialogTrigger asChild className="hidden md:inline-flex">
        <Button variant="ghost" size="icon">
          <Info size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[1400px]">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <div className="flex">
          <InstructionSidebar
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
          />

          <DynamicInstructionContents
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export default function RefreshButton() {
  const handleHardRefresh = () => {
    window.location.reload()
  }

  return (
    <Button
      onClick={handleHardRefresh}
      className="hidden items-center gap-2 md:flex"
      size="sm"
      variant="outline"
    >
      <RefreshCw size={16} />
    </Button>
  )
}

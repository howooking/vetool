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
      className="flex items-center gap-2"
      size="sm"
      variant="outline"
    >
      <RefreshCw size={16} />
      새로고침
    </Button>
  )
}

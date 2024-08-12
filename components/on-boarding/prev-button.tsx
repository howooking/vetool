'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function PrevButton() {
  const { back } = useRouter()

  return (
    <Button
      variant="outline"
      type="submit"
      className="absolute left-4 top-4 pl-2"
      onClick={back}
    >
      <ChevronLeft size={20} />
      뒤로가기
    </Button>
  )
}

'use client'

import { ChevronLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/lib/actions/auth'

export default function PrevButton() {
  const path = usePathname()
  const { back } = useRouter()

  const handlePrev = async () => {
    if (path === '/on-boarding') {
      await logout()
      return
    }
    back()
  }

  return (
    <Button
      variant="outline"
      className="flex items-center pl-2"
      onClick={handlePrev}
    >
      <ChevronLeft />
      이전
    </Button>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { logout } from '@/lib/services/auth/authentication'
import { cancelApproval } from '@/lib/services/on-boarding/on-boarding'
import { cn } from '@/lib/utils'
import { UserApprovalHosJoined } from '@/types/on-boarding'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function ApprovalWaitingContents({
  userApprovalData,
}: {
  userApprovalData: UserApprovalHosJoined[]
}) {
  const [isCanceling, setCanceling] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCancelAction = async (formData: FormData) => {
    setCanceling(true)
    await cancelApproval(formData)
    setCanceling(false)
  }

  const handleLogout = async () => {
    setIsSubmitting(true)
    await logout()
    setIsSubmitting(false)
  }

  return (
    <div>
      <span className="text-2xl font-bold">
        {userApprovalData.at(0)?.hos_id.name}
      </span>
      {isCanceling ? '으로의 승인요청 취소중입니다' : '에서 승인 대기중입니다'}
      <div className="mt-4 flex gap-4">
        <form action={handleCancelAction}>
          <input
            type="text"
            defaultValue={userApprovalData.at(0)?.user_approval_id}
            className="hidden"
            name="user_approval_id"
          />
          <Button
            className="w-full"
            disabled={isCanceling || isSubmitting}
            variant="outline"
          >
            승인요청 취소
            <LoaderCircle
              className={cn(isCanceling ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </form>

        <form action={handleLogout} className="w-full">
          <Button
            type="submit"
            disabled={isCanceling || isSubmitting}
            className="w-full"
          >
            홈으로 이동
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </form>
      </div>
    </div>
  )
}

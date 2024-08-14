'use client'

import { Button } from '@/components/ui/button'
import { deleteNotice } from '@/lib/services/hospital-home/notice'
import { LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

export default function DeleteNoticeButton({
  noticeId,
  setIsDialogOpen,
}: {
  noticeId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDeleteNotice = async () => {
    setIsDeleting(true)
    await deleteNotice(noticeId)
    setIsDialogOpen(false)
    window.location.reload()
    setIsDeleting(false)
  }

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleDeleteNotice}
      disabled={isDeleting}
    >
      삭제
      {isDeleting && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  )
}

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export function ApprovalColumn({
  userId,
  name,
  isApproved,
}: {
  userId: string
  name: string
  isApproved: boolean
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()
  const { hos_id } = useParams()

  const handleApproval = async () => {
    setIsUpdating(true)
    const supabase = createClient()

    const { error } = await supabase.rpc(
      'update_user_approval_and_user_hos_id_when_approved',
      {
        hos_id_input: hos_id as string,
        user_id_input: userId,
      },
    )

    if (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: error.message,
        description: '관리자에게 문의하세요',
      })
      setIsUpdating(false)
      return
    }

    toast({
      title: `${name}님을 스태프목록에 추가하였습니다`,
      description: '스태프관리페이지에서 설정을 변경할 수 있습니다',
    })
    setIsUpdating(false)
    setIsOpen(false)
    refresh()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isApproved}
          variant={isApproved ? 'secondary' : 'default'}
        >
          {isApproved ? '승인완료' : '승인'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>스태프 추가</DialogTitle>
          <DialogDescription>
            {name}님을 스태프목록에 추가하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="ml-auto">
          <Button type="button" onClick={handleApproval} disabled={isUpdating}>
            추가
            <LoaderCircle
              className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              아니오
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

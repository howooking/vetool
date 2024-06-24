import { CopyIcon } from '@radix-ui/react-icons'

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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoaderCircle, UserRoundMinus, UserX } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function DeleteUserColumn({
  name,
  userId,
  isMaster,
  masterUserId,
}: {
  name: string
  userId: string
  isMaster: boolean
  masterUserId: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleUpdateUser = async () => {
    const supabase = createClient()

    setIsUpdating(true)

    const { error: updateUserError } = await supabase
      .from('users')
      .update({
        hos_id: null,
        position: null,
        rank: 99,
        group: null,
        is_admin: false,
      })
      .match({ user_id: userId })

    if (updateUserError) {
      console.log(updateUserError)
      toast({
        variant: 'destructive',
        title: updateUserError.message,
        description: '관리자에게 문의하세요',
      })
      return
    }

    toast({
      title: `${name}님을 병원 직원목록에서 삭제하였습니다.`,
    })
    setIsUpdating(false)
    setIsOpen(false)
    refresh()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          // className="h-6 w-6"
          disabled={!isMaster || userId === masterUserId}
        >
          <UserRoundMinus size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>병원 직원 목록 삭제</DialogTitle>
          <DialogDescription>
            {name}님을 병원직원목록에서 삭제하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="ml-auto">
          <Button
            type="button"
            variant="destructive"
            onClick={handleUpdateUser}
            disabled={!isMaster || isUpdating}
          >
            삭제
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

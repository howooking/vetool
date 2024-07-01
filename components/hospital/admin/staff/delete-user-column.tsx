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
import { LoaderCircle, UserRoundMinus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const handleUpdateUser = async () => {
    setIsUpdating(true)
    const supabase = createClient()

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
      setIsUpdating(false)
      return
    }

    toast({
      title: `${name}님을 스태프목록에서 삭제하였습니다.`,
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
          disabled={!isMaster || userId === masterUserId}
        >
          <UserRoundMinus size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>스태프 삭제</DialogTitle>
          <DialogDescription>
            {name}님을 스태프목록에서 삭제하시겠습니까?
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

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
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'
import { redirect, useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SelectColumn({
  hosId,
  authUserId,
  name,
}: {
  hosId: string
  authUserId: string
  name: string
}) {
  const { replace } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async () => {
    setIsSubmitting(true)
    const supabase = createClient()

    const { error } = await supabase.from('user_approval').insert({
      user_id: authUserId,
      hos_id: hosId,
    })

    if (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: error.message,
      })
      return
    }

    toast({
      title: '승인 요청을 보냈습니다.',
      description: '승인 완료 후 로그인 해주세요.',
    })
    setIsSubmitting(false)
    setIsOpen(false)
    replace('/')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>선택</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>승인 요청하기</DialogTitle>
          <DialogDescription>{name}에 승인요청을 보냅니다.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="ml-auto sm:justify-start">
          <Button onClick={handleSubmit}>
            확인
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

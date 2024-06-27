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
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SelectColumn({
  hosId,
  name,
}: {
  hosId: string
  name: string
}) {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const isVet = searchParams.get('is_vet')
  const username = searchParams.get('name')

  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async () => {
    setIsSubmitting(true)
    const supabase = createClient()

    const { error } = await supabase.rpc(
      'update_user_info_when_sending_approval',
      {
        is_vet_input: isVet === 'true',
        name_input: username!,
        hos_id_input: hosId,
      },
    )

    if (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: error.message,
      })
      setIsSubmitting(false)
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
        <Button size="sm">선택</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>승인 요청하기</DialogTitle>
          <DialogDescription>{name}에 승인요청을 보냅니다.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="ml-auto sm:justify-start">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
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

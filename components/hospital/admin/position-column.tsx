import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PositionColumn({
  position,
  userId,
}: {
  position: string | null
  userId: string
}) {
  const [positionInput, setPositionInput] = useState(position)
  const { refresh } = useRouter()

  const handleUpdatePosition = async () => {
    const supabase = createClient()

    if (position === positionInput) {
      return
    }

    if (positionInput && positionInput.length > 10) {
      toast({
        variant: 'destructive',
        title: '10자 내로 입력해주세요',
      })
      setPositionInput(position)
      return
    }

    const { error: positionUpdateError } = await supabase
      .from('users')
      .update({ position: positionInput })
      .match({ user_id: userId })

    if (positionUpdateError) {
      toast({
        variant: 'destructive',
        title: positionUpdateError.message,
        description: '관리자에게 문의하세요',
      })
      return
    }

    toast({
      title: '직책을을 변경하였습니다.',
    })
    refresh()
  }

  return (
    <Input
      className="mx-auto w-40"
      value={positionInput ?? ''}
      onChange={(e) => setPositionInput(e.target.value)}
      onBlur={handleUpdatePosition}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
    />
  )
}

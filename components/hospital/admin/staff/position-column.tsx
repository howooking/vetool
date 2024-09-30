import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateStaffPosition } from '@/lib/services/admin/staff/staff'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PositionColumn({
  position,
  userId,
}: {
  position: string
  userId: string
}) {
  const [positionInput, setPositionInput] = useState(position)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  useEffect(() => {
    setPositionInput(position)
  }, [position])

  const handleUpdatePosition = async () => {
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

    setIsUpdating(true)

    await updateStaffPosition(userId, positionInput)

    toast({
      title: '직책을을 변경하였습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  return (
    <Input
      className="mx-auto w-32"
      value={positionInput ?? ''}
      onChange={(e) => setPositionInput(e.target.value)}
      onBlur={handleUpdatePosition}
      disabled={isUpdating}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const target = e.currentTarget
          setTimeout(() => {
            if (target) {
              target.blur()
            }
          }, 0)
        }
      }}
    />
  )
}

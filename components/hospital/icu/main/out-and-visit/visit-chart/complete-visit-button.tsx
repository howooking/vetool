import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { updateIsVisitDone } from '@/lib/services/icu/movement/visit/update-is-visit-done'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CompleteVisitButton({
  visitId,
  isDone,
}: {
  visitId: string
  isDone: boolean
}) {
  const [isDoneState, setIsDoneState] = useState(isDone)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  const handleCompleteVisitButton = async () => {
    setIsUpdating(true)

    await updateIsVisitDone(visitId, !isDone)

    toast({
      title: `면회 완료 여부를 변경하였습니다`,
    })

    setIsUpdating(false)
    setIsDoneState((prev) => !prev)
    refresh()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-12 md:min-w-20"
      onClick={handleCompleteVisitButton}
      disabled={isUpdating}
    >
      {isDoneState ? '완료' : '미완료'}
    </Button>
  )
}

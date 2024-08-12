import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateStaffRank } from '@/lib/services/settings/staff-settings'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RankColumn({
  rank,
  userId,
}: {
  rank: number
  userId: string
}) {
  const [rankInput, setRankInput] = useState(rank.toString())
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  useEffect(() => {
    setRankInput(rank.toString())
  }, [rank])

  const handleUpdateRank = async () => {
    const parsedRank = Number(rankInput)

    if (parsedRank === rank) {
      return
    }

    if (isNaN(parsedRank) || parsedRank <= 0) {
      toast({
        variant: 'destructive',
        title: '자연수를 입력해주세요',
      })
      setRankInput(rank.toString())
      return
    }

    setIsUpdating(true)

    await updateStaffRank(userId, rankInput)

    toast({
      title: '순번을 변경하였습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  return (
    <Input
      className="mx-auto w-14"
      disabled={isUpdating}
      value={rankInput}
      onChange={(e) => setRankInput(e.target.value)}
      onBlur={handleUpdateRank}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
    />
  )
}

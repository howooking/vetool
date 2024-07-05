import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
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
  const { refresh } = useRouter()

  useEffect(() => {
    setRankInput(rank.toString())
  }, [rank])

  const handleUpdateRank = async () => {
    const supabase = createClient()
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

    const { error: rankUpdateError } = await supabase
      .from('users')
      .update({ rank: Number(rankInput) })
      .match({ user_id: userId })

    if (rankUpdateError) {
      toast({
        variant: 'destructive',
        title: rankUpdateError.message,
        description: '관리자에게 문의하세요',
      })
      return
    }

    toast({
      title: '순번을 변경하였습니다',
    })
    refresh()
  }

  return (
    <Input
      className="mx-auto w-14"
      value={rankInput}
      onChange={(e) => setRankInput(e.target.value)}
      onBlur={handleUpdateRank}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
    />
  )
}

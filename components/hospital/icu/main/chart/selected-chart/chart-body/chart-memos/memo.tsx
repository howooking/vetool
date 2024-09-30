import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { updateMemo } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { useEffect, useState } from 'react'

export default function Memo({
  memo,
  icuChartId,
  memoNameListData,
  index,
}: {
  memo: string
  icuChartId: string
  memoNameListData: string[]
  index: number
}) {
  const [memoInput, setMemoInput] = useState(memo)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateMemo = async () => {
    if (memo === memoInput.trim()) {
      setMemoInput(memoInput.trim())
      return
    }

    let updateMemoQuery = {}
    if (index === 0) {
      updateMemoQuery = { memo_a: memoInput }
    } else if (index === 1) {
      updateMemoQuery = { memo_b: memoInput }
    } else if (index === 2) {
      updateMemoQuery = { memo_c: memoInput }
    }
    setIsUpdating(true)
    await updateMemo(updateMemoQuery, icuChartId)

    toast({
      title: `${memoNameListData[index]}을(를) 변경하였습니다`,
    })

    setIsUpdating(false)
  }

  useEffect(() => {
    setMemoInput(memo)
  }, [memo])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return (
    <div className="relative flex w-full items-center">
      <div className="absolute top-1 flex w-full items-center justify-between px-2">
        <Label
          className="text-xs text-muted-foreground"
          htmlFor={`memo-${index}`}
        >
          {memoNameListData[index]}
        </Label>
      </div>
      <Textarea
        disabled={isUpdating}
        placeholder="shift + enter를 눌러 줄을 추가할 수 있습니다"
        id={`memo-${index}`}
        value={memoInput}
        onChange={(e) => setMemoInput(e.target.value)}
        onBlur={handleUpdateMemo}
        onKeyDown={handleKeyDown}
        className="mt-6 w-full resize-none"
        rows={10}
        title={memo}
      />
    </div>
  )
}

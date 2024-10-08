import MemoItem from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/memo-item'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { updateMemo } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { Json } from '@/lib/supabase/database.types'
import { useEffect, useState } from 'react'

type MemoEntry = {
  memo: string
  create_timestamp: string
  edit_timestamp: string | null
}

export default function Memo({
  memo,
  memoIndex,
  icuChartId,
  memoNameListData,
}: {
  memo: Json
  memoIndex: number
  icuChartId: string
  memoNameListData: string[]
}) {
  const [memoInput, setMemoInput] = useState('')
  const [memoEntries, setMemoEntries] = useState<MemoEntry[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (Array.isArray(memo)) setMemoEntries(memo as MemoEntry[])
    else setMemoEntries([])
  }, [memo])

  const updateMemoEntry = async (updatedEntries: MemoEntry[]) => {
    setIsUpdating(true)

    let updateMemoQuery = {}

    if (memoIndex === 0) {
      updateMemoQuery = { memo_a: updatedEntries }
    } else if (memoIndex === 1) {
      updateMemoQuery = { memo_b: updatedEntries }
    } else updateMemoQuery = { memo_c: updatedEntries }

    await updateMemo(updateMemoQuery, icuChartId)

    setIsUpdating(false)
  }

  const handleInsertMemo = async () => {
    if (memoInput.trim() === '') return

    const newEntry = {
      memo: memoInput.trim(),
      create_timestamp: new Date().toISOString(),
      edit_timestamp: null,
    }

    const updatedEntries = [...memoEntries, newEntry]
    setMemoEntries(updatedEntries)
    setMemoInput('')

    await updateMemoEntry(updatedEntries)

    toast({
      title: `${memoNameListData[memoIndex]}에 새 항목을 추가했습니다`,
    })
  }

  const handleEditMemo = async (
    updatedEntry: MemoEntry,
    entryIndex: number,
  ) => {
    // updatedEntry를 해당 index의 값으로 수정 (얕은 복사)
    const updatedEntries = [...memoEntries]
    updatedEntries[entryIndex] = {
      ...updatedEntry,
      edit_timestamp: new Date().toISOString(),
    }
    setMemoEntries(updatedEntries)

    await updateMemoEntry(updatedEntries)
    toast({
      title: `메모가 수정되었습니다`,
    })
  }

  const handleDeleteMemo = async (entryIndex: number) => {
    const updatedEntries = memoEntries.filter(
      (_, index) => index !== entryIndex,
    )
    setMemoEntries(updatedEntries)

    await updateMemoEntry(updatedEntries)
    toast({
      title: `메모가 삭제되었습니다`,
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleInsertMemo()
    }
  }

  return (
    <div className="relative flex w-full flex-col">
      <Label
        className="my-2 ml-2 text-xs text-muted-foreground"
        htmlFor={`memo-${memoIndex}`}
      >
        {memoNameListData[memoIndex]}
      </Label>

      <ul>
        {memoEntries.map((entry, index) => (
          <MemoItem
            key={entry.create_timestamp}
            entry={entry}
            memoIndex={memoIndex}
            onEdit={(updatedEntry) => handleEditMemo(updatedEntry, index)}
            onDelete={() => handleDeleteMemo(index)}
          />
        ))}
      </ul>

      <Textarea
        disabled={isUpdating}
        placeholder={`Enter를 눌러 새 항목을 추가합니다.\nShift + Enter를 눌러 줄을 추가할 수 있습니다.`}
        id={`memo-${memoIndex}`}
        value={memoInput}
        onChange={(e) => setMemoInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mt-2 w-full resize-none"
        rows={10}
      />
    </div>
  )
}

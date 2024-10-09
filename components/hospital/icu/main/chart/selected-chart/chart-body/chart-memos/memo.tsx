import MemoItem from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/memo-item'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { updateMemo } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { Json } from '@/lib/supabase/database.types'
import { Squirrel } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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
  const lastMemoRef = useRef<HTMLLIElement>(null)
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)

  useEffect(() => {
    if (shouldScrollToBottom && lastMemoRef.current) {
      lastMemoRef.current.scrollIntoView({ behavior: 'smooth' })
      setShouldScrollToBottom(false)
    }
  }, [memoEntries, shouldScrollToBottom])

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

    setShouldScrollToBottom(true)

    toast({
      title: `${memoNameListData[memoIndex]}에 새 메모를 추가했습니다`,
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
      const target = e.currentTarget
      setTimeout(() => {
        if (target) {
          target.blur()
        }
      }, 0)
    }
  }

  return (
    <div className="relative flex w-full flex-col gap-2">
      <Label
        className="ml-2 text-xs text-muted-foreground"
        htmlFor={`memo-${memoIndex}`}
      >
        {memoNameListData[memoIndex]} ({memoEntries.length})
      </Label>

      <ScrollArea className="h-60 rounded-md border p-2">
        <ul className="space-y-2">
          {memoEntries.length === 0 && (
            <li className="group flex h-52 items-center justify-center gap-2 text-sm text-muted-foreground">
              <Squirrel className="group-hover:scale-x-[-1]" />
              <span>메모 없음</span>
            </li>
          )}

          {memoEntries.map((entry, index) => (
            <MemoItem
              key={entry.create_timestamp}
              entry={entry}
              onEdit={(updatedEntry) => handleEditMemo(updatedEntry, index)}
              onDelete={() => handleDeleteMemo(index)}
              ref={index === memoEntries.length - 1 ? lastMemoRef : null}
            />
          ))}
        </ul>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <Textarea
        disabled={isUpdating}
        placeholder="Shift + Enter를 눌러 줄을 추가할 수 있습니다"
        id={`memo-${memoIndex}`}
        value={memoInput}
        onChange={(e) => setMemoInput(e.target.value)}
        onBlur={() => handleInsertMemo()}
        onKeyDown={handleKeyDown}
        className="w-full resize-none text-sm placeholder:text-xs"
        rows={2}
      />
    </div>
  )
}

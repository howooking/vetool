import MemoItem from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/memo-item'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { updateMemo } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { Json } from '@/lib/supabase/database.types'
import { Squirrel } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ReactSortable, Sortable } from 'react-sortablejs'

type MemoEntry = {
  id: string
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
    if (Array.isArray(memo)) {
      const entries = memo as MemoEntry[]

      setMemoEntries(entries)
    } else {
      setMemoEntries([])
    }
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
    const createdAt = new Date().toISOString()

    const newEntry = {
      id: createdAt,
      memo: memoInput.trim(),
      create_timestamp: createdAt,
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

  const handleReorder = async (event: Sortable.SortableEvent) => {
    let newOrder = [...memoEntries]
    const [movedItem] = newOrder.splice(event.oldIndex as number, 1)
    newOrder.splice(event.newIndex as number, 0, movedItem)

    setMemoEntries(newOrder)
    await updateMemoEntry(newOrder)
  }

  return (
    <div className="relative flex w-full flex-col gap-1">
      <Label
        className="ml-2 text-xs text-muted-foreground"
        htmlFor={`memo-${memoIndex}`}
      >
        {memoNameListData[memoIndex]} ({memoEntries.length})
      </Label>

      <ScrollArea className="h-60 rounded-md border p-2">
        <ReactSortable
          list={memoEntries}
          setList={setMemoEntries}
          className="space-y-2"
          animation={250}
          handle=".handle"
          onEnd={handleReorder}
        >
          {memoEntries.length === 0 ? (
            <li className="group flex h-52 items-center justify-center gap-2 text-sm text-muted-foreground">
              <Squirrel className="group-hover:scale-x-[-1]" />
              <span>메모 없음</span>
            </li>
          ) : (
            memoEntries.map((entry, index) => (
              <MemoItem
                key={entry.id}
                entry={entry}
                onEdit={(updatedEntry) => handleEditMemo(updatedEntry, index)}
                onDelete={() => handleDeleteMemo(index)}
                ref={index === memoEntries.length - 1 ? lastMemoRef : null}
              />
            ))
          )}
        </ReactSortable>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <Textarea
        disabled={isUpdating}
        placeholder="Shift + Enter를 눌러 줄을 추가할 수 있습니다"
        id={`memo-${memoIndex}`}
        value={memoInput}
        onChange={(e) => setMemoInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full resize-none text-sm placeholder:text-xs"
        rows={1}
      />
    </div>
  )
}

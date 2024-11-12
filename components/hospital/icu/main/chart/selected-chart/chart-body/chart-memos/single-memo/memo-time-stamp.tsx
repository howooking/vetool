import { formatTimeDifference } from '@/lib/utils/utils'
import { format } from 'date-fns'
import { ChangeEvent } from 'react'
import type { Memo } from '../chart-memos'

export default function MemoTimeStamp({
  memo,
  isEditMode,
  handleEditMemo,
  memoIndex,
}: {
  memo: Memo
  isEditMode: boolean
  handleEditMemo: (editedMemo: Memo, memoIndex: number) => Promise<void>
  memoIndex: number
}) {
  const handleChageTimeStamp = (e: ChangeEvent<HTMLInputElement>) => {
    handleEditMemo(
      {
        ...memo,
        create_timestamp: e.target.value,
      },
      memoIndex,
    )
  }

  return (
    <div className="flex gap-1 text-xs text-muted-foreground">
      {isEditMode ? (
        <input
          type="datetime-local"
          className="bg-transparent"
          value={format(new Date(memo.create_timestamp), "yyyy-MM-dd'T'HH:mm")}
          onChange={handleChageTimeStamp}
        />
      ) : (
        <div className="flex items-center gap-2">
          <span>
            {format(new Date(memo.create_timestamp), 'yyyy MM. dd. HH:mm')}
          </span>
          {memo.edit_timestamp && (
            <span suppressHydrationWarning>
              ({formatTimeDifference(memo.edit_timestamp)} 수정됨)
            </span>
          )}
        </div>
      )}
    </div>
  )
}

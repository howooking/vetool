import WarningMessage from '@/components/common/warning-message'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { cn, getTimeSince } from '@/lib/utils'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import { useState } from 'react'

type MemoEntry = {
  memo: string
  create_timestamp: string
  edit_timestamp: string | null
}

export default function MemoItem({
  entry,
  memoIndex,
  onEdit,
  onDelete,
}: {
  entry: MemoEntry
  memoIndex: number
  onEdit: (updatedEntry: MemoEntry) => void
  onDelete: () => void
}) {
  const bgColor = cn({
    'bg-green-50 border-green-100': memoIndex === 0,
    'bg-yellow-100 border-yellow-200': memoIndex === 1,
    'bg-sky-50': memoIndex === 2,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedMemo, setEditedMemo] = useState(entry.memo)

  const handleEditMemo = () => {
    onEdit({ ...entry, memo: editedMemo })
    setIsEditing(false)
  }

  return (
    <li className={cn('mb-2 flex flex-col rounded-md border p-3', bgColor)}>
      <div className="flex items-center justify-between pb-1">
        <div className="flex gap-2">
          <span className="text-[12px] text-gray-500">
            {new Date(entry.create_timestamp)
              .toLocaleString('ko-KR')
              .slice(0, 20)}
          </span>
          {entry.edit_timestamp && (
            <span className="text-[12px] text-gray-500">
              ({getTimeSince(entry.edit_timestamp)} 수정됨)
            </span>
          )}
        </div>

        <div>
          {isEditing ? (
            <div className="flex gap-3">
              {/* 메모 수정 완료 */}
              <Check
                size={14}
                onClick={handleEditMemo}
                className="cursor-pointer"
              />

              {/* 메모 수정 취소 */}
              <X
                size={14}
                onClick={() => setIsEditing(false)}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex gap-3">
              {/* 메모 수정 트리거 */}
              <Pencil
                size={12}
                onClick={() => setIsEditing(true)}
                className="cursor-pointer"
              />

              {/* 메모 삭제 트리거 */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Trash2 size={12} className="cursor-pointer" />
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      해당 메모를 삭제하시겠습니까?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <WarningMessage text="해당 작업은 되돌릴 수 없습니다" />
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onDelete}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      삭제
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
      {isEditing ? (
        <Textarea
          value={editedMemo}
          onChange={(e) => setEditedMemo(e.target.value)}
          className="mt-1"
        />
      ) : (
        <span className="mt-1 whitespace-pre-wrap text-sm">{entry.memo}</span>
      )}
    </li>
  )
}

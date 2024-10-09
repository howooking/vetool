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
import { useOutsideClick } from '@/hooks/use-outside-click'
import { getTimeSince } from '@/lib/utils'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useRef, useState } from 'react'

type MemoEntry = {
  memo: string
  create_timestamp: string
  edit_timestamp: string | null
}

type MemoItemProps = {
  entry: MemoEntry
  onEdit: (updatedEntry: MemoEntry) => void
  onDelete: () => void
}

const MemoItem = React.forwardRef<HTMLLIElement, MemoItemProps>(
  ({ entry, onEdit, onDelete }, ref) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedMemo, setEditedMemo] = useState(entry.memo)
    const editingTextAreaRef = useRef<HTMLTextAreaElement>(null)
    useOutsideClick(editingTextAreaRef, () => setIsEditing(false))

    const handleEditMemo = () => {
      onEdit({ ...entry, memo: editedMemo })
      setIsEditing(false)
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
      <li
        ref={ref}
        className="group relative flex flex-col rounded-sm bg-yellow-200 p-2 pt-1"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-1 text-[10px] text-muted-foreground">
            <span>
              {new Date(entry.create_timestamp)
                .toLocaleString('ko-KR')
                .slice(0, 20)}
            </span>
            {entry.edit_timestamp && (
              <span>({getTimeSince(entry.edit_timestamp)} 수정됨)</span>
            )}
          </div>

          {!isEditing && (
            <div className="absolute right-1.5 top-1.5 flex cursor-pointer items-center gap-1.5 text-muted-foreground opacity-0 transition duration-300 group-hover:opacity-100 group-focus:opacity-100">
              <Pencil
                size={12}
                onClick={() => setIsEditing(true)}
                className="hover:opacity-70"
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Trash2 size={12} className="hover:opacity-70" />
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

        {isEditing ? (
          <Textarea
            value={editedMemo}
            onChange={(e) => setEditedMemo(e.target.value)}
            className="px-1 py-0.5 text-sm"
            rows={2}
            ref={editingTextAreaRef}
            onBlur={handleEditMemo}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <div className="flex items-end">
            <span className="mr-2 whitespace-pre-wrap text-sm">
              {entry.memo}
            </span>
          </div>
        )}
      </li>
    )
  },
)

MemoItem.displayName = 'MemoItem'

export default MemoItem

'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { toggleIsDone } from '@/lib/services/hospital-home/todo'
import { cn } from '@/lib/utils'
import type { Todo } from '@/types'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import DeleteTodoDialog from './delete-todo-dialog'

export default function SingleTodo({
  todo,
  type,
}: {
  todo: Todo
  type: '어제' | '오늘' | '내일'
}) {
  const [isToggling, setIsToggling] = useState(false)
  const [isChecked, setIsChecked] = useState(todo.is_done)

  useEffect(() => {
    setIsChecked(todo.is_done)
  }, [todo.is_done])

  const handleIsDone = async () => {
    setIsToggling(true)
    setIsChecked((prev) => !prev)

    await toggleIsDone(todo.id, todo.is_done)

    setIsToggling(false)
  }

  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        {isToggling ? (
          <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <Checkbox
            id={todo.id}
            disabled={isToggling || type === '어제' || type === '내일'}
            checked={isChecked}
            onCheckedChange={handleIsDone}
          />
        )}

        <label
          htmlFor={todo.id}
          className={cn(
            type === '어제' ? '' : 'cursor-pointer',
            'leading-none',
          )}
        >
          {todo.todo_title}
        </label>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">담당 : {todo.target_user ?? '없음'}</span>
        <DeleteTodoDialog todoId={todo.id} todoTitle={todo.todo_title} />
      </div>
    </li>
  )
}

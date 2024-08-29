'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getTodos = async (hosId: string) => {
  const supabase = createClient()
  const { data: todosData, error: todosDataError } = await supabase
    .from('todos')
    .select('id, is_done, target_date, target_user, todo_title')
    .match({ hos_id: hosId })
    .order('created_at')

  if (todosDataError) {
    console.error(todosDataError)
    redirect(`/error?message=${todosDataError.message}`)
  }
  return todosData
}

export const createTodo = async (
  todo_title_input: string,
  target_user_input: string | undefined,
  date: string,
  hosId: string,
) => {
  const supabase = createClient()
  const { error: createTodoError } = await supabase.from('todos').insert({
    todo_title: todo_title_input,
    hos_id: hosId,
    target_user: target_user_input,
    target_date: date,
  })

  if (createTodoError) {
    console.error(createTodoError)
    redirect(`/error?message=${createTodoError.message}`)
  }
}

export const toggleIsDone = async (todoId: string, isDone: boolean) => {
  const supabase = createClient()
  const { error: toggleIsDoneError } = await supabase
    .from('todos')
    .update({
      is_done: !isDone,
    })
    .match({ id: todoId })

  if (toggleIsDoneError) {
    console.error(toggleIsDoneError)
    redirect(`/error?message=${toggleIsDoneError.message}`)
  }
}

export const deleteTodo = async (todoId: string) => {
  const supabase = createClient()
  const { error: deleteTodoError } = await supabase
    .from('todos')
    .delete()
    .match({ id: todoId })

  if (deleteTodoError) {
    console.error(deleteTodoError)
    redirect(`/error?message=${deleteTodoError.message}`)
  }
}

import { Todo } from '@/types'
export type QueriedTodo = Omit<Todo, 'created_at' | 'hos_id'>

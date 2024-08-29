import { Todo } from '..'
export type QueriedTodo = Omit<Todo, 'created_at' | 'hos_id'>

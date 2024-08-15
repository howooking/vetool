import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getTodos } from '@/lib/services/hospital-home/todo'
import { getYesterdatTodayTomorrow } from '@/lib/utils'
import TodoList from './todo-list'

export default async function HosTodo({ hosId }: { hosId: string }) {
  const todosData = await getTodos(hosId)

  const { yesterday, today, tomorrow } = getYesterdatTodayTomorrow()
  const yesterdayTodos = todosData.filter(
    (todo) => todo.target_date === yesterday,
  )
  const todayTodos = todosData.filter((todo) => todo.target_date === today)
  const tomorrowTodos = todosData.filter(
    (todo) => todo.target_date === tomorrow,
  )

  return (
    <Card className="h-[calc(50vh-36px)] rounded-sm">
      <CardHeader>
        <CardTitle>TODO</CardTitle>
      </CardHeader>

      <CardContent className="flex h-[calc(50vh-110px)] flex-col gap-4 overflow-scroll">
        <TodoList
          type="어제"
          date={yesterday}
          todos={yesterdayTodos}
          hosId={hosId}
          className="text-muted-foreground"
        />

        <Separator />

        <TodoList type="오늘" date={today} todos={todayTodos} hosId={hosId} />

        <Separator />

        <TodoList
          type="내일"
          date={tomorrow}
          todos={tomorrowTodos}
          hosId={hosId}
          className="text-muted-foreground"
        />
      </CardContent>
    </Card>
  )
}

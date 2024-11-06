import HomeEntry from '@/components/hospital/home/home-entry'
import { getNotices } from '@/lib/services/hospital-home/notice'
import { getTodos } from '@/lib/services/hospital-home/todo'

export default async function HospitalHomePage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const noticesData = await getNotices(params.hos_id)
  const todosData = await getTodos(params.hos_id)

  return (
    <HomeEntry
      noticesData={noticesData}
      todosData={todosData}
      hosId={params.hos_id}
    />
  )
}

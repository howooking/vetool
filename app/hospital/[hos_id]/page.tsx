import HomeEntry from '@/components/hospital/home/home-entry'
import { isSuperAccount } from '@/lib/services/auth/authorization'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'
import { getNotices } from '@/lib/services/hospital-home/notice'
import { getTodos } from '@/lib/services/hospital-home/todo'

export default async function HospitalHomePage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const noticesData = await getNotices(params.hos_id)
  const todosData = await getTodos(params.hos_id)
  const hosList = await getHosList()
  const isSuper = await isSuperAccount()

  return (
    <HomeEntry
      hosList={hosList}
      isSuper={isSuper}
      noticesData={noticesData}
      todosData={todosData}
      hosId={params.hos_id}
    />
  )
}

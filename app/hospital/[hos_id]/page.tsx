import HospitalHeader from '@/components/hospital/header/hospital-header'
import HomeEntry from '@/components/hospital/home/home-entry'
import { getUserData } from '@/lib/services/auth/authorization'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'
import { getNotices } from '@/lib/services/hospital-home/notice'
import { getTodos } from '@/lib/services/hospital-home/todo'

export default async function HospitalHomePage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const userData = await getUserData()
  const noticesData = await getNotices(params.hos_id)
  const todosData = await getTodos(params.hos_id)
  const hosList = await getHosList()
  const isSuperAccount = userData.email === process.env.NEXT_PUBLIC_SUPER_SHY

  return (
    <>
      <HospitalHeader isSuperAccount={isSuperAccount} hosList={hosList} />

      <HomeEntry
        noticesData={noticesData}
        todosData={todosData}
        hosId={params.hos_id}
      />
    </>
  )
}

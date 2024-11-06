import Feedback from '@/components/hospital/feedback/feedback'
import HospitalHeader from '@/components/hospital/header/hospital-header'
import MobileSidebar from '@/components/hospital/sidebar/mobile-sidebar'
import Sidebar from '@/components/hospital/sidebar/sidebar'
import { getUserData } from '@/lib/services/auth/authorization'
import { getHosName } from '@/lib/services/hospital-home/get-hos-name'

export async function generateMetadata(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const hosName = await getHosName(params.hos_id)
  return {
    title: hosName,
  }
}

export default async function Layout(props: {
  children: React.ReactNode
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  const { children } = props
  const userData = await getUserData()
  const hosName = await getHosName(params.hos_id)

  return (
    <div className="flex">
      <Sidebar hosId={params.hos_id} userData={userData} />

      <MobileSidebar
        hosId={params.hos_id}
        userData={userData}
        hosName={hosName}
      />

      <div className="relative w-full">
        <HospitalHeader />
        <main className="w-full">{children}</main>
      </div>

      <Feedback />
    </div>
  )
}

import HospitalHeader from '@/components/hospital/header/hospital-header'
import MobileSidebar from '@/components/hospital/sidebar/mobile-sidebar'
import Sidebar from '@/components/hospital/sidebar/sidebar'
import SidebarWrapper from '@/components/hospital/sidebar/sidebar-wrapper'
import { getUserData } from '@/lib/services/auth/authorization'
import { getHosName } from '@/lib/services/hospital-home/get-hos-name'

export async function generateMetadata({
  params,
}: {
  params: { hos_id: string }
}) {
  const hosName = await getHosName(params.hos_id)
  return {
    title: hosName,
  }
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { hos_id: string }
}) {
  const userData = await getUserData()
  const hosName = await getHosName(params.hos_id)

  return (
    <div className="flex">
      <SidebarWrapper>
        <Sidebar hosId={params.hos_id} userData={userData} />
      </SidebarWrapper>

      <MobileSidebar
        hosId={params.hos_id}
        userData={userData}
        hosName={hosName}
      />

      <div className="relative w-full">
        <HospitalHeader />
        <main>{children}</main>
      </div>
    </div>
  )
}

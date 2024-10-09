import HospitalHeader from '@/components/hospital/header/hospital-header'
import MobileSidebar from '@/components/hospital/sidebar/mobile-sidebar'
import Sidebar from '@/components/hospital/sidebar/sidebar'
import { getUserData } from '@/lib/services/auth/authorization'
import { getHosName } from '@/lib/services/hospital-home/get-hos-name'
import { redirect } from 'next/navigation'

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

  if (
    userData.email !== process.env.NEXT_PUBLIC_SUPER_SHY! &&
    userData.hos_id !== params.hos_id
  ) {
    redirect(`/hospital/${userData.hos_id}`)
  }

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
    </div>
  )
}

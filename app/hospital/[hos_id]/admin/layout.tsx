import AdminMobileSidebar from '@/components/hospital/admin/admin-mobile-sidebar'
import AdminSidebar from '@/components/hospital/admin/admin-sidebar'
import { checkIsAdmin, getUser } from '@/lib/services/auth/authorization'

export default async function AdminLayout(props: {
  children: React.ReactNode
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params

  const authUser = await getUser()
  await checkIsAdmin(params.hos_id, authUser!.id)

  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar />

      <AdminMobileSidebar />

      <div className="h-icu-chart w-full overflow-auto p-2">
        {props.children}
      </div>
    </div>
  )
}

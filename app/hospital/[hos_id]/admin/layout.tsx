import AdminMobileSidebar from '@/components/hospital/admin/admin-mobile-sidebar'
import AdminSidebar from '@/components/hospital/admin/admin-sidebar'
import { checkIsAdmin, getUser } from '@/lib/services/auth/authorization'

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { hos_id: string }
}) {
  const authUser = await getUser()
  await checkIsAdmin(params.hos_id, authUser!.id)

  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar />

      <AdminMobileSidebar />

      <div className="w-full p-2">{children}</div>
    </div>
  )
}

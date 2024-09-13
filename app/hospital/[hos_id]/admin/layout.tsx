import AdminMobileSidebar from '@/components/hospital/admin/admin-mobile-sidebar'
import AdminSidebar from '@/components/hospital/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar />

      <AdminMobileSidebar />

      <div className="w-full p-2">{children}</div>
    </div>
  )
}

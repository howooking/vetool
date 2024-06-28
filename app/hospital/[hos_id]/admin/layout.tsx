import AdminSidebar from '@/components/hospital/admin/admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full p-6">{children}</div>
    </div>
  )
}
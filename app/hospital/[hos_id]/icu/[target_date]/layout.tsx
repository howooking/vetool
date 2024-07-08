import IcuFooter from '@/components/hospital/icu/icu-footer'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
export default  function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { hos_id: string; target_date: string }
}) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <IcuSidebar hosId={params.hos_id} targetDate={params.target_date} />
        <main className="w-full">{children}</main>
      </div>
      <IcuFooter />
    </div>
  )
}

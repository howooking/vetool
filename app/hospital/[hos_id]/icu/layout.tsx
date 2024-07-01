import IcuChartFooter from '@/components/hospital/icu/chart/footer/icu-chart-footer'
import IcuChartSidebar from '@/components/hospital/icu/sidebar/icu-chart-sidebar'
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { hos_id: string }
}) {
  return (
    <div className="flex flex-col">
      <main className="flex p-2">
        <IcuChartSidebar hosId={params.hos_id} />
        <main>{children}</main>
      </main>
      <IcuChartFooter />
    </div>
  )
}

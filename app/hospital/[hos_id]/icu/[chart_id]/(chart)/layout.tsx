import IcuChartFooter from '@/components/hospital/icu/chart/icu-chart-footer'
import IcuChartSidebar from '@/components/hospital/icu/chart/sidebar/icu-chart-sidebar'
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <main className="flex">
        <IcuChartSidebar />
        {children}
      </main>
      <IcuChartFooter />
    </div>
  )
}

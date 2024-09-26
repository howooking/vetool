import CopyChartButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/copy-chart-button'
import DeleteChartDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/delete-chart-dialog'
import type { SelectedChart } from '@/types/icu'
import { useParams } from 'next/navigation'

export default function HeaderRightButtons({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const { target_date } = useParams()
  const { icu_chart_id, icu_io, patient, orders } = chartData
  const isFirstChart = icu_io.in_date === target_date
  return (
    <div className="absolute right-2 top-1.5 hidden gap-1 md:flex">
      <CopyChartButton icuChartId={icu_chart_id} />

      {/* <OutPatientDialog
        icuIoId={icu_io.icu_io_id}
        name={patient.name}
        isPatientOut={!!icu_io.out_date}
        orders={orders}
        dx={icu_io.icu_io_dx}
        cc={icu_io.icu_io_cc}
      /> */}

      {/* <ExportDioalog
        name={name}
        captureRef={captureRef}
        chartData={chartData}
        selectedChartOrders={selectedChartOrders}
        vetsList={vetsList}
        orderColors={orderColors}
      /> */}

      <DeleteChartDialog
        icuChartId={icu_chart_id}
        name={patient.name}
        icuIoId={icu_io.icu_io_id}
        isFirstChart={isFirstChart}
      />
    </div>
  )
}

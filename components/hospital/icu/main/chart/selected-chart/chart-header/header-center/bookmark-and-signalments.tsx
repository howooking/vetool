import BookmarkDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/bookmark-dialog'
import UpdatePatientDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/update-patient-dialog'
import type { SelectedChart } from '@/types/icu/chart'

export default function HeaderCenter({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const { patient, icu_io } = chartData
  const isPatientOut = !!icu_io.out_date

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-1 rounded-md bg-muted p-2 text-xs md:h-12 md:bg-transparent md:text-sm">
      <BookmarkDialog
        icuChartId={chartData.icu_chart_id}
        bookmarkData={chartData.bookmark}
      />
      <UpdatePatientDialog
        patientData={{ ...patient, isIcu: true }}
        ageInDays={icu_io.age_in_days}
        isPatientOut={isPatientOut}
      />
    </div>
  )
}

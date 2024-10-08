import BookmarkDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/bookmark-dialog'
import UpdatePatientDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/update-patient-dialog'
import UpdateWeightDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/update-weight-dialog'
import type { SelectedChart } from '@/types/icu/chart'
import type { PatientData } from '@/types/patients'

export default function HeaderCenter({
  chartData,
  patientsData,
}: {
  chartData: SelectedChart
  patientsData: PatientData[]
}) {
  const { patient, icu_io, weight, weight_measured_date, icu_chart_id } =
    chartData
  const isPatientOut = !!icu_io.out_date

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-md bg-muted p-2 text-xs md:h-12 md:bg-transparent md:text-sm">
      <BookmarkDialog
        icuChartId={chartData.icu_chart_id}
        bookmarkData={chartData.bookmark}
      />
      <UpdatePatientDialog
        hosId={patient.hos_id as string}
        patientData={{ ...patient, isIcu: true }}
        ageInDays={icu_io.age_in_days}
        isPatientOut={isPatientOut}
        patientsData={patientsData}
      />
      <UpdateWeightDialog
        weightMesuredDate={weight_measured_date}
        weight={weight}
        patientId={patient.patient_id}
        icuChartId={icu_chart_id}
      />
    </div>
  )
}

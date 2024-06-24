'use client'

import { useIcuChartStore } from '@/lib/store/hospital/icu/icu-chart'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import { Suspense } from 'react'
import IcuChartPatientList from './icu-chart-patient-list'

export default function IcuChartSidebar() {
  const { icuChartData } = useIcuChartStore()
  const { selectedDate } = useIcuSelectedDateStore()

  // 조건 1: 입원 날짜가 존재하고, 퇴원 날짜가 아직 null인 경우 (입원 중)
  const selectedDaysChartData = icuChartData.filter((chartdata) => {
    return (
      (chartdata.icu_io_id.out_date === null && chartdata.icu_io_id.in_date) ||
      chartdata.icu_io_id.out_date! >= selectedDate
    )
  })

  return (
    <aside className="h-chart-sidebar flex w-36 justify-center bg-emerald-100 py-2 text-white">
      <ul className="flex flex-col gap-2 text-black">
        {/* 입원 환자명 - 품종 */}
        <Suspense>
          {selectedDaysChartData.map((data) => (
            <li key={data.icu_chart_id} className="flex items-center gap-2">
              <IcuChartPatientList
                name={data.patient_id.name}
                breed={data.patient_id.breed}
                patientId={data.patient_id.patient_id}
              />
            </li>
          ))}
        </Suspense>
      </ul>
    </aside>
  )
}

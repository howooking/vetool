'use client'

import IcuChartOrder from '@/components/hospital/icu/chart/order/icu-chart-order'

import IcuNewChartDialog from '@/components/hospital/icu/chart/icu-new-chart-dialog'
import { FOOTER_CATEGORIES } from '@/constants/hospital/icu/chart'
import { useIcuChartStore } from '@/lib/store/hospital/icu/icu-chart'
import { useIcuSelectedChartCategoryStore } from '@/lib/store/hospital/icu/icu-selected-category'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import type { IcuChartJoined, Vets } from '@/types/hospital'
import { useEffect, useMemo, useState } from 'react'

export default function IcuChart({
  icuChartData,
  vetsData,
}: {
  icuChartData: IcuChartJoined[]
  vetsData: Vets[]
}) {
  const [chartData, setChartData] = useState<IcuChartJoined[]>([])
  const [selectedPatientChartData, setSelectedPatientChartData] =
    useState<IcuChartJoined>()
  const { setIcuChartData } = useIcuChartStore()
  const { selectedCategory } = useIcuSelectedChartCategoryStore()
  const { selectedPatient } = useIcuSelectedPatientStore()
  const { selectedDate } = useIcuSelectedDateStore()
  const [overall, icuChart] = FOOTER_CATEGORIES.map(
    (category) => category.value,
  )

  useEffect(() => {
    setIcuChartData(icuChartData)
  }, [icuChartData, setIcuChartData])

  useMemo(() => {
    const filteredChartData = icuChartData.filter(
      (chartData) =>
        chartData.patient_id.patient_id === selectedPatient &&
        chartData.target_date === selectedDate,
    )

    const patientChartData = icuChartData.find(
      (chartData) => chartData.patient_id.patient_id === selectedPatient,
    )

    setChartData(filteredChartData)
    setSelectedPatientChartData(patientChartData)
  }, [icuChartData, selectedDate, selectedPatient])

  // TODO: LOADING SKELETON

  return (
    <section className="w-full bg-gray-100">
      {/* 종합 현황 && 환자 미선택 */}
      {selectedCategory === overall && !selectedPatient && (
        <span>종합 현황</span>
      )}

      {/* 입원 차트 */}
      {selectedPatient && (
        <div className="h-[800px] overflow-y-scroll p-4">
          {/* ICU 차트가 존재하는 경우 / 존재하지 않는 경우 */}
          {chartData.length ? (
            chartData.map((filteredData) => (
              <IcuChartOrder
                key={filteredData.icu_chart_id}
                chartData={filteredData}
                vetsData={vetsData}
              />
            ))
          ) : (
            <div className="flex w-48 flex-col gap-4">
              <IcuNewChartDialog
                selectedPatientChartData={selectedPatientChartData}
              />
            </div>
          )}
        </div>
      )}

      {selectedCategory === icuChart && !selectedPatient && (
        <span>환자를 선택해주세요</span>
      )}
    </section>
  )
}

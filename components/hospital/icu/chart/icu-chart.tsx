'use client'

import IcuChartOrder from '@/components/hospital/icu/chart/order/icu-chart-order'
import { FOOTER_CATEGORIES } from '@/constants/hospital/icu/chart'
import { useIcuChartStore } from '@/lib/store/hospital/icu/icu-chart'
import { useIcuSelectedChartCategoryStore } from '@/lib/store/hospital/icu/icu-selected-category'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import type { IcuChartJoined, Vets } from '@/types/hospital'
import { useEffect } from 'react'

export default function IcuChart({
  icuChartData,
  vetsData,
}: {
  icuChartData: IcuChartJoined[]
  vetsData: Vets[]
}) {
  const { setIcuChartData } = useIcuChartStore()
  const { selectedCategory } = useIcuSelectedChartCategoryStore()
  const { selectedPatient } = useIcuSelectedPatientStore()
  const [overall, icuChart] = FOOTER_CATEGORIES.map(
    (category) => category.value,
  )

  useEffect(() => {
    setIcuChartData(icuChartData)
  }, [icuChartData, setIcuChartData])

  // TODO: LOADING SKELETON

  return (
    <section className="w-full bg-gray-100">
      {/* 종합 현황 && 환자 미선택 */}
      {selectedCategory === overall && !selectedPatient && (
        <div>
          <span>종합 현황</span>
        </div>
      )}

      {/* 입원 차트 */}
      {selectedPatient && (
        <div className="h-[800px] overflow-y-scroll p-4">
          {icuChartData
            .filter(
              (chartData) =>
                chartData.patient_id.patient_id === selectedPatient,
            )
            .map((filteredData) => (
              <IcuChartOrder
                key={filteredData.icu_chart_id}
                chartData={filteredData}
                vetsData={vetsData}
              />
            ))}
        </div>
      )}

      {selectedCategory === icuChart && !selectedPatient && (
        <div>
          <span>환자를 선택해주세요</span>
        </div>
      )}
    </section>
  )
}

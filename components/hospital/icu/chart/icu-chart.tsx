'use client'

import IcuChartOrder from '@/components/hospital/icu/chart/icu-chart-order'
import IcuNewChartDialog from '@/components/hospital/icu/chart/icu-new-chart-dialog'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart'
import { FOOTER_CATEGORIES } from '@/constants/hospital/icu/chart/footer'
import { useIcuSelectedChartCategoryStore } from '@/lib/store/hospital/icu/icu-selected-category'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import type { IcuChartJoined, IcuChartOrderJoined, Vet } from '@/types/hospital'
import { useMemo, useState } from 'react'

type OrderName =
  | 'checklist'
  | 'fluid'
  | 'injection'
  | 'test'
  | 'manual'
  | 'feed'

export default function IcuChart({
  icuChartData,
  icuChartOrderData,
  vetsData,
}: {
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  vetsData: Vet[]
}) {
  const [targetDateChartData, setTargetDateChartData] = useState<
    IcuChartJoined[]
  >([])
  const [selectedPatientChartData, setSelectedPatientChartData] =
    useState<IcuChartJoined>()
  const [targetDateChartOrderData, setTargetDateChartOrderData] = useState<
    IcuChartOrderJoined[]
  >([])
  const { selectedCategory } = useIcuSelectedChartCategoryStore()
  const { selectedPatientId } = useIcuSelectedPatientStore()
  const { selectedDate } = useIcuSelectedDateStore()
  const [overall, icuChart] = FOOTER_CATEGORIES.map(
    (category) => category.value,
  )

  const orderIndex = useMemo(() => {
    return DEFAULT_ICU_ORDER_TYPE.reduce(
      (acc, item, idx) => {
        acc[item.value] = idx
        return acc
      },
      {} as Record<OrderName, number>,
    )
  }, [])

  useMemo(() => {
    // targeted date의 특정 patient의 차트 데이터 필터링
    const targetDateChartData = icuChartData.filter(
      (chartData) =>
        chartData.patient_id.patient_id === selectedPatientId &&
        chartData.target_date === selectedDate,
    )

    // date와 상관없이 특정 patient의 차트 데이터 필터링
    const selectedPatientChartData = icuChartData.find(
      (chartData) => chartData.patient_id.patient_id === selectedPatientId,
    )

    // 특정 환자의 차트가 존재할 때, 오더 차트 데이터 필터링
    if (selectedPatientId && targetDateChartData.length) {
      const targetDateOrderData = icuChartOrderData
        .filter(
          (orderData) =>
            orderData.icu_chart_id === targetDateChartData[0].icu_chart_id,
        )
        .sort(
          (prev, next) =>
            orderIndex[prev.icu_chart_order_type as OrderName] -
            orderIndex[next.icu_chart_order_type as OrderName],
        )

      setTargetDateChartOrderData(targetDateOrderData)
    }

    setTargetDateChartData(targetDateChartData)
    setSelectedPatientChartData(selectedPatientChartData)
  }, [
    icuChartData,
    icuChartOrderData,
    orderIndex,
    selectedDate,
    selectedPatientId,
  ])

  return (
    <section>
      {/* 종합 현황 && 환자 미선택 */}
      {selectedCategory === overall && !selectedPatientId && (
        <span>종합 현황</span>
      )}

      {/* 입원 차트 */}
      {selectedPatientId && (
        <div className="p-4">
          {/* targeted date 차트가 존재하는 경우 / 존재하지 않는 경우 */}
          {targetDateChartData.length ? (
            targetDateChartData.map((filteredData) => (
              <IcuChartOrder
                key={filteredData.icu_chart_id}
                chartData={filteredData}
                chartOrderData={targetDateChartOrderData}
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

      {selectedCategory === icuChart && !selectedPatientId && (
        <span>환자를 선택해주세요</span>
      )}
    </section>
  )
}

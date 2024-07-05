'use client'

import NoResult from '@/components/common/no-result'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import type { IcuChartJoined, IcuChartOrderJoined, Vet } from '@/types/hospital'
import { addDays, format, parseISO, subDays } from 'date-fns'
import { useMemo } from 'react'
import IcuChartOrder from './icu-chart-order'
import IcuNewChartDialog from './icu-new-chart-dialog'

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
  const { selectedPatientId, setSelectedPatientId } =
    useIcuSelectedPatientStore()
  const { selectedDate } = useIcuSelectedDateStore()

  const orderIndex = useMemo(() => {
    return DEFAULT_ICU_ORDER_TYPE.reduce(
      (acc, item, idx) => {
        acc[item.value] = idx
        return acc
      },
      {} as Record<OrderName, number>,
    )
  }, [])

  // 선택된 환자의 차트데이터들
  const selectedPatientCharts = useMemo(
    () =>
      icuChartData.filter(
        (chart) => chart.patient_id.patient_id === selectedPatientId,
      ),
    [icuChartData, selectedPatientId],
  )

  // 선택된 환자의 target date의 차트 => 선택된 차트
  const selectedChart = useMemo(
    () =>
      selectedPatientCharts.find((chart) => chart.target_date === selectedDate),
    [selectedDate, selectedPatientCharts],
  )

  // 선택된 환자의 target date - 1 차트
  const prevSelectedChart = useMemo(
    () =>
      selectedPatientCharts.find(
        (chart) =>
          chart.target_date ===
          format(subDays(parseISO(selectedDate), 1), 'yyyy-MM-dd'),
      ),
    [selectedDate, selectedPatientCharts],
  )
  // 선택된 환자의 target date + 1 차트
  const nextSelectedChart = useMemo(
    () =>
      selectedPatientCharts.find(
        (chart) =>
          chart.target_date ===
          format(addDays(parseISO(selectedDate), 1), 'yyyy-MM-dd'),
      ),
    [selectedDate, selectedPatientCharts],
  )

  // 선택된 환자의  target date의 차트의 오더들 => 선택된 차트의 오더들
  const selectedChartOrders = useMemo(
    () =>
      icuChartOrderData
        .filter((order) => order.icu_chart_id === selectedChart?.icu_chart_id)
        .sort(
          (prev, next) =>
            orderIndex[prev.icu_chart_order_type as OrderName] -
            orderIndex[next.icu_chart_order_type as OrderName],
        ),
    [icuChartOrderData, orderIndex, selectedChart],
  )

  return (
    <div className="w-full">
      {selectedChart ? (
        // Todo 컴포넌트 이름 SelectedChart로 변경
        <IcuChartOrder
          selectedChart={selectedChart!}
          selectedChartOrders={selectedChartOrders}
          vetsData={vetsData}
        />
      ) : (
        <>
          {prevSelectedChart && (
            <IcuNewChartDialog prevSelectedChart={prevSelectedChart} />
          )}

          {!prevSelectedChart && nextSelectedChart && (
            <NoResult
              title={`${nextSelectedChart.patient_id.name}은(는) ${format(addDays(parseISO(selectedDate), 1), 'yyyy-MM-dd')}에 입원했습니다`}
            />
          )}

          {!prevSelectedChart && !nextSelectedChart && (
            <NoResult
              title={`${format(subDays(parseISO(selectedDate), 1), 'yyyy-MM-dd')} 차트를 먼저 생성해주세요`}
            />
          )}
        </>
      )}
    </div>
  )
}

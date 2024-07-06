'use client'

import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useIcuSelectedDateStore } from '@/lib/store/hospital/icu/selected-date'
import type { IcuChartJoined, IcuChartOrderJoined, Vet } from '@/types/hospital'
import { addDays, format, parseISO, subDays } from 'date-fns'
import { useMemo } from 'react'
import SelectedChartNotFound from './selected-chart-not-found/selected-chart-not-found'
import SelectedChart from './selected-chart/selected-chart'

const ORDER_OF_ORDERS = [
  'checklist',
  'fluid',
  'injection',
  'test',
  'manual',
  'feed',
]

export default function IcuChart({
  icuChartData,
  icuChartOrderData,
  vetsData,
}: {
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  vetsData: Vet[]
}) {
  const { selectedPatientId } = useIcuSelectedPatientStore()
  const { selectedDate } = useIcuSelectedDateStore()

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
            ORDER_OF_ORDERS.findIndex(
              (itme) => itme === prev.icu_chart_order_type,
            ) -
            ORDER_OF_ORDERS.findIndex(
              (itme) => itme === next.icu_chart_order_type,
            ),
        ),
    [icuChartOrderData, selectedChart?.icu_chart_id],
  )

  // 선택된 환자의  target date - 1 차트의 오더들
  const prevSelectedChartOrders = useMemo(
    () =>
      icuChartOrderData
        .filter(
          (order) => order.icu_chart_id === prevSelectedChart?.icu_chart_id,
        )
        .sort(
          (prev, next) =>
            ORDER_OF_ORDERS.findIndex(
              (itme) => itme === prev.icu_chart_order_type,
            ) -
            ORDER_OF_ORDERS.findIndex(
              (itme) => itme === next.icu_chart_order_type,
            ),
        ),
    [icuChartOrderData, prevSelectedChart?.icu_chart_id],
  )

  return (
    <div className="w-full">
      {selectedChart ? (
        <SelectedChart
          selectedChart={selectedChart}
          selectedChartOrders={selectedChartOrders}
          vetsData={vetsData}
        />
      ) : (
        <SelectedChartNotFound
          prevSelectedChartOrders={prevSelectedChartOrders}
          selectedDate={selectedDate}
          nextSelectedChart={nextSelectedChart}
          prevSelectedChart={prevSelectedChart}
        />
      )}
    </div>
  )
}

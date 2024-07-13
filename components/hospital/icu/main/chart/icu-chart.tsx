'use client'

import NoResult from '@/components/common/no-result'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
  IcuVetList,
} from '@/types/icu'
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
] as const

export default function IcuChart({
  icuChartData,
  icuChartOrderData,
  vetsData,
  targetDate,
  icuIoData,
}: {
  icuChartData: IcuChartJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  vetsData: IcuVetList[]
  targetDate: string
  icuIoData: IcuIoPatientJoined[]
}) {
  const { selectedPatient } = useIcuSelectedPatientStore()

  const selectedChart = useMemo(
    () =>
      icuChartData.find(
        (chart) => chart.patient_id.patient_id === selectedPatient?.patientId,
      ),
    [icuChartData, selectedPatient],
  )

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

  const isPatientIn = useMemo(
    () =>
      icuIoData.some(
        (io) => io.patient_id.patient_id === selectedPatient?.patientId,
      ),
    [icuIoData, selectedPatient?.patientId],
  )

  const isPatientOut = useMemo(
    () =>
      icuIoData.some(
        (io) =>
          io.patient_id.patient_id === selectedPatient?.patientId &&
          io.out_date,
      ),
    [icuIoData, selectedPatient],
  )

  if (!selectedPatient?.patientId) {
    return <NoResult title="환자를 선택해주세요" />
  }

  return (
    <div className="w-full">
      {selectedChart ? (
        <SelectedChart
          // userName={userName}
          selectedChart={selectedChart}
          selectedChartOrders={selectedChartOrders}
          vetsData={vetsData}
          isPatientOut={isPatientOut}
        />
      ) : (
        <SelectedChartNotFound
          selectedPatient={selectedPatient}
          targetDate={targetDate}
          isPatientIn={isPatientIn}
        />
      )}
    </div>
  )
}

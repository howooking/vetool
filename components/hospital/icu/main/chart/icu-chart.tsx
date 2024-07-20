'use client'

import NoResult from '@/components/common/no-result'
import SelectedChartNotFound from '@/components/hospital/icu/main/chart/selected-chart-not-found/selected-chart-not-found'
import SelectedChart from '@/components/hospital/icu/main/chart/selected-chart/selected-chart'
import { ORDER_OF_ORDERS } from '@/constants/hospital/icu/chart/order'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
  IcuUserList,
} from '@/types/icu'
import { useMemo } from 'react'

export default function IcuChart({
  icuIoData,
  icuChartData,
  icuChartOrderData,
  icuUsersData,
}: {
  icuChartData: IcuChartJoined[]
  icuIoData: IcuIoPatientJoined[]
  icuChartOrderData: IcuChartOrderJoined[]
  icuUsersData: IcuUserList[]
}) {
  const { selectedPatient } = useIcuSelectedPatientStore()

  const selectedIo = useMemo(
    () =>
      icuIoData.find(
        (io) => io.patient_id.patient_id === selectedPatient?.patientId,
      ),
    [icuIoData, selectedPatient],
  )

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
      {selectedChart && selectedChartIoData ? (
        <SelectedChart
          selectedIo={selectedIo}
          selectedChart={selectedChart}
          selectedChartOrders={selectedChartOrders}
          icuUsersData={icuUsersData}
          isPatientOut={isPatientOut}
        />
      ) : (
        <SelectedChartNotFound
          selectedPatient={selectedPatient}
          isPatientIn={isPatientIn}
          icuChartData={icuChartData}
        />
      )}
    </div>
  )
}

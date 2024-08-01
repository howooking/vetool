'use client'

import NoResult from '@/components/common/no-result'
import SelectedChart from '@/components/hospital/icu/main/chart/selected-chart/selected-chart'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useIsCreatingChartStore } from '@/lib/store/icu/is-creating-chart'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuData,
  IcuIoPatientJoined,
} from '@/types/icu'
import { useEffect, useMemo, useState } from 'react'
import AddChartDialogs from './add-chart-dialogs/add-chart-dialogs'
import IcuChartSkeleton from './icu-chart-skeleton'

export default function IcuChart({ icuData }: { icuData: IcuData }) {
  const { selectedPatient } = useIcuSelectedPatientStore()
  const { isCreatingChart, setIsCreatingChart } = useIsCreatingChartStore()

  const { icuChartData, icuChartOrderData, icuIoData } = icuData
  const [selectedChartOrders, setSelectedChartOrders] = useState<
    IcuChartOrderJoined[]
  >([])
  const [selectedChart, setSelectedChart] = useState<
    IcuChartJoined | undefined
  >()
  const [selectedIo, setSeletedIo] = useState<IcuIoPatientJoined | undefined>()

  useEffect(() => {
    const selectedIo = icuIoData.find(
      (io) => io.patient_id.patient_id === selectedPatient?.patientId,
    )
    setSeletedIo(selectedIo)
    setIsCreatingChart(false)
  }, [icuIoData, selectedPatient?.patientId, setIsCreatingChart])

  useEffect(() => {
    const selectedChart = icuChartData.find(
      (chart) => chart.patient_id.patient_id === selectedPatient?.patientId,
    )
    setSelectedChart(selectedChart)
    setIsCreatingChart(false)
  }, [icuChartData, selectedPatient?.patientId, setIsCreatingChart])

  useEffect(() => {
    const selectedChartOrders = icuChartOrderData
      .filter(
        (order) =>
          order.icu_chart_id.icu_chart_id === selectedChart?.icu_chart_id,
      )
      .sort(
        (prev, next) =>
          DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
            (order) => order === prev.icu_chart_order_type,
          ) -
          DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
            (order) => order === next.icu_chart_order_type,
          ),
      )
    setSelectedChartOrders(selectedChartOrders)
    setIsCreatingChart(false)
  }, [icuChartOrderData, selectedChart?.icu_chart_id, setIsCreatingChart])

  const isPatientOut = useMemo(
    () => selectedIo?.out_date !== null,

    [selectedIo?.out_date],
  )

  if (!selectedPatient) {
    return <NoResult title="환자를 선택해주세요" />
  }

  if (isCreatingChart) {
    return <IcuChartSkeleton />
  }

  if (!selectedIo) {
    return (
      <NoResult
        title={
          <>
            {selectedPatient.patientName}은(는) 선택한 날짜의 차트가 없습니다{' '}
            <br /> 선택한 날짜에 아직 입원을 하지 않았거나 이미 퇴원을
            하였습니다
          </>
        }
      />
    )
  }

  // 첫 차트 생성
  if (!selectedChartOrders.length && selectedChart) {
    return (
      <AddChartDialogs
        firstChart
        selectedPatient={selectedPatient}
        selectedChart={selectedChart}
      />
    )
  }

  // 이후 차트 생성 todo
  if (!selectedChartOrders.length && !selectedChart) {
    return (
      <AddChartDialogs
        selectedPatient={selectedPatient}
        selectedChart={selectedChart}
      />
    )
  }

  if (selectedChart && selectedIo && selectedChartOrders) {
    return (
      <div className="w-full">
        <SelectedChart
          selectedIo={selectedIo}
          selectedChart={selectedChart}
          selectedChartOrders={selectedChartOrders}
          isPatientOut={isPatientOut}
        />
      </div>
    )
  }
}

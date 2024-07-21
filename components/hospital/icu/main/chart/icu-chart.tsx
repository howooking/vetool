'use client'

import NoResult from '@/components/common/no-result'
import SelectedChart from '@/components/hospital/icu/main/chart/selected-chart/selected-chart'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useIsCreatingChartStore } from '@/lib/store/icu/is-creating-chart'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoPatientJoined,
  IcuUserList,
} from '@/types/icu'
import { useEffect, useMemo } from 'react'
import AddChartDialogs from './add-chart-dialogs/add-chart-dialogs'
import IcuChartSkeleton from './icu-chart-skeleton'

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
  const { isCreatingChart, setIsCreatingChart } = useIsCreatingChartStore()

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
            DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
              (order) => order === prev.icu_chart_order_type,
            ) -
            DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
              (order) => order === next.icu_chart_order_type,
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

  useEffect(() => {
    if (isCreatingChart && selectedChart) {
      console.log('iscreateing to false')
      setIsCreatingChart(false)
    }
  }, [isCreatingChart, selectedChart, setIsCreatingChart])

  // console.log('f=================irst')
  // console.log('환자인:', isPatientIn)
  // console.log('iscrating:', isCreatingChart)
  // console.log(selectedChart)
  // console.log(selectedIo)

  if (!selectedPatient) {
    return <NoResult title="환자를 선택해주세요" />
  }

  if (isCreatingChart) {
    return <IcuChartSkeleton />
  }

  if (!selectedChart && selectedIo && isPatientIn) {
    return (
      <AddChartDialogs
        selectedPatient={selectedPatient}
        icuChartData={icuChartData}
      />
    )
  }

  if (!selectedChart && !selectedIo && !isPatientIn) {
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

  if (selectedChart && selectedIo) {
    return (
      <div className="w-full">
        <SelectedChart
          selectedIo={selectedIo}
          selectedChart={selectedChart}
          selectedChartOrders={selectedChartOrders}
          icuUsersData={icuUsersData}
          isPatientOut={isPatientOut}
        />
      </div>
    )
  }
}

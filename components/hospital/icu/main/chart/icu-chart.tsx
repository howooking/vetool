'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import NoResult from '@/components/common/no-result'
import SelectedChart from '@/components/hospital/icu/main/chart/selected-chart/selected-chart'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useIsChartLoadingStore } from '@/lib/store/icu/is-chart-loading'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuData,
  IcuIoJoined,
  IcuUserList,
} from '@/types/icu'
import { useEffect, useState } from 'react'
import AddChartDialogs from './add-chart-dialogs/add-chart-dialogs'

export default function IcuChart({
  icuData,
  vetsList,
}: {
  icuData: IcuData
  vetsList: IcuUserList[]
}) {
  const { selectedPatientId } = useIcuSelectedPatientIdStore()
  const { isChartLoading, setIsChartLoading } = useIsChartLoadingStore()
  // const { setIsTxMutating } = useUpsertTxStore()

  console.log('rendering')

  const [selectedChartOrders, setSelectedChartOrders] = useState<
    IcuChartOrderJoined[]
  >([])
  const [selectedChart, setSelectedChart] = useState<
    IcuChartJoined | undefined
  >()
  const [selectedIo, setSeletedIo] = useState<IcuIoJoined | undefined>()

  useEffect(() => {
    const selectedIo = icuData.icuIoData.find(
      (io) => io.patient_id.patient_id === selectedPatientId,
    )
    setSeletedIo(selectedIo)

    const selectedChart = icuData.icuChartData.find(
      (chart) => chart.patient_id.patient_id === selectedPatientId,
    )
    setSelectedChart(selectedChart)

    const selectedChartOrders = icuData.icuChartOrderData
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

    setIsChartLoading(false)
  }, [icuData, selectedPatientId, setIsChartLoading])

  // useEffect(() => {
  //   setIsChartLoading(false)
  // }, [icuChartData, selectedPatientId, setIsChartLoading])

  // useEffect(() => {
  //   setIsChartLoading(false)
  //   // setIsTxMutating(false)
  // }, [
  //   icuChartOrderData,
  //   selectedChart?.icu_chart_id,
  //   setIsChartLoading,
  //   // setIsTxMutating,
  // ])

  const isFirstChart = selectedChart?.target_date === selectedIo?.in_date

  if (!selectedPatientId) {
    return <NoResult title="환자를 선택해주세요" className="h-icu-chart" />
  }

  if (isChartLoading) {
    return <LargeLoaderCircle className="h-icu-chart" />
  }

  if (!selectedIo) {
    return (
      <NoResult
        title={
          <>
            해당환자는 선택한 날짜의 차트가 없습니다 <br /> 선택한 날짜에 아직
            입원을 하지 않았거나 이미 퇴원을 하였습니다
          </>
        }
        className="h-icu-chart"
      />
    )
  }

  if (!selectedChartOrders.length) {
    return (
      <AddChartDialogs
        isFirstChart={isFirstChart}
        selectedPatientId={selectedPatientId}
        selectedChart={selectedChart}
      />
    )
  }

  if (selectedChart && selectedIo && selectedChartOrders) {
    return (
      <SelectedChart
        vetsList={vetsList}
        isFirstChart={isFirstChart}
        selectedIo={selectedIo}
        selectedChart={selectedChart}
        selectedChartOrders={selectedChartOrders}
      />
    )
  }
}

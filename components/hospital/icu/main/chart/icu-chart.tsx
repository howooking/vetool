'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import NoResult from '@/components/common/no-result'
import SelectedChart from '@/components/hospital/icu/main/chart/selected-chart/selected-chart'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useIsChartLoadingStore } from '@/lib/store/icu/is-chart-loading'
import type { IcuData } from '@/types/icu'
import { useEffect, useMemo } from 'react'
import AddChartDialogs from './add-chart-dialogs/add-chart-dialogs'
import { IcuOrderTypeColor } from '@/types/adimin'

export default function IcuChart({ icuData }: { icuData: IcuData }) {
  const { selectedPatientId } = useIcuSelectedPatientIdStore()
  const { isChartLoading, setIsChartLoading } = useIsChartLoadingStore()

  // const [selectedChartOrders, setSelectedChartOrders] = useState<
  //   IcuChartOrderJoined[]
  // >([])
  // const [selectedChart, setSelectedChart] = useState<
  //   IcuChartJoined | undefined
  // >()
  // const [selectedIo, setSeletedIo] = useState<IcuIoJoined | undefined>()

  const selectedIo = useMemo(
    () =>
      icuData.icuIoData.find(
        (io) => io.patient_id.patient_id === selectedPatientId,
      ),
    [icuData.icuIoData, selectedPatientId],
  )
  const selectedChart = useMemo(
    () =>
      icuData.icuChartData.find(
        (chart) => chart.patient_id.patient_id === selectedPatientId,
      ),
    [icuData.icuChartData, selectedPatientId],
  )
  const selectedChartOrders = useMemo(
    () =>
      icuData.icuChartOrderData
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
        ),
    [icuData.icuChartOrderData, selectedChart?.icu_chart_id],
  )

  const isFirstChart = selectedChart?.target_date === selectedIo?.in_date

  useEffect(() => {
    if (
      (selectedChart && selectedChartOrders.length > 0) ||
      (selectedChart && isFirstChart)
    ) {
      setIsChartLoading(false)
    }
  }, [
    isFirstChart,
    selectedChart,
    selectedChartOrders.length,
    setIsChartLoading,
  ])

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
        orderColors={
          icuData.icuIoData[0].hos_id.order_color as IcuOrderTypeColor
        }
      />
    )
  }

  if (selectedChart && selectedIo && selectedChartOrders) {
    return (
      <SelectedChart
        vetsList={icuData.vetsListData}
        isFirstChart={isFirstChart}
        selectedIo={selectedIo}
        selectedChart={selectedChart}
        selectedChartOrders={selectedChartOrders}
      />
    )
  }
}

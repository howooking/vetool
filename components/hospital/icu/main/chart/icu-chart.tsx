// 삭제 예정

'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import NoResult from '@/components/common/no-result'
import AddChartDialogs from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-chart-dialogs'
import SelectedChart from '@/components/hospital/icu/main/chart/selected-chart/selected-chart'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { useIcuSelectedPatientIdStore } from '@/lib/store/icu/icu-selected-patient'
import { useIsChartLoadingStore } from '@/lib/store/icu/is-chart-loading'
import { IcuOrderColors } from '@/types/adimin'
import type {
  IcuChartJoined,
  IcuChartOrderJoined,
  IcuIoJoined,
  Vet,
} from '@/types/icu'
import { useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import React from 'react'

const IcuChart = React.memo(
  ({
    icuIoData,
    icuChartData,
    icuChartOrderData,
    vetListData,
    orderColors,
  }: {
    icuIoData: IcuIoJoined[]
    icuChartData: IcuChartJoined[]
    icuChartOrderData: IcuChartOrderJoined[]
    vetListData: Vet[]
    orderColors: IcuOrderColors
  }) => {
    const { selectedPatientId } = useIcuSelectedPatientIdStore()
    const { target_date } = useParams()

    const selectedIo = useMemo(
      () =>
        icuIoData.find((io) => io.patient_id.patient_id === selectedPatientId),
      [icuIoData, selectedPatientId],
    )
    const selectedChart = useMemo(
      () =>
        icuChartData.find(
          (chart) => chart.patient_id.patient_id === selectedPatientId,
        ),
      [icuChartData, selectedPatientId],
    )
    const selectedChartOrders = useMemo(
      () =>
        icuChartOrderData
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
      [icuChartOrderData, selectedChart?.icu_chart_id],
    )

    const isFirstChart = useMemo(
      () => target_date === selectedIo?.in_date,
      [target_date, selectedIo?.in_date],
    )

    const { isChartLoading, setIsChartLoading } = useIsChartLoadingStore()

    useEffect(() => {
      if (!isFirstChart && selectedChart) {
        setIsChartLoading(false)
      } else if (isFirstChart && selectedChartOrders.length) {
        setIsChartLoading(false)
      }
      return () => setIsChartLoading(false)
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

    if (!selectedChart || (isFirstChart && !selectedChartOrders.length)) {
      return (
        // <AddChartDialogs
        //   isFirstChart={isFirstChart}
        //   selectedPatientId={selectedPatientId}
        //   selectedChart={selectedChart}
        //   orderColors={orderColors}
        //   selectedIoId={selectedIo.icu_io_id}
        // />
        <></>
      )
    }

    if (!selectedChartOrders.length) {
      return <LargeLoaderCircle className="h-icu-chart" />
    }

    return (
      <SelectedChart
        orderColors={orderColors}
        vetsList={vetListData}
        isFirstChart={isFirstChart}
        selectedIo={selectedIo}
        selectedChart={selectedChart}
        selectedChartOrders={selectedChartOrders}
      />
    )
  },
)

IcuChart.displayName = 'IcuChart'

export default IcuChart

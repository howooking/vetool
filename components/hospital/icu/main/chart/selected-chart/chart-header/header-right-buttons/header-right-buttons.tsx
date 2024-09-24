import CopyChartButton from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/copy-chart-button'
import DeleteChartDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/delete-chart-dialog'
import ExportDioalog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/export-dialog/export-dialog'
import OutPatientDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-right-buttons/out-patient-dialog'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuChartJoined, IcuChartOrderJoined, Vet } from '@/types/icu'
import { RefObject } from 'react'

export default function HeaderRightButtons({
  icuChartId,
  icuIoId,
  name,
  isPatientOut,
  selectedChartOrders,
  chartData,
  captureRef,
  isFirstChart,
  vetsList,
  orderColors,
  dx,
  cc,
}: {
  icuChartId: string
  icuIoId: string
  name: string
  isPatientOut: boolean
  selectedChartOrders: IcuChartOrderJoined[]
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  captureRef: RefObject<HTMLDivElement>
  isFirstChart: boolean
  vetsList: Vet[]
  orderColors: IcuOrderColors
  dx: string
  cc: string
}) {
  return (
    <div className="absolute right-2 top-1.5 hidden gap-1 md:flex">
      <CopyChartButton icuChartId={icuChartId} />

      <OutPatientDialog
        icuIoId={icuIoId}
        name={name}
        isPatientOut={isPatientOut}
        selectedChartOrders={selectedChartOrders}
        dx={dx}
        cc={cc}
      />

      <ExportDioalog
        name={name}
        captureRef={captureRef}
        chartData={chartData}
        selectedChartOrders={selectedChartOrders}
        vetsList={vetsList}
        orderColors={orderColors}
      />

      <DeleteChartDialog
        icuChartId={icuChartId}
        name={name}
        icuIoId={icuIoId}
        isFirstChart={isFirstChart}
      />
    </div>
  )
}

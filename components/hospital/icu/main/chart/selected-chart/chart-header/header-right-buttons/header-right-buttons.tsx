import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/icu'
import React from 'react'
import CopyChartButton from './copy-chart-button'
import DeleteChartDialog from './delete-chart-dialog'
import ExportDioalog from './export-dialog/export-dialog'
import OutPatientDialog from './out-patient-dialog'
import { RefreshCcw } from 'lucide-react'

export default function HeaderRightButtons({
  icuChartId,
  icuIoId,
  name,
  isPatientOut,
  selectedChartOrders,
  chartData,
  pdfRef,
  isFirstChart,
  dx,
  cc,
}: {
  icuChartId: string
  icuIoId: string
  name: string
  isPatientOut: boolean
  selectedChartOrders: IcuChartOrderJoined[]
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  pdfRef: React.RefObject<HTMLDivElement>
  isFirstChart: boolean
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
        pdfRef={pdfRef}
        chartData={chartData}
        selectedChartOrders={selectedChartOrders}
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

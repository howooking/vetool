'use client'

import NoResult from '@/components/common/no-result'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedChart } from '@/types/icu/chart'
import { useMemo } from 'react'

export default function CheckBeforeIndate({
  children,
  chartData,
  patientId,
}: {
  children: React.ReactNode
  chartData: SelectedChart
  patientId: string
}) {
  const {
    basicHosData: { sidebarData },
  } = useBasicHosDataContext()

  const hasIcuIo = useMemo(
    () => sidebarData.find((io) => io.patient.patient_id === patientId),
    [patientId, sidebarData],
  )

  // chart가 없고 io도 없는 경우 => 입원 전
  if (!chartData && !hasIcuIo) {
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

  return <>{children}</>
}

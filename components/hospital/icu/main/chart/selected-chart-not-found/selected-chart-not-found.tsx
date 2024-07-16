'use client'

import NoResult from '@/components/common/no-result'
import { differenceInDays, format } from 'date-fns'
import AddIcuChartDialogs from './add-icu-chart-dialogs/add-icu-chart-dialogs'

export default function SelectedChartNotFound({
  selectedPatient,
  targetDate,
  isPatientIn,
}: {
  selectedPatient: {
    patientName: string
    patientId: string
  }
  targetDate: string
  isPatientIn: boolean
}) {
  const today = format(new Date(), 'yyyy-MM-dd')
  const targetDateFromToday = differenceInDays(targetDate, today)

  if (!isPatientIn) {
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

  if (targetDateFromToday >= 2) {
    return (
      <NoResult title="오늘 기준 모레 이후의 차트는 미리 생성할 수 없습니다" />
    )
  }

  return <AddIcuChartDialogs selectedPatient={selectedPatient} />
}

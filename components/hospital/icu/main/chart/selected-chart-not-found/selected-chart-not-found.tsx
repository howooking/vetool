'use client'

import NoResult from '@/components/common/no-result'
import { differenceInDays, format } from 'date-fns'
import AddIcuChartDialogs from './add-icu-chart-dialogs/add-icu-chart-dialogs'

export default function SelectedChartNotFound({
  selectedPatientId,
  targetDate,
  isPatientIn,
}: {
  selectedPatientId: string
  targetDate: string
  isPatientIn: boolean
}) {
  const today = format(new Date(), 'yyyy-MM-dd')
  const targetDateFromToday = differenceInDays(targetDate, today)

  if (!isPatientIn) {
    return <NoResult title="선택한 날짜 이후에 입원을 하였습니다." />
  }

  if (targetDateFromToday >= 2) {
    return <NoResult title="모레 이후의 차트는 미리 생성할 수 없습니다" />
  }

  return <AddIcuChartDialogs selectedPatientId={selectedPatientId} />
}

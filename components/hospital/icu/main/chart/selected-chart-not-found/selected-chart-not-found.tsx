import NoResult from '@/components/common/no-result'
import type { IcuChartJoined, IcuChartOrderJoined } from '@/types/hospital'
import { addDays, format, parseISO, subDays } from 'date-fns'
import AddIcuChartDialogs from './add-icu-chart-dialogs/add-icu-chart-dialogs'

export default function SelectedChartNotFound() {
  return (
    <>
      {/* <AddIcuChartDialogs
        prevSelectedChart={prevSelectedChart}
        preSelectedChartOrders={prevSelectedChartOrders}
      />

      <NoResult
        title={`${nextSelectedChart.patient_id.name}은(는) ${format(addDays(parseISO(selectedDate), 1), 'yyyy-MM-dd')}에 입원했습니다`}
      />

      <NoResult
        title={`${format(subDays(parseISO(selectedDate), 1), 'yyyy-MM-dd')} 차트를 먼저 생성해주세요`}
      /> */}
      차트 없음
    </>
  )
}

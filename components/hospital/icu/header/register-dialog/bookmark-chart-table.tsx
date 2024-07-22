import { bookmarkColumns } from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-chart-dialogs/bookmark/bookmark-columns'
import OrderPreviewDialog from '@/components/hospital/icu/main/search/order-preview-dialog'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { IcuChartBookmarkJoined } from '@/types/icu'
import { Dispatch, SetStateAction } from 'react'

export default function BookmarkChartTable({
  setStep,
  bookmarkCharts,
}: {
  setStep: (
    step:
      | 'patientRegister'
      | 'icuRegister'
      | 'patientSearch'
      | 'selectChartType'
      | 'chartSearch'
      | 'bookmarkSearch',
  ) => void
  bookmarkCharts: IcuChartBookmarkJoined[]
  isRegisterDialogOpen: boolean
}) {
  const { isPreviewModalOpen } = useOrderPreviewStore()

  return (
    <div className="flex flex-col justify-end">
      <DataTable
        columns={bookmarkColumns}
        data={bookmarkCharts}
        rowLength={10}
        searchPlaceHolder="즐겨찾기 이름 · 즐겨찾기 설명 · 환자명으로 조회하세요"
      />
      <Button
        onClick={() => setStep('selectChartType')}
        variant="outline"
        className="ml-auto"
      >
        이전
      </Button>

      {isPreviewModalOpen && <OrderPreviewDialog type="bookmark" />}
    </div>
  )
}

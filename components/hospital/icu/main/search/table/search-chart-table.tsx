import NoResult from '@/components/common/no-result'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { cn } from '@/lib/utils'
import type { SearchedChart } from '@/types/icu'
import { ConfirmCopyDialog } from '../../../common-dialogs/confirm-copy-dilalog'
import PreviewDialog from '../../../common-dialogs/preview/preview-dialog'
import GroupedChart from './grouped-chart'

export const COLUMN_WIDTH = {
  name: 'w-[200px]',
  ownerName: 'w-[200px]',
  inAndOutDate: 'w-[240px]',
  ageInDays: 'w-[160px]',
  dx: 'w-auto',
  cc: 'w-auto',
}

export default function SearchChartTable({
  groupedCharts,
}: {
  groupedCharts: SearchedChart[][]
}) {
  const { isPreviewModalOpen } = useOrderPreviewStore()
  const { isConfirmCopyDialogOpen } = useCopiedChartStore()

  if (groupedCharts.length === 0) {
    return <NoResult title="결과가 없습니다" className="h-[400px]" />
  }

  return (
    <>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className={cn(COLUMN_WIDTH.name, 'text-center')}>
              환자
            </TableHead>
            <TableHead className={cn(COLUMN_WIDTH.ownerName, 'text-center')}>
              보호자
            </TableHead>
            <TableHead className={cn(COLUMN_WIDTH.inAndOutDate, 'text-center')}>
              입원기간
            </TableHead>
            <TableHead className={cn(COLUMN_WIDTH.ageInDays, 'text-center')}>
              입원시 나이
            </TableHead>
            <TableHead className={cn(COLUMN_WIDTH.dx, 'text-center')}>
              DX
            </TableHead>
            <TableHead className={cn(COLUMN_WIDTH.cc, 'text-center')}>
              CC
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {groupedCharts.length === 0 && (
            <TableRow>
              <NoResult title="결과가 없습니다" className="h-40" />
            </TableRow>
          )}

          {groupedCharts.length > 0 &&
            groupedCharts.map((charts) => {
              return (
                <GroupedChart
                  key={charts[0].icu_io_id.icu_io_id}
                  charts={charts}
                />
              )
            })}
        </TableBody>
      </Table>

      {isPreviewModalOpen && <PreviewDialog />}
      {isConfirmCopyDialogOpen && <ConfirmCopyDialog />}
    </>
  )
}

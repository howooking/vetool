import LargeLoaderCircle from '@/components/common/large-loader-circle'
import NoResult from '@/components/common/no-result'
import { ConfirmCopyDialog } from '@/components/hospital/icu/common-dialogs/confirm-copy-dilalog'
import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import GroupedChart from '@/components/hospital/icu/main/search/table/grouped-chart'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import { cn } from '@/lib/utils'
import type { SearchedChart } from '@/types/icu'

export const COLUMN_WIDTH = {
  name: 'w-[200px]',
  ownerName: 'w-[200px]',
  inAndOutDate: 'w-[240px]',
  ageInDays: 'w-[160px]',
  dx: 'w-auto',
  cc: 'w-auto',
}

export default function SearchChartTable({
  searchedCharts,
  isSearching,
}: {
  searchedCharts: SearchedChart[]
  isSearching: boolean
}) {
  const { isPreviewModalOpen } = useOrderPreviewStore()
  const { isConfirmCopyDialogOpen } = useCopiedChartStore()

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
          <TableRow>
            {isSearching && (
              <TableCell colSpan={100}>
                <LargeLoaderCircle className="h-[400px]" />
              </TableCell>
            )}
          </TableRow>

          {!isSearching && searchedCharts.length === 0 && (
            <TableRow>
              <TableCell colSpan={100}>
                <NoResult title="검색 결과가 없습니다" className="h-[400px]" />
              </TableCell>
            </TableRow>
          )}

          {!isSearching &&
            searchedCharts.length > 0 &&
            searchedCharts.map((charts) => {
              return <GroupedChart key={charts.icu_io_id} charts={charts} />
            })}
        </TableBody>
      </Table>

      {isPreviewModalOpen && <PreviewDialog />}
      {isConfirmCopyDialogOpen && <ConfirmCopyDialog />}
    </>
  )
}

'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import NoResult from '@/components/common/no-result'
import PreviewDialog from '@/components/hospital/icu/common-dialogs/preview/preview-dialog'
import GroupedByIcuIo from '@/components/hospital/icu/main/search/grouped-by-icu-io/grouped-by-icu-io'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useOrderPreviewStore } from '@/lib/store/icu/order-preview'
import type { IcuOrderColors } from '@/types/adimin'
import type { SearchedIcuIos } from '@/types/icu'

export default function SearchChartTable({
  searchedIcuIos,
  isSearching,
  orderColors,
}: {
  searchedIcuIos: SearchedIcuIos[]
  isSearching: boolean
  orderColors: IcuOrderColors
}) {
  const { isPreviewModalOpen } = useOrderPreviewStore()

  return (
    <>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6 text-center">환자</TableHead>
            <TableHead className="w-1/6 text-center">보호자</TableHead>
            <TableHead className="w-1/6 text-center">입원기간</TableHead>
            <TableHead className="w-1/6 text-center">입원시 나이</TableHead>
            <TableHead className="w-1/6 text-center">DX</TableHead>
            <TableHead className="w-1/6 text-center">CC</TableHead>
            <TableHead />
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

          {!isSearching && searchedIcuIos.length === 0 && (
            <TableRow>
              <TableCell colSpan={100}>
                <NoResult title="검색 결과가 없습니다" className="h-[400px]" />
              </TableCell>
            </TableRow>
          )}

          {!isSearching &&
            searchedIcuIos.length > 0 &&
            searchedIcuIos.map((icuIo) => (
              <GroupedByIcuIo key={icuIo.icu_io_id} icuIo={icuIo} />
            ))}
        </TableBody>
      </Table>

      {isPreviewModalOpen && <PreviewDialog orderColors={orderColors} />}
    </>
  )
}

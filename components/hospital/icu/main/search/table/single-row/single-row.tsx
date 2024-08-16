import PreviewButton from '@/components/hospital/icu/common-dialogs/preview/preview-button'
import { TableCell, TableRow } from '@/components/ui/table'
import type { SelectedSearchedChart } from '@/types/icu'
import CopyButton from './copy-button'
export default function SingleRow({
  chart,
  index,
}: {
  chart: SelectedSearchedChart
  index: number
}) {
  return (
    <TableRow key={chart.icu_chart_id}>
      {/* 입원 일차 */}
      <TableCell className="text-center">{index + 1} 일차</TableCell>
      {/* 입원일 */}
      <TableCell className="text-center">{chart.target_date}</TableCell>
      {/* 진단명 */}
      <TableCell className="text-center">{chart.icu_chart_dx}</TableCell>
      {/* 주요증상 */}
      <TableCell className="text-center">{chart.icu_chart_cc}</TableCell>
      {/* 미리보기 */}
      <TableCell className="text-center">
        <PreviewButton chartId={chart.icu_chart_id} />
      </TableCell>
      {/* 복사 */}
      <TableCell className="text-center">
        <CopyButton chartId={chart.icu_chart_id} />
      </TableCell>
    </TableRow>
  )
}

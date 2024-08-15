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
      <TableCell className="text-center">{index + 1} 일차</TableCell>
      <TableCell className="text-center">{chart.target_date}</TableCell>
      <TableCell className="text-center">
        <PreviewButton chartId={chart.icu_chart_id} />
      </TableCell>
      <TableCell className="text-center">
        <CopyButton chartId={chart.icu_chart_id} />
      </TableCell>
      <TableCell className="w-4 text-center" colSpan={1} />
    </TableRow>
  )
}

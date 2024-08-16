import NoResult from '@/components/common/no-result'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import { IcuData } from '@/types/icu'
import { useCallback, useMemo } from 'react'
import TxTableCell from './tx-table-cell'

const TODO_BACKGROUD_COLORS = [
  '#fef2f2',
  '#fffbeb',
  '#f7fee7',
  '#ecfdf5',
  '#ecfeff',
  '#eff6ff',
  '#f5f3ff',
  '#fdf4ff',
  '#fff1f2',
  '#fff7ed',
  '#fefce8',
  '#f0fdf4',
  '#f0fdfa',
  '#e0f2fe',
  '#f0f9ff',
  '#eef2ff',
  '#faf5ff',
  '#fdf2f8',
]
export default function TxTable({ icuData }: { icuData: IcuData }) {
  const { icuChartData, icuChartOrderData } = icuData
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { setSelectedPatient } = useIcuSelectedPatientStore()

  const filteredAndSortedOrder = useMemo(
    () =>
      icuChartOrderData
        // 퇴원완료 제거
        .filter((order) => !order.icu_io_id.out_date)
        // 시간 지정하지 않은 오더 제거 (예: 구토, 배변, 배뇨)
        .filter(
          (order) =>
            order.icu_chart_order_time.reduce(
              (acc, time) => Number(acc) + Number(time),
              0,
            ) > 0,
        )
        // 모든 처치를 완료한 오더 제거
        .filter((order) => {
          let hasOrderLeft = false
          order.icu_chart_order_time.forEach((time, index) => {
            if (
              time === '1' &&
              order[`icu_chart_order_tx_${index + 1}` as keyof typeof order] ===
                null
            ) {
              hasOrderLeft = true
              return
            }
          })
          return hasOrderLeft
        })
        // 입원일 기준 정렬
        .sort(
          (a, b) =>
            new Date(a.icu_io_id.in_date).getTime() -
            new Date(b.icu_io_id.in_date).getTime(),
        )
        // 입원일이 같은 경우도 있으므로 생성일 순으로 정렬
        .sort(
          (a, b) =>
            new Date(a.icu_io_id.created_at).getTime() -
            new Date(b.icu_io_id.created_at).getTime(),
        ),
    [icuChartOrderData],
  )

  const handleClickRow = useCallback(
    (patientId: string, patientName: string) => {
      setSelectedIcuMainView('chart')
      setSelectedPatient({ patientId, patientName })
    },
    [setSelectedIcuMainView, setSelectedPatient],
  )

  const chartBackgroundMap = useMemo(
    () =>
      icuChartData.reduce<{
        [key: string]: string
      }>((acc, item, index) => {
        acc[item.icu_chart_id] =
          TODO_BACKGROUD_COLORS[index % TODO_BACKGROUD_COLORS.length]
        return acc
      }, {}),
    [icuChartData],
  )

  const findChartByPatientId = useCallback(
    (patientId: string) => {
      const chart = icuChartData.find(
        (chart) => chart.patient_id.patient_id === patientId,
      )
      return chart
    },
    [icuChartData],
  )

  if (!filteredAndSortedOrder.length) {
    return <NoResult title="입원환자가 없습니다" className="h-icu-chart" />
  }

  return (
    <div className="h-icu-chart overflow-auto p-2 pb-[48px]">
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] text-center">
              <span>환자목록</span>
            </TableHead>

            {TIMES.map((time) => (
              <TableHead className={cn('border text-center')} key={time}>
                {time.toString().padStart(2, '0')}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredAndSortedOrder.map((order) => {
            const foundChart = findChartByPatientId(order.icu_io_id.patient_id)
            return (
              <TableRow
                style={{
                  background:
                    chartBackgroundMap[order.icu_chart_id.icu_chart_id],
                }}
                className="cursor-pointer divide-x transition-all hover:opacity-60"
                key={order.icu_chart_order_id}
                onClick={() =>
                  handleClickRow(
                    foundChart?.patient_id.patient_id!,
                    foundChart?.patient_id.name!,
                  )
                }
              >
                <TableCell
                  className={cn('flex w-[200px] items-center justify-between')}
                >
                  <div>
                    <span>{foundChart?.patient_id.name}</span>
                    <span className="text-xs">
                      ({foundChart?.patient_id.breed})
                    </span>
                  </div>
                  <span className="text-xs">{foundChart?.weight}kg</span>
                </TableCell>

                {TIMES.map((time) => (
                  <TxTableCell key={time} time={time} order={order} />
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

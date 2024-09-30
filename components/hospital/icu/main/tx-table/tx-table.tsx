'use client'

import NoResult from '@/components/common/no-result'
import TxTableCell from '@/components/hospital/icu/main/tx-table/tx-table-cell'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn } from '@/lib/utils'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { Cat, Dog } from 'lucide-react'
import { useMemo } from 'react'

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
export default function TxTable({
  txTableData,
}: {
  txTableData: IcuTxTableData[]
}) {
  const filterAndSortTxData = (
    txTableData: IcuTxTableData[],
  ): IcuTxTableData[] => {
    return txTableData
      .filter((data) => !data.icu_io.out_date)
      .map((data) => ({
        ...data,
        orders: data.orders
          .filter((order) => order.icu_chart_order_time.includes('1'))
          .filter(
            (order) =>
              order.icu_chart_order_time.filter((time) => time === '1')
                .length !== order.treatments.length,
          ),
      }))
      .filter((data) => data.orders.length > 0)
      .sort(
        (a, b) =>
          new Date(b.icu_io.created_at).getTime() -
          new Date(a.icu_io.created_at).getTime(),
      )
  }

  const createChartBackgroundMap = (
    txTableData: IcuTxTableData[],
  ): {
    [key: string]: string
  } => {
    return txTableData.reduce<{ [key: string]: string }>((acc, item, index) => {
      acc[item.icu_charts.icu_chart_id] =
        TODO_BACKGROUD_COLORS[index % TODO_BACKGROUD_COLORS.length]
      return acc
    }, {})
  }

  const filteredTxData = useMemo(
    () => filterAndSortTxData(txTableData),
    [txTableData],
  )

  const chartBackgroundMap = useMemo(
    () => createChartBackgroundMap(txTableData),
    [txTableData],
  )

  if (!txTableData) {
    return <NoResult title="실행할 처치가 없습니다" className="h-icu-chart" />
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
          {filteredTxData.flatMap((txData) =>
            txData.orders.map((order) => (
              <TableRow
                key={order.icu_chart_order_id}
                style={{
                  background:
                    chartBackgroundMap[txData.icu_charts.icu_chart_id],
                }}
                className="divide-x"
              >
                <TableCell
                  className={cn('flex w-[200px] items-center justify-between')}
                >
                  <div className="flex items-center gap-1">
                    {txData.patient.breed === 'canine' ? (
                      <Dog size={20} />
                    ) : (
                      <Cat size={20} />
                    )}
                    <div>
                      <span>{txData.patient.name}</span>
                      <span className="text-xs">({txData.patient.breed})</span>
                    </div>
                  </div>
                  <span className="text-xs">{txData.icu_charts.weight}kg</span>
                </TableCell>

                {TIMES.map((time) => (
                  <TxTableCell
                    key={time}
                    time={time}
                    order={order}
                    patientId={txData.patient_id}
                  />
                ))}
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </div>
  )
}

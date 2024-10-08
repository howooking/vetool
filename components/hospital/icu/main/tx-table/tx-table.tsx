'use client'

import PatientInfo from '@/components/hospital/common/patient-info'
import TxTableCell from '@/components/hospital/icu/main/tx-table/tx-table-cell'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { Cat, Dog } from 'lucide-react'
import { useMemo } from 'react'

const TX_TABLE_BACKGROUD_COLORS = [
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
  const filteredTxData = useMemo(
    () =>
      txTableData
        .filter((data) => !data.icu_io.out_date)
        .map((data) => ({
          ...data,
          orders: data.orders.filter((order) => {
            const orderTimes = order.icu_chart_order_time
              .map((time, index) => (time !== '0' ? index + 1 : null))
              .filter((time): time is number => time !== null)

            const treatmentTimes = order.treatments.map((t) => t.time)

            const pendingOrderTimes = orderTimes.filter(
              (time) => !treatmentTimes.includes(time),
            )

            return pendingOrderTimes.length > 0
          }),
        }))
        .filter((data) => data.orders.length > 0),
    [txTableData],
  )

  const chartBackgroundMap = useMemo(
    () =>
      txTableData.reduce<{ [key: string]: string }>((acc, item, index) => {
        acc[item.icu_charts.icu_chart_id] =
          TX_TABLE_BACKGROUD_COLORS[index % TX_TABLE_BACKGROUD_COLORS.length]
        return acc
      }, {}),
    [txTableData],
  )

  return (
    <div className="h-icu-chart overflow-auto p-2 pb-[48px]">
      <ScrollArea className="h-full w-full">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] text-center">환자목록</TableHead>

              {TIMES.map((time) => (
                <TableHead className="border text-center" key={time}>
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
                  <TableCell className="min-w-[120px] text-center">
                    <PatientInfo
                      name={txData.patient.name}
                      breed={txData.patient.breed}
                      species={txData.patient.species}
                      size={18}
                      col
                    />

                    <div className="text-xs">{txData.icu_charts.weight}kg</div>
                  </TableCell>

                  {TIMES.map((time) => (
                    <TxTableCell
                      patientName={txData.patient.name}
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

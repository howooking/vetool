'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn, getDaysDifference } from '@/lib/utils'
import type { SummaryData } from '@/types/icu/summary'
import { Cat, Dog } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import SummaryTableCell from './summary-table-cell'

type SummaryTableRowProps = {
  summary: SummaryData
}

export default function SummaryTableRow({ summary }: { summary: SummaryData }) {
  const { push } = useRouter()
  const { hos_id, target_date } = useParams()
  const { orders, patient } = summary

  const handleClickRow = (patientId: string) => {
    push(`/hospital/${hos_id}/icu/${target_date}/chart/${patientId}`)
  }

  const isPatientOut = useMemo(
    () => summary.icu_io.out_date !== null,
    [summary.icu_io.out_date],
  )

  const hospitalizationDays = useMemo(
    () => getDaysDifference(summary.icu_io.in_date),
    [summary.icu_io.in_date],
  )
  return (
    <TableRow
      className={cn(
        'cursor-pointer divide-x',
        isPatientOut && 'text-muted-foreground line-through',
      )}
      onClick={() => handleClickRow(summary.patient_id as string)}
    >
      <TableCell className="flex w-[200px] items-center justify-between">
        <div className="flex items-center gap-1">
          {patient.species === 'canine' ? <Dog size={18} /> : <Cat size={18} />}
          <div className="line-clamp-1">
            <span>{patient.name}</span>
            <span className="text-xs">({patient.breed})</span>
          </div>
        </div>
        <span className="shrink-0 text-xs">{hospitalizationDays}일차</span>
      </TableCell>
      {TIMES.map((time) => (
        <SummaryTableCell key={time} time={time} orders={orders} />
      ))}
    </TableRow>
  )
}

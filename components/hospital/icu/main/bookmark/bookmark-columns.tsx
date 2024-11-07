'use client'

import PreviewButton from '@/components/hospital/icu/common-dialogs/preview/preview-button'
import EditTemplateButton from '@/components/hospital/icu/main/template/edit/edit-template-button'
import DeleteTemplateDialog from '@/components/hospital/icu/main/template/table/delete-template-dialog'
import { Button } from '@/components/ui/button'
import type { TemplateChart } from '@/types/icu/template'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import GotoIcuButton from '../template/table/goto-icu-button'

export const bookmarkColumns: ColumnDef<TemplateChart>[] = [
  {
    accessorKey: 'template_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          북마크 이름
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'template_comment',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          설명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'target_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          차트 생성일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id
      const targetDate = row.original.target_date
      const patientId = row.original.patient.patient_id

      return (
        <div className="flex justify-center">
          <PreviewButton
            chartId={chartId}
            patientId={patientId}
            targetDate={targetDate}
          />
        </div>
      )
    },
  },
  {
    id: 'action',
    header: '이동',
    cell: ({ row }) => {
      const patientId = row.original.patient.patient_id
      const targetDate = row.original.target_date

      return (
        <div className="flex justify-center">
          <GotoIcuButton patientId={patientId} targetDate={targetDate} />
        </div>
      )
    },
  },
  {
    id: 'delete',
    header: '삭제',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id

      return (
        <div className="flex justify-center">
          <DeleteTemplateDialog
            templateId={row.original.template_id}
            templateName={row.original.template_name}
            chartId={chartId}
          />
        </div>
      )
    },
  },
]

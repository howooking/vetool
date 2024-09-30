'use client'

import { Button } from '@/components/ui/button'
import type { IcuChartBookmarkJoined } from '@/types/icu'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import PreviewButton from '../../../../common-dialogs/preview/preview-button'
import PasteBookmarkButton from './paste-bookmark-button'
import { BookmarkedChart } from '@/types/icu/bookmark'

export const bookmarkColumns: ColumnDef<BookmarkedChart>[] = [
  {
    accessorKey: 'bookmark_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          즐겨찾기 이름
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'bookmark_comment',

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
    cell: ({ row }) => {
      const comment = row.original.bookmark_comment
      return <div>{comment ?? '없음'}</div>
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
          입원일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const targetDate = row.original.icu_chart_id.target_date
      return <span>{targetDate}</span>
    },
  },
  {
    accessorKey: 'icu_chart_id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          환자명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const patientName = row.original.icu_chart_id.patient_id.name
      return <div>{patientName}</div>
    },
  },
  {
    accessorKey: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const patientId = row.original.icu_chart_id.patient_id.patient_id
      const targetDate = row.original.icu_chart_id.target_date
      return <PreviewButton patientId={patientId} targetDate={targetDate} />
    },
  },
  {
    accessorKey: 'action',
    header: '선택',
    cell: ({ row }) => {
      const chartId = row.original.icu_chart_id.icu_chart_id
      return <PasteBookmarkButton chartId={chartId} />
    },
  },
]

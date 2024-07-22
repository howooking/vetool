'use client'

import OpenPreviewDialogButton from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-chart-dialogs/bookmark/open-preview-dialog-button'
import PasteBookmarkDialog from '@/components/hospital/icu/main/chart/selected-chart-not-found/add-chart-dialogs/bookmark/paste-bookmark-dialog'
import { Button } from '@/components/ui/button'
import type { IcuChartBookmarkJoined } from '@/types/icu'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export const bookmarkColumns: ColumnDef<IcuChartBookmarkJoined>[] = [
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
          즐겨찾기 상세
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
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          등록일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = row.original.created_at
      return <span>{createdAt.slice(0, 10)}</span>
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
    header: ({ column }) => {
      return <Button variant="ghost">오더 미리보기</Button>
    },
    cell: ({ row }) => {
      return (
        <OpenPreviewDialogButton
          chartId={row.original.icu_chart_id.icu_chart_id}
        />
      )
    },
  },
  {
    accessorKey: 'action',
    header: undefined,
    cell: ({ row }) => {
      return (
        <PasteBookmarkDialog chartId={row.original.icu_chart_id.icu_chart_id} />
      )
    },
  },
]

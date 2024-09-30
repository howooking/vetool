'use client'

import DeleteBookmarkDialog from '@/components/hospital/icu/main/bookmark/delete-bookmark-dialog'
import GotoIcuButton from '@/components/hospital/icu/main/bookmark/goto-icu-button'
import { Button } from '@/components/ui/button'
import { BookmarkedChart } from '@/types/icu/bookmark'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import PreviewButton from '../../common-dialogs/preview/preview-button'

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
    cell: ({ row }) => {
      const bookmarkName = row.original.bookmark_name
      return <div className="flex justify-center">{bookmarkName}</div>
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
      const bookmarkComment = row.original.bookmark_comment
      return <>{bookmarkComment}</>
    },
  },
  {
    accessorKey: 'patient_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          환자이름
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
    accessorKey: 'target_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          차트생성일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => {
      const targetDate = row.original.icu_chart_id.target_date
      return <div>{targetDate}</div>
    },
  },
  {
    id: 'preview',
    header: '미리보기',
    cell: ({ row }) => {
      const patientId = row.original.icu_chart_id.patient_id.patient_id
      const targetDate = row.original.icu_chart_id.target_date
      return (
        <div className="flex justify-center">
          <PreviewButton patientId={patientId} targetDate={targetDate} />
        </div>
      )
    },
  },
  {
    id: 'goto',
    header: '이동',
    cell: ({ row }) => {
      const targetDate = row.original.icu_chart_id.target_date
      const patientId = row.original.icu_chart_id.patient_id.patient_id
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
      return (
        <div className="flex justify-center">
          <DeleteBookmarkDialog
            bookmarkId={row.original.bookmark_id}
            bookmarkName={row.original.bookmark_name}
          />
        </div>
      )
    },
  },
]

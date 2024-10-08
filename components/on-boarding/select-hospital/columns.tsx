'use client'

import { Button } from '@/components/ui/button'
import { SelectHosptialDataTable } from '@/types/on-boarding'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import ConfirmSelectHospitalDialog from './confirm-select-hospital-dialog'

export const columns: ColumnDef<SelectHosptialDataTable>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          병원명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: 'city',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          지역
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'district',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          시·군·구
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'action',
    header: '선택',
    cell: ({ row }) => {
      const hosId = row.original.hos_id
      const name = row.original.name

      return <ConfirmSelectHospitalDialog hosId={hosId} name={name} />
    },
  },
]

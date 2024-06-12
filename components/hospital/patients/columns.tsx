'use client'

import { Button } from '@/components/ui/button'
import { Database } from '@/lib/supabase/database.types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

type HospitalPatientsColumnsType =
  Database['public']['Tables']['patients']['Row']

export const HospitalPatientsColumns: ColumnDef<HospitalPatientsColumnsType>[] =
  [
    {
      accessorKey: 'name',
      header: '이름',
    },
    {
      accessorKey: 'microchip_no',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            마이크로칩 번호
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'species',
      header: '종',
    },
    {
      accessorKey: 'breed',
      header: '품종',
    },
    {
      accessorKey: 'gender',
      header: '성별',
    },
    {
      accessorKey: 'birth',
      header: '생년월일',
    },
    {
      accessorKey: 'status',
      header: '상태',
    },
    {
      accessorKey: 'memo',
      header: '메모',
    },
  ]

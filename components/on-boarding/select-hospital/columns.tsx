'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { useSelectHospitalStore } from '@/lib/store/on-boarding/select-hospital'

export type SelectHosptialColumnsType = {
  hos_id: string
  name: string | null
  city: string | null
  district: string | null
}

export const SelectHospitalColumns: ColumnDef<SelectHosptialColumnsType>[] = [
  {
    id: 'select',
    cell: ({ row, table }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          // 다중 선택 방지
          table.toggleAllPageRowsSelected(false)
          row.toggleSelected(!!value)
          useSelectHospitalStore().setHosId(row.original.hos_id)
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: '병원명',
  },

  {
    accessorKey: 'city',
    header: '지역',
  },
  {
    accessorKey: 'district',
    header: '시·군·구',
  },
]

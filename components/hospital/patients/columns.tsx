'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useSelectedPatientStore } from '@/lib/store/hospital/patients/selected-patient'
import { Patients } from '@/types/hospital'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export const HospitalPatientsColumns: ColumnDef<Patients>[] = [
  {
    id: 'select',
    cell: ({ row, table }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          // 다중 선택 방지
          table.toggleAllPageRowsSelected(false)
          row.toggleSelected(!!value)
          useSelectedPatientStore.setState({
            patientId: value ? row.original.patient_id : null,
          })
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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

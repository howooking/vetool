'use client'

import PatientInfo from '@/components/hospital/common/patient-info'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OutDuePatientsData } from '@/types/icu/out-due'
import { ColumnDef } from '@tanstack/react-table'
import OutDueToggleButton from './out-due-toggle'

export const outDueColumns: ColumnDef<OutDuePatientsData>[] = [
  {
    accessorKey: 'patient.name',
    header: '환자명',
    cell: ({ row }) => {
      const name = row.original.patient.name
      const breed = row.original.patient.breed
      const species = row.original.patient.species
      return (
        <PatientInfo
          name={name}
          species={species}
          breed={breed}
          className="justify-center"
        />
      )
    },
  },

  {
    accessorKey: 'basic_care',
    header: '기본 관리',
    cell: ({ row }) => {
      const basicCare = row.original.basic_care
      const isDischarged = row.original.out_date !== null

      return (
        <OutDueToggleButton isDischarged={isDischarged} value={basicCare} />
      )
    },
  },
  {
    accessorKey: 'belongings',
    header: '소지품',
    cell: ({ row }) => {
      const belongings = row.original.belongings
      const isDischarged = row.original.out_date !== null

      return (
        <OutDueToggleButton isDischarged={isDischarged} value={belongings} />
      )
    },
  },
  {
    accessorKey: 'prescription',
    header: '처방식',
    cell: ({ row }) => {
      const prescription = row.original.prescription
      const isDischarged = row.original.out_date !== null

      return (
        <OutDueToggleButton isDischarged={isDischarged} value={prescription} />
      )
    },
  },
  {
    accessorKey: 'medication',
    header: '약 조제',
    cell: ({ row }) => {
      const medication = row.original.medication
      const isDischarged = row.original.out_date !== null

      return (
        <OutDueToggleButton isDischarged={isDischarged} value={medication} />
      )
    },
  },
  {
    accessorKey: 'out_due_time',
    header: '퇴원 예정 시각',
    cell: ({ row }) => {
      return <Input className="mx-auto w-20" />
    },
  },

  {
    accessorKey: 'etc',
    header: '기타',
    cell: ({ row }) => {
      return <Input type="text" />
    },
  },
  {
    accessorKey: 'active',
    header: '퇴원',
    cell: ({ row }) => {
      const isDischarged = row.original.out_date !== null

      return (
        <Button variant="outline" disabled={isDischarged}>
          {isDischarged ? '퇴원 완료' : '퇴원'}
        </Button>
      )
    },
  },
]

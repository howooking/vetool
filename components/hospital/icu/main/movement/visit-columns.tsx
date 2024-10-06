'use client'

import PatientInfo from '@/components/hospital/common/patient-info'
import OutDueChecklistInput from '@/components/hospital/icu/main/movement/out-due-checklist-input'
import { Button } from '@/components/ui/button'
import type { OutDuePatientsData } from '@/types/icu/out-due'
import { ColumnDef } from '@tanstack/react-table'

export const visitColumns: ColumnDef<OutDuePatientsData>[] = [
  {
    accessorKey: 'add',
    header: '추가',
    cell: ({ row }) => {
      const name = row.original.patient.name
      const breed = row.original.patient.breed
      const species = row.original.patient.species
      return (
        <div className="w-[200px] md:w-auto">
          <PatientInfo
            name={name}
            species={species}
            breed={breed}
            className="justify-center"
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'patient.name',
    header: '환자명',
    cell: ({ row }) => {
      const name = row.original.patient.name
      const breed = row.original.patient.breed
      const species = row.original.patient.species
      return (
        <div className="w-[200px] md:w-auto">
          <PatientInfo
            name={name}
            species={species}
            breed={breed}
            className="justify-center"
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'out_time',
    header: '퇴원 시각',
    cell: ({ row }) => {
      const outTime = row.original.out_time
      const isDischarged = row.original.out_date !== null
      const hosId = row.original.hos_id
      const icuIoId = row.original.icu_io_id

      return (
        <OutDueChecklistInput
          hosId={hosId as string}
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          checkType="out_time"
          value={outTime}
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
      const hosId = row.original.hos_id
      const icuIoId = row.original.icu_io_id

      return (
        <OutDueChecklistInput
          hosId={hosId as string}
          icuIoId={icuIoId}
          isDischarged={isDischarged}
          checkType="basic_care"
          value={basicCare}
        />
      )
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

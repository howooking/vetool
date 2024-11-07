'use client'

import PatientSelectButton from '@/components/hospital/icu/header/register-dialog/patient-search/patient-select-button'
import PatientActions from '@/components/hospital/patients/patient-actions'
import { Button } from '@/components/ui/button'
import { calculateAge, convertPascalCased, cn } from '@/lib/utils'
import { PatientDataTable } from '@/types/patients'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Cat, Dog } from 'lucide-react'

export const patientsColumns: ColumnDef<PatientDataTable>[] = [
  {
    accessorKey: 'species',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          종
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const species = row.original.species
      return (
        <div className="flex justify-center">
          {species === 'canine' ? <Dog /> : <Cat />}
        </div>
      )
    },
  },
  {
    accessorKey: 'hos_patient_id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          환자번호
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const hosPatientId = row.original.hos_patient_id
      return <>{hosPatientId}</>
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          이름
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.original.name
      const isAlive = row.original.is_alive
      return (
        <div className={cn(!isAlive && 'text-destructive')}>
          {name} {!isAlive && '(사망)'}
        </div>
      )
    },
  },
  {
    accessorKey: 'breed',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          품종
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const breed = row.original.breed
      return <>{convertPascalCased(breed)}</>
    },
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          성별
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const gender = row.original.gender
      return <>{gender.toUpperCase()}</>
    },
  },
  {
    accessorKey: 'birth',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          나이 (생일)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const birth = row.original.birth
      return (
        <div>
          {calculateAge(birth)} ({birth})
        </div>
      )
    },
  },
  {
    accessorKey: 'owner_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          보호자
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
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
      return <div>{createdAt.slice(0, 10)}</div>
    },
  },
  {
    accessorKey: 'select_patient',
    header: ({ table }) => {
      const firstRow = table.getRowModel().rows[0]
      const isIcu = firstRow ? firstRow.original.isIcu : false

      return (
        <div className={cn('flex justify-center', !isIcu && 'hidden')}>
          선택
        </div>
      )
    },
    cell: ({ row }) => {
      const patientId = row.original.patient_id
      const isIcu = row.original.isIcu
      const birth = row.original.birth
      const patientName = row.original.name
      return (
        <div className={cn('flex justify-center', !isIcu && 'hidden')}>
          <PatientSelectButton
            patientId={patientId}
            isIcu={isIcu}
            birth={birth}
            patientName={patientName}
          />
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const patient = row.original
      const isIcu = row.original.isIcu
      const hosPatientIds = table.options.data.map(
        (patient) => patient.hos_patient_id,
      )
      return (
        <div className={cn('flex justify-center', isIcu && 'hidden')}>
          <PatientActions patient={patient} hosPatientIds={hosPatientIds} />
        </div>
      )
    },
  },
]

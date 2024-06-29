'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { calculateAge, cn } from '@/lib/utils'
import { PatientDataTable } from '@/types/hospital/patients'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Cat, Dog, MoreHorizontal } from 'lucide-react'

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
      // TODO slice 없에야함
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

      // TODO slice 없에야함
      return <>{hosPatientId.slice(0, 8)}</>
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

      // TODO slice 없에야함
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
      // TODO slice 없에야함
      return <>{breed.slice(0, 10)}</>
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
    id: 'actions',
    cell: ({ row }) => {
      const patient = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(patient.patient_id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

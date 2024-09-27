'use client'

import CompanyColumn from '@/components/hospital/admin/drug/company-column'
import DeleteDrugDialog from '@/components/hospital/admin/drug/delete-drug-dialog'
import DescriptionColumn from '@/components/hospital/admin/drug/description-column'
import IndicationColumn from '@/components/hospital/admin/drug/indication-column'
import SideEffectColumn from '@/components/hospital/admin/drug/side-effect-column'
import TypeColumn from '@/components/hospital/admin/drug/type-column'
import UnitColumn from '@/components/hospital/admin/drug/unit-column'
import { Button } from '@/components/ui/button'
import { DrugProductDetail } from '@/types/adimin'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export const drugColumns: ColumnDef<DrugProductDetail>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          약물명
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const drugName = row.original.name
      return <span>{drugName}</span>
    },
  },
  {
    accessorKey: 'description',
    header: () => {
      return <span>설명</span>
    },
    cell: ({ row }) => {
      const hosId = row.original.hos_id
      const description = row.original.description
      const drugProductId = row.original.drug_products_id
      return (
        <DescriptionColumn
          hosId={hosId as string}
          drugProductId={drugProductId}
          description={description ?? ''}
        />
      )
    },
  },
  {
    accessorKey: 'indication',
    header: () => {
      return <span>적응증</span>
    },
    cell: ({ row }) => {
      const indication = row.original.indication
      const drugDescriptionId = row.original.drugs_description_id
      const hosId = row.original.hos_id
      return (
        <IndicationColumn
          hosId={hosId as string}
          drugDescriptionId={drugDescriptionId}
          indication={indication ?? ''}
        />
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return <span>유형</span>
    },
    cell: ({ row }) => {
      const type = row.original.type
      const hosId = row.original.hos_id
      const drugProductId = row.original.drug_products_id
      return (
        <TypeColumn
          drugProductId={drugProductId}
          hosId={hosId as string}
          type={type ?? ''}
        />
      )
    },
  },
  {
    accessorKey: 'unit',
    header: ({ column }) => {
      return <span>단위</span>
    },
    cell: ({ row }) => {
      const unit = row.original.unit
      const id = row.original.drug_products_id
      return <UnitColumn id={id} unit={unit ?? ''} />
    },
  },

  {
    accessorKey: 'sideEffect',
    header: ({ column }) => {
      return <span>부작용</span>
    },
    cell: ({ row }) => {
      const sideEffect = row.original.side_effect ?? '-'
      const id = row.original.drugs_description_id
      return <SideEffectColumn id={id} sideEffect={sideEffect} />
    },
  },

  {
    accessorKey: 'company',
    header: ({ column }) => {
      return <span>제약사</span>
    },
    cell: ({ row }) => {
      const company = row.original.company ?? '-'
      const id = row.original.drug_products_id
      return <CompanyColumn id={id} company={company} />
    },
  },

  {
    accessorKey: 'delete',
    header: () => {
      return <span>삭제</span>
    },
    cell: ({ row }) => {
      const drugName = row.original.name
      const id = row.original.drug_products_id
      return <DeleteDrugDialog id={id} drugName={drugName} />
    },
  },
]

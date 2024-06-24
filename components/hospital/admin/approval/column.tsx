'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatTimestamp } from '@/lib/utils'
import type { ApprovalDataTable } from '@/types/hospital/adimin'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { ApprovalColumn } from './approval-column'

export const columns: ColumnDef<ApprovalDataTable>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          요청인
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const avatarUrl = row.original.avatar_url
      const name = row.original.name

      return (
        <div className="flex items-center justify-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt="user avatar" />
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
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
          요청일시
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const created_at = row.original.created_at

      return <span>{formatTimestamp(created_at)}</span>
    },
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          승인일시
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const updatedAt = row.original.updated_at
      console.log(updatedAt)

      return <span>{updatedAt ? formatTimestamp(updatedAt) : '미승인'} </span>
    },
  },

  {
    id: 'action',
    cell: ({ row }) => {
      const userId = row.original.user_id
      const name = row.original.name
      const isApproved = row.original.is_approved

      return (
        <ApprovalColumn userId={userId} name={name} isApproved={isApproved} />
      )
    },
  },
]

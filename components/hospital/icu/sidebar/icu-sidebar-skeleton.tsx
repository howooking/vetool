import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function IcuSidebarSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  )
}

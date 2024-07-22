import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function IcuChartSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-2 p-2">
      {/* infos skeleton */}
      <Skeleton className="h-20 w-full" />
      {/* table skeleton */}
      <Skeleton className="h-[408px] w-full rounded-none" />

      {/* memos skeleton */}
      <div className="flex h-[234px] w-full gap-2">
        <Skeleton className="h-[234px] w-1/3" />
        <Skeleton className="h-[234px] w-1/3" />
        <Skeleton className="h-[234px] w-1/3" />
      </div>
    </div>
  )
}

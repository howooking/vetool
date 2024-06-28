import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function IcuPatientListSkeleton() {
  return (
    <div className="flex w-[120px] flex-col items-center gap-2">
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-8 w-28" />
    </div>
  )
}

import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function SidebarSkeleton() {
  return (
    <div className="flex h-icu-chart flex-col items-center gap-2 border-r p-2">
      <span className="mr-auto text-xs font-bold text-gray-500">필터</span>
      <Skeleton className="h-[30px] w-[127px]" />
      <Skeleton className="h-8 w-[127px]" />

      <Separator className="my-1" />

      <span className="mr-auto text-xs font-bold text-gray-500">입원환자</span>
      <Skeleton className="h-8 w-[127px]" />
      <Skeleton className="h-8 w-[127px]" />
      <Skeleton className="h-8 w-[127px]" />
      <Skeleton className="h-8 w-[127px]" />
      <Skeleton className="h-8 w-[127px]" />
      <Skeleton className="h-8 w-[127px]" />
      <Skeleton className="h-8 w-[127px]" />
      <Skeleton className="h-8 w-[127px]" />
      <Skeleton className="h-8 w-[127px]" />
      <Skeleton className="h-8 w-[127px]" />
    </div>
  )
}

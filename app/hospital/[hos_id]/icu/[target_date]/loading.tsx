import { Skeleton } from '@/components/ui/skeleton'

export default function IcuSkeleton() {
  return (
    <div className="flex">
      {/* sidebar skeleton */}
      <div className="flex h-icu-chart flex-col items-center gap-2 border-r p-2">
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
        <Skeleton className="h-8 w-[127px]" />
        <Skeleton className="h-8 w-[127px]" />
      </div>

      {/* chart skeleton */}
      <div className="flex w-full flex-col items-center gap-4 p-2">
        {/* infos skeleton */}
        <Skeleton className="h-20 w-full" />
        {/* table skeleton */}
        <Skeleton className="h-[408px] w-full" />

        {/* memos skeleton */}
        <div className="flex h-[234px] w-full gap-2">
          <Skeleton className="h-[234px] w-1/3" />
          <Skeleton className="h-[234px] w-1/3" />
          <Skeleton className="h-[234px] w-1/3" />
        </div>
      </div>
    </div>
  )
}

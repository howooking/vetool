import IcuChartSkeleton from '@/components/hospital/icu/main/chart/icu-chart-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function IcuSkeleton() {
  return (
    <div className="flex">
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

      <IcuChartSkeleton />
    </div>
  )
}

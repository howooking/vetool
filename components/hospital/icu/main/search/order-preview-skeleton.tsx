import { Skeleton } from '@/components/ui/skeleton'

export default function OrderPreviewSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-[33px] w-[1150px]" />
      <Skeleton className="h-[33px] w-[1150px]" />
      <Skeleton className="h-[33px] w-[1150px]" />
      <Skeleton className="h-[33px] w-[1150px]" />
      <Skeleton className="h-[33px] w-[1150px]" />
      <Skeleton className="h-[33px] w-[1150px]" />
      <Skeleton className="h-[33px] w-[1150px]" />
      <Skeleton className="h-[33px] w-[1150px]" />
      <Skeleton className="h-[33px] w-[1150px]" />
      <Skeleton className="h-[33px] w-[1150px]" />
      <Skeleton className="h-[33px] w-[1150px]" />
    </div>
  )
}

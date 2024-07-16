import { Skeleton } from '@/components/ui/skeleton'

export default function IcuMainSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 p-2">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-[400px] w-full" />
      <div className="flex h-[234px] w-full gap-2">
        <Skeleton className="h-[234px] w-1/3" />
        <Skeleton className="h-[234px] w-1/3" />
        <Skeleton className="h-[234px] w-1/3" />
      </div>
    </div>
  )
}

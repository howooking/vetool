import { Skeleton } from '@/components/ui/skeleton'
import { LoaderCircle } from 'lucide-react'

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

      <div className="flex w-full items-center justify-center">
        <LoaderCircle className="h-20 w-20 animate-spin text-primary" />
      </div>
    </div>
  )
}

import { Skeleton } from '@/components/ui/skeleton'

export default function IcuHeaderSkeleton() {
  return (
    <div className="absolute left-2 top-2 flex items-center gap-4">
      <Skeleton className="h-8 w-16" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-[108px]" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  )
}

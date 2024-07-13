import { Skeleton } from '@/components/ui/skeleton'

export default function IcuMainSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
}

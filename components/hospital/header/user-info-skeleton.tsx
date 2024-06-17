import { Skeleton } from '@/components/ui/skeleton'

export function UserInfoSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-[160px]" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  )
}

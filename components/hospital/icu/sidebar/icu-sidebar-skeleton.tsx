import { Skeleton } from '@/components/ui/skeleton'

export default function IcuSidebarSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-8 w-[122px]" />
      <Skeleton className="h-8 w-[122px]" />
      <Skeleton className="h-8 w-[122px]" />
      <Skeleton className="h-8 w-[122px]" />
      <Skeleton className="h-8 w-[122px]" />
      <Skeleton className="h-8 w-[122px]" />
      <Skeleton className="h-8 w-[122px]" />
    </div>
  )
}

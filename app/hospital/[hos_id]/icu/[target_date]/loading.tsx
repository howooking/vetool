import LargeLoaderCircle from '@/components/common/large-loader-circle'
import SidebarSkeleton from '@/components/hospital/icu/sidebar/sidebar-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function IcuLoading() {
  return (
    <div className="flex">
      <SidebarSkeleton />
      <LargeLoaderCircle />
    </div>
  )
}

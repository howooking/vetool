import LargeLoaderCircle from '@/components/common/large-loader-circle'
import SidebarSkeleton from '@/components/hospital/icu/sidebar/sidebar-skeleton'

export default function IcuSkeleton() {
  return (
    <div className="flex">
      <SidebarSkeleton />
      <LargeLoaderCircle />
    </div>
  )
}

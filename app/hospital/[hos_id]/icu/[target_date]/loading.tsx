import LargeLoaderCircle from '@/components/common/large-loader-circle'
import SidebarSkeleton from '@/components/hospital/icu/sidebar/sidebar-skeleton'

export default function IcuPageLoading() {
  return (
    <>
      <div className="hidden md:flex">
        <SidebarSkeleton />
        <LargeLoaderCircle />
      </div>

      <LargeLoaderCircle className="h-icu-chart md:hidden" />
    </>
  )
}

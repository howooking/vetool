import LargeLoaderCircle from '@/components/common/large-loader-circle'

export default function loading() {
  return (
    <div className="flex h-icu-chart items-center justify-center">
      <LargeLoaderCircle />
    </div>
  )
}

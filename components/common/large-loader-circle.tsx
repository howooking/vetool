import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

export default function LargeLoaderCircle({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn('flex w-full items-center justify-center', className)}>
      <LoaderCircle className="h-20 w-20 animate-spin text-primary" />
    </div>
  )
}

import { cn } from '@/lib/utils'
import { SearchX } from 'lucide-react'

export default function NoResult({
  title,
  className,
  ...rest
}: {
  title: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'hospital-page-height flex w-full flex-col items-center justify-center gap-4 pb-20',
        className,
      )}
      {...rest}
    >
      <SearchX className="text-primary" size={80} />
      <span className="text-2xl font-bold">{title}</span>
    </div>
  )
}

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
        'flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center gap-4 text-2xl font-bold',
        className,
      )}
      {...rest}
    >
      <SearchX className="text-primary" size={64} />
      <span>{title}</span>
    </div>
  )
}

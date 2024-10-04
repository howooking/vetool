import { cn } from '@/lib/utils'
import { Cat, Dog } from 'lucide-react'

export default function PatientInfo({
  name,
  species,
  breed,
  size = 16,
  className,
  col = false,
}: {
  name: string
  species: string
  breed: string
  size?: number
  className?: string
  col?: boolean
}) {
  const Icon = species === 'canine' ? Dog : Cat

  return (
    <div
      className={cn(`${className}`, !col && 'flex w-full items-center gap-1')}
    >
      <div className={cn('flex items-center gap-1', col && 'justify-center')}>
        <Icon size={size} />

        <div className={cn('flex items-center gap-1', !col && 'line-clamp-1')}>
          <span>{name}</span>
          {!col && (
            <span className="pl-1 text-xs text-muted-foreground">{breed}</span>
          )}
        </div>
      </div>
      {col && (
        <div className="line-clamp-1 text-[10px] text-muted-foreground">
          {breed}
        </div>
      )}
    </div>
  )
}

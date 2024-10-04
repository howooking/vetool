import { Label } from '@/components/ui/label'

export default function VetName({
  label,
  name,
}: {
  label: string
  name: string
}) {
  return (
    <div className="flex items-center gap-1">
      <Label className="hidden text-[10px] leading-3 text-muted-foreground md:block">
        {label}
      </Label>
      <div className="flex items-center gap-1">
        {/* <Image
          unoptimized
          src={avatarUrl ?? ''}
          alt={name}
          width={16}
          height={16}
          className="rounded-full"
        /> */}
        <span className="text-xs">{name}</span>
      </div>
    </div>
  )
}

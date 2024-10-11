export default function VetName({
  label,
  name,
}: {
  label: string
  name: string
}) {
  return (
    <div className="flex gap-2">
      <span className="hidden text-xs text-muted-foreground md:block">
        {label}
      </span>
      <span>{name}</span>
    </div>
  )
}

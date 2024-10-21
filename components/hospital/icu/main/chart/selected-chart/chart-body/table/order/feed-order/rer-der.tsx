export default function RerDer({
  calcuatedVal,
  prefix,
}: {
  calcuatedVal: string
  prefix: string
}) {
  return (
    <div className="col-span-2 flex h-9 items-center justify-between rounded-md border px-2.5">
      <span className="text-sm font-semibold text-muted-foreground">
        {prefix}
      </span>
      <div className="flex items-end gap-2">
        <span>{calcuatedVal}</span>
        <span className="text-sm text-muted-foreground">kcal/day</span>
      </div>
    </div>
  )
}

export default function OutDate({ outDate }: { outDate: string | null }) {
  return (
    <div className="flex h-9 w-full select-none items-center gap-2 rounded-md border px-2">
      <span className="text-xs text-muted-foreground">퇴원일</span>
      <span className="text-sm">{outDate}</span>
    </div>
  )
}

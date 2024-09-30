import CustomTooltip from '@/components/ui/custom-tooltip'
import { LogOut } from 'lucide-react'

export default function OutDate({ outDate }: { outDate: string | null }) {
  return (
    <div className="flex h-9 w-full select-none items-center gap-2 rounded-md border px-2">
      <CustomTooltip contents="퇴원일" variant="secondary" side="left">
        <LogOut className="text-muted-foreground" size={16} />
      </CustomTooltip>
      <span className="text-sm">{outDate}</span>
    </div>
  )
}

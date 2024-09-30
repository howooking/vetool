import CustomTooltip from '@/components/ui/custom-tooltip'
import { LogIn } from 'lucide-react'

export default function Indate({ inDate }: { inDate: string }) {
  return (
    <div className="flex h-9 w-full select-none items-center gap-2 rounded-md border px-2">
      <CustomTooltip contents="입원일" variant="secondary" side="left">
        <LogIn className="cursor-pointer text-muted-foreground" size={16} />
      </CustomTooltip>
      <span className="text-sm">{inDate}</span>
    </div>
  )
}

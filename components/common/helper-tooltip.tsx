import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CircleHelp } from 'lucide-react'

export default function HelperTooltip({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          <CircleHelp className="cursor-pointer text-primary" size={18} />
        </TooltipTrigger>
        <TooltipContent>
          <div>{children}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

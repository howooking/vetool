import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export default function RealtimeStatus({
  isSubscriptionReady,
}: {
  isSubscriptionReady: boolean
}) {
  return (
    <TooltipProvider delayDuration={30}>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          <div className="mr-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">실시간</span>
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                isSubscriptionReady
                  ? 'animate-pulse bg-green-600'
                  : 'bg-red-500',
              )}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-semibold">
            {isSubscriptionReady
              ? '실시간 차트의 변경을 감지하고 있습니다'
              : '차트의 변경을 감지하지 못하고 있습니다. 새로고침을 해주세요.'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

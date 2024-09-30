import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'
import { cn } from '@/lib/utils'

export default function CustomTooltip({
  contents,
  children,
  sideOffset = 10,
  variant = 'primary',
  side = 'top',
}: {
  contents: React.ReactNode
  children: React.ReactNode
  sideOffset?: number
  variant?: 'primary' | 'secondary'
  side?: 'top' | 'bottom' | 'left' | 'right'
}) {
  return (
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className={cn(
            variant === 'primary'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground',
          )}
        >
          {contents}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

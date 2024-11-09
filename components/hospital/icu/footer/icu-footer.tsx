'use client'

import { Button } from '@/components/ui/button'
import { useIcuRealtime } from '@/hooks/use-icu-realtime'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import RealtimeStatus from './realtime-status'
import { useEffect } from 'react'
import { toast } from '@/components/ui/use-toast'
import { useRealtimeSubscriptionStore } from '@/lib/store/icu/realtime-subscription'

export const FOOTER_MAIN_VIEW_MENUS = [
  {
    label: '종합 현황',
    value: 'summary',
  },
  {
    label: '처치표',
    value: 'tx-table',
  },
  {
    label: '입원 차트',
    value: 'chart',
  },
  {
    label: '퇴원 / 면회',
    value: 'out-and-visit',
  },
  {
    label: '차트 검색',
    value: 'search',
  },
  {
    label: '템플릿',
    value: 'template',
  },
  {
    label: '북마크',
    value: 'bookmark',
  },
  {
    label: '입원 통계',
    value: 'analysis',
  },
] as const

export default function IcuFooter({
  hosId,
  targetDate,
}: {
  hosId: string
  targetDate: string
}) {
  useIcuRealtime(hosId)

  const { isSubscriptionReady } = useRealtimeSubscriptionStore()
  const { push, refresh } = useRouter()

  const path = usePathname()
  const currentIcuPath = path.split('/').at(5)
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  useEffect(() => {
    if (isSubscriptionReady) {
      toast({
        title: '차트의 실시간 변경을 감지하고 있습니다',
        className: 'bg-green-600 text-white',
      })

      refresh()
    }
  }, [isSubscriptionReady, refresh])

  return (
    <footer
      className={cn(
        'fixed bottom-0 z-20 h-[calc(2.5rem+env(safe-area-inset-bottom))] w-full border-t bg-white transition-all duration-200',
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <ul className="flex h-full items-center gap-2 pl-1">
          <RealtimeStatus isSubscriptionReady={isSubscriptionReady} />

          {FOOTER_MAIN_VIEW_MENUS.map(({ label, value }) => (
            <li
              key={value}
              className={cn(
                value === 'search' ||
                  value === 'template' ||
                  value === 'analysis' ||
                  value === 'bookmark'
                  ? 'hidden md:block'
                  : '',
              )}
            >
              <Button
                size="sm"
                variant="ghost"
                className={currentIcuPath === value ? 'bg-muted' : ''}
                onClick={() =>
                  push(
                    `/hospital/${hosId}/icu/${targetDate}/${value}?${params}`,
                  )
                }
              >
                {label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

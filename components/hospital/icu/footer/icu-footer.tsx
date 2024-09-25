'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'

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
    label: '차트 검색',
    value: 'search',
  },
  {
    label: '즐겨찾기',
    value: 'bookmark',
  },
] as const

export default function IcuFooter({
  hosId,
  targetDate,
  // isSubscriptionReady,
}: {
  hosId: string
  targetDate: string
  // isSubscriptionReady: boolean
}) {
  // const { isExpanded } = useSidebarStore()
  const { push } = useRouter()
  const path = usePathname()
  const currentIcuPath = path.split('/').at(5)

  return (
    <footer
      className={cn(
        'fixed bottom-0 z-20 flex h-10 w-full items-center justify-between border-t bg-white transition-all duration-200',
        // isExpanded ? 'md:w-[calc(100%-336px)]' : 'md:w-[calc(100%-200px)]',
      )}
    >
      <ul className="flex h-full items-center gap-2 pl-1">
        {FOOTER_MAIN_VIEW_MENUS.map(({ label, value }) => (
          <li
            key={value}
            className={cn(
              value === 'search' || value === 'bookmark'
                ? 'hidden md:block'
                : '',
            )}
          >
            <Button
              size="sm"
              variant="ghost"
              className={currentIcuPath === value ? 'bg-muted' : ''}
              onClick={() =>
                push(`/hospital/${hosId}/icu/${targetDate}/${value}`)
              }
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>

      {/* <RealtimeStatus isSubscriptionReady={isSubscriptionReady} /> */}

      {/* ICU 알림 기능 일단 보류 */}
      {/* <IcuNotification hosId={hosId} /> */}
    </footer>
  )
}

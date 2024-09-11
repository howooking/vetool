'use client'

import { Button } from '@/components/ui/button'
import { useSidebarStore } from '@/lib/store/common/sidebar'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import RealtimeStatus from './realtime-status'

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
  isSubscriptionReady,
}: {
  hosId: string
  isSubscriptionReady: boolean
}) {
  const { selectIcudMainView, setSelectedIcuMainView } =
    useSelectedMainViewStore()
  const { isExpanded } = useSidebarStore()

  return (
    <footer
      className={cn(
        'fixed bottom-0 z-20 flex h-10 w-full items-center justify-between border-t bg-white transition-all duration-200',
        // position fixed의 한계, 병원사이드바 펼쳤을 때 / 접었을 때 너비
        isExpanded ? 'md:w-[calc(100%-336px)]' : 'md:w-[calc(100%-200px)]',
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
              className={selectIcudMainView === value ? 'bg-muted' : ''}
              onClick={() => setSelectedIcuMainView(value)}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>

      <RealtimeStatus isSubscriptionReady={isSubscriptionReady} />

      {/* ICU 알림 기능 일단 보류 */}
      {/* <IcuNotification hosId={hosId} /> */}
    </footer>
  )
}

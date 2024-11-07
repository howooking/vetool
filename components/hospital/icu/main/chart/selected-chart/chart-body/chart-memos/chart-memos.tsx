'use client'

import HideAndShowButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/hide-and-show-button'
import { Separator } from '@/components/ui/separator'
import { type Memo } from '@/hooks/use-memo-management'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { useState } from 'react'
import MemoGroup from './memo-group'

export default function ChartMemos({
  memoA,
  memoB,
  memoC,
  icuChartId,
}: {
  memoA: Memo[] | null
  memoB: Memo[] | null
  memoC: Memo[] | null
  icuChartId: string
}) {
  const [showMemos, setShowMemos] = useState(true)
  const {
    basicHosData: { memoNameListData },
  } = useBasicHosDataContext()

  return (
    <div className="relative">
      {showMemos && (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <MemoGroup
            memo={memoA}
            memoIndex={0}
            icuChartId={icuChartId}
            memoName={memoNameListData[0]}
          />

          <Separator className="mt-4 md:hidden" />

          <MemoGroup
            memo={memoB}
            memoIndex={1}
            icuChartId={icuChartId}
            memoName={memoNameListData[1]}
          />

          <Separator className="mt-4 md:hidden" />

          <MemoGroup
            memo={memoC}
            memoIndex={2}
            icuChartId={icuChartId}
            memoName={memoNameListData[2]}
          />
        </div>
      )}

      <HideAndShowButton setShowMemos={setShowMemos} showMemos={showMemos} />
    </div>
  )
}

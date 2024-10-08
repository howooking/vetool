'use client'

import HideAndShowButton from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/hide-and-show-button'
import Memo from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/memo'
import { Separator } from '@/components/ui/separator'
import { Json } from '@/lib/supabase/database.types'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-privider'
import { useState } from 'react'
import HideAndShowButton from './hide-and-show-button'

export default function ChartMemos({
  memoA,
  memoB,
  memoC,
  icuChartId,
}: {
  memoA: Json
  memoB: Json
  memoC: Json
  icuChartId: string
}) {
  const [isShow, setIsShow] = useState(true)
  const {
    basicHosData: { memoNameListData },
  } = useBasicHosDataContext()

  return (
    <div className="relative">
      {isShow && (
        <div className="flex flex-col gap-2 md:flex-row">
          <Memo
            memo={memoA}
            memoIndex={0}
            icuChartId={icuChartId}
            memoNameListData={memoNameListData}
          />
          <Separator className="mt-4 md:hidden" />
          <Memo
            memo={memoB}
            memoIndex={1}
            icuChartId={icuChartId}
            memoNameListData={memoNameListData}
          />
          <Separator className="mt-4 md:hidden" />
          <Memo
            memo={memoC}
            memoIndex={2}
            icuChartId={icuChartId}
            memoNameListData={memoNameListData}
          />
        </div>
      )}

      <HideAndShowButton setIsShow={setIsShow} isShow={isShow} />
    </div>
  )
}

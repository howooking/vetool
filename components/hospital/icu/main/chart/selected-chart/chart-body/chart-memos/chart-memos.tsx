'use client'

import Memo from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-memos/memo'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-privider'
import { useState } from 'react'
import HideAndShowButton from './HideAndShowButton'

export default function ChartMemos({
  memoA,
  memoB,
  memoC,
  icuChartId,
}: {
  memoA: string
  memoB: string
  memoC: string
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
            icuChartId={icuChartId}
            memoNameListData={memoNameListData}
            index={0}
          />
          <Memo
            memo={memoB}
            icuChartId={icuChartId}
            memoNameListData={memoNameListData}
            index={1}
          />
          <Memo
            memo={memoC}
            icuChartId={icuChartId}
            memoNameListData={memoNameListData}
            index={2}
          />
        </div>
      )}
      <HideAndShowButton setIsShow={setIsShow} isShow={isShow} />
    </div>
  )
}

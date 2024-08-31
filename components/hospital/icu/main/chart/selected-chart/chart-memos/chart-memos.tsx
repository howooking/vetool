import Memo from '@/components/hospital/icu/main/chart/selected-chart/chart-memos/memo'
import { useState } from 'react'
import HideAndShowButton from './HideAndShowButton'

export default function ChartMemos({
  memoA,
  memoB,
  memoC,
  icuChartId,
  hosIcuMemoNames,
}: {
  memoA: string
  memoB: string
  memoC: string
  icuChartId: string
  hosIcuMemoNames: string[]
}) {
  const [isShow, setIsShow] = useState(true)
  return (
    <div className="relative">
      {isShow && (
        <div className="flex gap-2">
          <Memo
            memo={memoA}
            icuChartId={icuChartId}
            hosIcuMemoNames={hosIcuMemoNames}
            index={0}
          />
          <Memo
            memo={memoB}
            icuChartId={icuChartId}
            hosIcuMemoNames={hosIcuMemoNames}
            index={1}
          />
          <Memo
            memo={memoC}
            icuChartId={icuChartId}
            hosIcuMemoNames={hosIcuMemoNames}
            index={2}
          />
        </div>
      )}
      <HideAndShowButton setIsShow={setIsShow} isShow={isShow} />
    </div>
  )
}

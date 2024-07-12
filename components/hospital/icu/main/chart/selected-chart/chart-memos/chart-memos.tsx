import Memo from './memo'

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
  return (
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
  )
}

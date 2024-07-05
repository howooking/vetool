import { Input } from '@/components/ui/input'

type IcuChartOrderMemosProps = {
  memoA: string | null
  memoB: string | null
  memoC: string | null
}
export default function IcuChartOrderMemos({
  memoA,
  memoB,
  memoC,
}: IcuChartOrderMemosProps) {
  return (
    <div className="mt-auto flex w-full justify-between gap-4">
      <Input
        className="items-top min-h-64 w-1/3 bg-white"
        type="text"
        placeholder="Memo A"
        value={memoA ?? ''}
        onChange={() => {}}
      />
      <Input
        className="min-h-64 w-1/3 bg-white"
        type="text"
        placeholder="Memo B"
        value={memoB ?? ''}
        onChange={() => {}}
      />
      <Input
        className="min-h-64 w-1/3 bg-white"
        type="text"
        placeholder="Memo C"
        value={memoC ?? ''}
        onChange={() => {}}
      />
    </div>
  )
}

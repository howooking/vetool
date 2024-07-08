import { Input } from '@/components/ui/input'
import { updateMemo } from '@/lib/services/hospital/icu/updateIcuChart'
import { useIcuSelectedPatientStore } from '@/lib/store/hospital/icu/icu-selected-patient'
import { useState } from 'react'

type MemoState = {
  memoA: string | null
  memoB: string | null
  memoC: string | null
}

const MEMO_FIELDS = ['memoA', 'memoB', 'memoC'] as const

export default function IcuChartMemo({ memoA, memoB, memoC }: MemoState) {
  const { selectedPatientId } = useIcuSelectedPatientStore()
  const [memoState, setMemoState] = useState({
    memoA,
    memoB,
    memoC,
  })

  const handleInputChange =
    (field: keyof MemoState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value

      setMemoState((rest) => ({ ...rest, [field]: inputValue }))
    }

  const handleInputBlur = async () => {
    // 배열로 변환하여 trim() 진행 후, 다시 객체로 변환
    const trimmedMemoState = Object.fromEntries(
      Object.entries(memoState).map(([key, value]) => [
        key,
        value?.trim() ?? null,
      ]),
    ) as MemoState

    setMemoState(trimmedMemoState)

    if (
      memoState.memoA === memoA &&
      memoState.memoB === memoB &&
      memoState.memoC === memoC
    ) {
      return
    }

    // await updateMemo(selectedPatientId, selectedDate, trimmedMemoState)
  }

  return (
    <div className="mt-auto flex w-full justify-between gap-4">
      {MEMO_FIELDS.map((field) => (
        <Input
          key={field}
          className="min-h-64 w-1/3 bg-white"
          type="text"
          placeholder="메모를 입력해주세요"
          value={memoState[field] ?? ''}
          onChange={handleInputChange(field)}
          onBlur={handleInputBlur}
        />
      ))}
    </div>
  )
}

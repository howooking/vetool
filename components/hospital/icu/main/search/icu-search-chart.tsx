'use client'

import SearchChartTable from '@/components/hospital/icu/main/search/search-chart-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { selectChartList } from '@/lib/services/icu/select-chart-list'
import { usePatientRegisterStep } from '@/lib/store/icu/icu-register'
import type { IcuChartListJoined } from '@/types/icu'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function IcuSearchChart({
  type,
}: {
  type: 'search' | 'register' | 'bookmark'
}) {
  const { setStep } = usePatientRegisterStep()

  const [chartList, setChartList] = useState<IcuChartListJoined[][]>([])

  // Icu_Io_Id로 그룹화
  const groupByIcuIoId = (data: IcuChartListJoined[]) => {
    const groupedMap = new Map<string, IcuChartListJoined[]>()

    for (const item of data) {
      const group = groupedMap.get(item.icu_io_id) || []
      group.push(item)
      groupedMap.set(item.icu_io_id, group)
    }

    return Array.from(groupedMap.values())
  }

  const handleSearch = useDebouncedCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()

      if (value) {
        const selectedChartList = await selectChartList(value)
        setChartList(groupByIcuIoId(selectedChartList))
      }
    },
    500,
  )

  const handlePrevButtonClick = () => setStep('selectChartType')

  return (
    <div className="flex flex-col gap-4 p-4">
      <Input
        placeholder="환자명, DX, CC를 통해 차트를 검색하세요"
        onChange={handleSearch}
      />
      <SearchChartTable data={chartList} type={type} />
      {type === 'register' && (
        <Button
          onClick={handlePrevButtonClick}
          variant="outline"
          className="ml-auto"
        >
          이전
        </Button>
      )}
    </div>
  )
}

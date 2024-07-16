'use client'

import IcuChartDataTable from '@/components/hospital/icu/main/search/icu-search-data-table'
import { Input } from '@/components/ui/input'
import { selectChartList } from '@/lib/services/icu/select-chart-list'
import type { IcuChartListJoined } from '@/types/icu'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function IcuChartSearch({ register }: { register?: boolean }) {
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

  return (
    <div className="flex flex-col gap-4 p-4">
      <Input
        placeholder="환자명, DX, CC를 통해 차트를 검색하세요"
        onChange={handleSearch}
      />
      <IcuChartDataTable data={chartList} register={register} />
    </div>
  )
}

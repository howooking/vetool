'use client'

import HelperTooltip from '@/components/common/helper-tooltip'
import SearchChartTable from '@/components/hospital/icu/main/search/table/search-chart-table'
import { Input } from '@/components/ui/input'
import { searchIcuChart } from '@/lib/services/icu/search-charts'
import type { SearchedChart } from '@/types/icu'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function IcuSearchChart() {
  const { hos_id } = useParams()
  const [isSearching, setIsSearching] = useState(false)
  const [searchedChartState, setSearchedChartState] = useState<SearchedChart[]>(
    [],
  )

  const handleSearch = useDebouncedCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchInput = e.target.value.trim()

      if (searchInput) {
        setIsSearching(true)

        const searchedCharts = await searchIcuChart(
          searchInput,
          hos_id as string,
        )

        setSearchedChartState(searchedCharts)

        setIsSearching(false)
      }
    },
    600,
  )

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="relative">
        <Input
          placeholder="환자명, 종(canine, feline), 품종(영어), DX, CC, 상위 수의학 키워드 검색"
          onChange={handleSearch}
          id="search-chart"
          autoComplete="off"
        />

        <HelperTooltip className="absolute right-2 top-2">
          키워드 검색에 대한 설명글 추가, pacreatitis는 inflammatory 및
          pacratic, intestinal 검색 시 필터링된다..
        </HelperTooltip>
      </div>

      <SearchChartTable
        searchedCharts={searchedChartState}
        isSearching={isSearching}
      />
    </div>
  )
}

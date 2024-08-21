'use client'

import HelperTooltip from '@/components/common/helper-tooltip'
import { Input } from '@/components/ui/input'
import { searchIos } from '@/lib/services/icu/search-charts'
import type { SearchedIcuIos } from '@/types/icu'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import SearchChartTable from './search-chart-table'

export default function IcuSearchChart() {
  const { hos_id } = useParams()
  const [isSearching, setIsSearching] = useState(false)
  const [searchedIcuIos, setSearchedIcuIos] = useState<SearchedIcuIos[]>([])

  const handleSearch = useDebouncedCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchInput = e.target.value.trim()

      if (searchInput) {
        setIsSearching(true)

        const searchResult = await searchIos(searchInput, hos_id as string)
        setSearchedIcuIos(searchResult)

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
          상위 키워드 검색 가능 내용
        </HelperTooltip>
      </div>

      <SearchChartTable
        searchedIcuIos={searchedIcuIos}
        isSearching={isSearching}
      />
    </div>
  )
}

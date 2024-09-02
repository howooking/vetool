'use client'

import HelperTooltip from '@/components/common/helper-tooltip'
import SearchChartTable from '@/components/hospital/icu/main/search/search-chart-table'
import SearchIoSheet from '@/components/hospital/icu/main/search/search-io-sheet'
import { Input } from '@/components/ui/input'
import { searchIos } from '@/lib/services/icu/search-charts'
import type { SearchedIcuIos } from '@/types/icu'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function IcuSearchChart() {
  const { hos_id } = useParams()

  const [searchInput, setSearchInput] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchedIcuIos, setSearchedIcuIos] = useState<SearchedIcuIos[]>([])
  const [searchOptions, setSearchOptions] = useState({
    timeRange: '1',
    order: 'desc',
  })

  const performSearch = useCallback(async () => {
    if (searchInput) {
      setIsSearching(true)

      const searchResult = await searchIos(
        searchInput,
        hos_id as string,
        searchOptions.timeRange,
        searchOptions.order,
      )
      setSearchedIcuIos(searchResult)
      setIsSearching(false)
    }
  }, [searchInput, hos_id, searchOptions])

  const debouncedSearch = useDebouncedCallback(performSearch, 600)

  useEffect(() => {
    debouncedSearch()
  }, [searchInput, searchOptions, debouncedSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.trim())
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="relative">
        <Input
          placeholder="환자명, 종(canine, feline), 품종(영어), DX, CC, 상위 수의학 키워드 검색"
          onChange={handleInputChange}
          id="search-chart"
          autoComplete="off"
        />

        <SearchIoSheet
          searchOptions={searchOptions}
          setSearchOptions={setSearchOptions}
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

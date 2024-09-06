'use client'

import HelperTooltip from '@/components/common/helper-tooltip'
import SearchChartTable from '@/components/hospital/icu/main/search/search-chart-table'
import SearchChartSheet from '@/components/hospital/icu/main/search/sheet/search-chart-sheet'
import SearchTypeRadio from '@/components/hospital/icu/main/search/sheet/search-type-radio'
import { Input } from '@/components/ui/input'
import { searchIos } from '@/lib/services/icu/search-charts'
import { useKeywordTrieStore } from '@/lib/store/hospital/keyword-trie'
import { IcuOrderTypeColor } from '@/types/adimin'
import type { SearchedIcuIos } from '@/types/icu'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export type SearchOptions = {
  timeRange: string
  order: 'desc' | 'asc'
  searchType: 'simple' | 'keyword'
}

export default function IcuSearchChart(
  {
    // orderColors,
  }: {
    // orderColors: IcuOrderTypeColor
  },
) {
  const { hos_id } = useParams()
  const { trie } = useKeywordTrieStore()

  const [searchInput, setSearchInput] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchedIcuIos, setSearchedIcuIos] = useState<SearchedIcuIos[]>([])
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    timeRange: '1',
    order: 'desc',
    searchType: 'simple',
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
    const value = e.target.value.trim()

    if (searchOptions.searchType === 'keyword') {
      const result = trie
        ?.search(value)
        .sort((a, b) => a.keyword.length - b.keyword.length)[0]

      setSearchInput(result?.searchKeyword ?? '')
    } else {
      setSearchInput(value)
    }
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-4">
        <Input
          placeholder="환자명, 종(canine, feline), 품종(영어), DX, CC, 상위 수의학 키워드 검색"
          onChange={handleInputChange}
          id="search-chart"
          autoComplete="off"
          className="w-1/2"
        />

        <SearchTypeRadio setOptions={setSearchOptions} />
        <HelperTooltip>상위 키워드 검색 가능 내용</HelperTooltip>
        <SearchChartSheet
          searchOptions={searchOptions}
          setSearchOptions={setSearchOptions}
        />
      </div>

      <SearchChartTable
        // orderColors={orderColors}
        searchedIcuIos={searchedIcuIos}
        isSearching={isSearching}
      />
    </div>
  )
}

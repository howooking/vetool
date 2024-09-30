'use client'

import HelperTooltip from '@/components/common/helper-tooltip'
import SearchChartTable from '@/components/hospital/icu/main/search/search-chart-table'
import SearchChartSheet from '@/components/hospital/icu/main/search/sheet/search-chart-sheet'
import SearchTypeRadio from '@/components/hospital/icu/main/search/sheet/search-type-radio'
import { Input } from '@/components/ui/input'
import { searchIos } from '@/lib/services/icu/search/search-charts'
import { useKeywordTrieStore } from '@/lib/store/hospital/keyword-trie'
import type { SearchedIcuIos } from '@/types/icu/search'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export type SearchOptions = {
  timeRange: string
  order: 'desc' | 'asc'
  searchType: 'simple' | 'keyword'
}

export default function IcuSearchChart() {
  const { hos_id } = useParams()
  const { trie } = useKeywordTrieStore()

  const [inputValue, setInputValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchedIcuIos, setSearchedIcuIos] = useState<SearchedIcuIos[]>([])
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    timeRange: '1',
    order: 'desc',
    searchType: 'simple',
  })

  const getSearchValue = useCallback(
    (value: string) => {
      if (searchOptions.searchType === 'keyword') {
        const result = trie
          ?.search(value)
          .sort((a, b) => a.keyword.length - b.keyword.length)[0]
        return result?.searchKeyword ?? ''
      }
      return value
    },
    [searchOptions.searchType, trie],
  )

  const performSearch = useDebouncedCallback(async (searchValue: string) => {
    setIsSearching(true)

    if (searchValue) {
      const searchResult = await searchIos(
        searchValue,
        hos_id as string,
        searchOptions.timeRange,
        searchOptions.order,
      )

      setSearchedIcuIos(searchResult)
    }
    setIsSearching(false)
  }, 600)

  const handleInputChange = (value: string) => {
    const trimmedValue = value.trim()
    const searchedValue = getSearchValue(trimmedValue)

    setInputValue(trimmedValue)
    performSearch(searchedValue)
  }

  // searchOptions 변경을 감지하여 검색어 설정 및 검색 진행
  useEffect(() => {
    const searchedValue = getSearchValue(inputValue)

    performSearch(searchedValue)
  }, [searchOptions, inputValue, getSearchValue, performSearch])

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-4 pr-2">
        <Input
          placeholder="환자명, 종(canine, feline), 품종, DX, CC, 처치명, 사용약물명"
          onChange={(e) => handleInputChange(e.target.value)}
          id="search-chart"
          className="w-full"
        />

        {/* <Autocomplete label="DX" handleUpdate={handleInputChange} /> */}

        <SearchTypeRadio setOptions={setSearchOptions} />
        <HelperTooltip>
          <span className="flex flex-col font-semibold">
            <span>키워드 검색: 키워드의 메인키워드를 검색함</span>
            <span>단순 검색: 상위 키워드도 검색 가능하게 되어있음 일단은</span>
          </span>
        </HelperTooltip>
        <SearchChartSheet
          searchOptions={searchOptions}
          setSearchOptions={setSearchOptions}
        />
      </div>

      <SearchChartTable
        searchedIcuIos={searchedIcuIos}
        isSearching={isSearching}
      />
    </div>
  )
}

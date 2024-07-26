'use client'

import HelperTooltip from '@/components/common/helper-tooltip'
import LargeLoaderCircle from '@/components/common/large-loader-circle'
import SearchChartTable from '@/components/hospital/icu/main/search/table/search-chart-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchIcuChart } from '@/lib/services/icu/search-charts'
import { usePatientRegisterStep } from '@/lib/store/icu/icu-register'
import type { SearchedChart } from '@/types/icu'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function IcuSearchChart({
  type,
}: {
  type: 'search' | 'register' | 'bookmark'
}) {
  const { hos_id } = useParams()
  const { setStep } = usePatientRegisterStep()
  const [isSearching, setIsSearching] = useState(false)

  const [groupedCharts, setGroupedCharts] = useState<SearchedChart[][]>([])

  const groupByIcuIoId = (searchedCharts: SearchedChart[]) => {
    const groupedMap = new Map<string, SearchedChart[]>()

    for (const chart of searchedCharts) {
      const group = groupedMap.get(chart.icu_io_id.icu_io_id) || []
      group.push(chart)
      groupedMap.set(chart.icu_io_id.icu_io_id, group)
    }

    return Array.from(groupedMap.values())
  }

  const handleSearch = useDebouncedCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchInput = e.target.value.trim()

      if (searchInput) {
        setIsSearching(true)

        // !! hosId
        const searchedCharts = await searchIcuChart(
          searchInput,
          hos_id as string,
        )

        const groupedCharts = groupByIcuIoId(searchedCharts)

        setGroupedCharts(groupedCharts)

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
        />

        <HelperTooltip className="absolute right-2 top-2">
          키워드 검색에 대한 설명글 추가, pacreatitis는 inflammatory 및
          pacratic, intestinal 검색 시 필터링된다..
        </HelperTooltip>
      </div>

      {isSearching ? (
        <div className="flex h-[400px] items-center justify-center">
          <LargeLoaderCircle />
        </div>
      ) : (
        <SearchChartTable groupedCharts={groupedCharts} type={type} />
      )}

      {type === 'register' && (
        <Button
          onClick={() => setStep('selectChartType')}
          variant="outline"
          className="ml-auto"
        >
          이전
        </Button>
      )}
    </div>
  )
}

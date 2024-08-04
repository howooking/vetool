'use client'

import NoPatients from '@/components/hospital/icu/sidebar/no-patients'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import type {
  IcuChartJoined,
  IcuIoPatientJoined,
  IcuUserList,
} from '@/types/icu'
import { useMemo, useState } from 'react'
import Filters from './filters/filters'
import { Separator } from '@/components/ui/separator'

export type Filters = {
  selectedGroup: string[]
  selectedVet: string
}

export default function IcuSidebar({
  icuIoData,
  icuChartData,
  vetsListData,
}: {
  icuIoData: IcuIoPatientJoined[]
  icuChartData: IcuChartJoined[]
  vetsListData: IcuUserList[]
}) {
  const [filters, setFilters] = useState<Filters>({
    selectedGroup: [] as string[],
    selectedVet: '',
  })

  const filterIoByGroup = (IoData: IcuIoPatientJoined[]) =>
    // 특정 그룹 선택없음이면 모든 data 반환, 특정 그룹 선택 시 해당되는 그룹 반환
    filters.selectedGroup.length === 0
      ? IoData
      : IoData.filter((item) =>
          filters.selectedGroup.some((group) =>
            item.group_list.includes(group),
          ),
        )

  const filterIoByVet = (IoData: IcuIoPatientJoined[]) => {
    // 특정 수의사 선택 없음이면 모든 data 반환
    if (filters.selectedVet === '') return IoData

    const vetFilteredIds = icuChartData
      .filter(
        (chart) =>
          chart.main_vet.user_id === filters.selectedVet ||
          chart.sub_vet?.user_id === filters.selectedVet,
      )
      .map((chart) => chart.icu_io_id.icu_io_id)

    return IoData.filter((item) => vetFilteredIds.includes(item.icu_io_id))
  }

  const { filteredIcuIoData, excludedIcuIoData } = (() => {
    const groupFiltered = filterIoByGroup(icuIoData)
    const filtered = filterIoByVet(groupFiltered)
    const excluded = icuIoData.filter((item) => !filtered.includes(item))

    return { filteredIcuIoData: filtered, excludedIcuIoData: excluded }
  })()

  return (
    <aside className="flex h-icu-chart w-[144px] shrink-0 flex-col gap-3 overflow-y-auto border-r p-2">
      {icuIoData.length === 0 ? (
        <NoPatients />
      ) : (
        <>
          <Filters
            setFilters={setFilters}
            filters={filters}
            icuIoData={icuIoData}
            vetsListData={vetsListData}
          />

          <Separator />

          <PatientList
            filteredIcuIoData={filteredIcuIoData}
            excludedIcuIoData={excludedIcuIoData}
          />
        </>
      )}
    </aside>
  )
}

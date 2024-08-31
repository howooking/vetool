'use client'

import NoPatients from '@/components/hospital/icu/sidebar/no-patients'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import type { IcuChartJoined, IcuIoJoined, IcuUserList } from '@/types/icu'
import { useMemo, useState } from 'react'
import Filters from './filters/filters'
import { Separator } from '@/components/ui/separator'
import { useSearchParams } from 'next/navigation'

export type Filters = {
  selectedGroup: string[]
  selectedVet: string
}

export default function IcuSidebar({
  icuIoData,
  // icuChartData,
  // vetsListData,
}: {
  icuIoData: IcuIoJoined[]
  // icuChartData: IcuChartJoined[]
  // vetsListData: IcuUserList[]
}) {
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    selectedGroup: searchParams.get('group')?.split(',') || [],
    selectedVet: searchParams.get('vet') || '',
  })

  // const filteredData = useMemo(() => {
  //   const filterByGroup = (data: IcuIoJoined[]) =>
  //     filters.selectedGroup.length === 0
  //       ? data
  //       : data.filter((item) =>
  //           filters.selectedGroup.some((group) =>
  //             item.group_list.includes(group),
  //           ),
  //         )

  // const filterByVet = (data: IcuIoJoined[]) => {
  //   if (filters.selectedVet === '') return data

  //   const vetFilteredIds = new Set(
  //     icuChartData
  //       .filter(
  //         (chart) =>
  //           chart.main_vet.user_id === filters.selectedVet ||
  //           chart.sub_vet?.user_id === filters.selectedVet,
  //       )
  //       .map((chart) => chart.icu_io_id.icu_io_id),
  //   )

  //   return data.filter((item) => vetFilteredIds.has(item.icu_io_id))
  // }

  // const filteredIcuIoData = filterByVet(filterByGroup(icuIoData))
  // const excludedIcuIoData = icuIoData.filter(
  //   (item) => !filteredIcuIoData.includes(item),
  // )

  //   return { filteredIcuIoData, excludedIcuIoData }
  // }, [icuIoData, icuChartData, filters])

  // if (icuIoData.length === 0) {
  //   return (
  //     <aside className="flex h-icu-chart w-[144px] shrink-0 flex-col gap-3 overflow-y-auto border-r p-2">
  //       <NoPatients />
  //     </aside>
  //   )
  // }

  return (
    <aside className="flex h-icu-chart w-[144px] shrink-0 flex-col gap-3 border-r p-2">
      <Filters
        setFilters={setFilters}
        filters={filters}
        icuIoData={icuIoData}
        // vetsListData={vetsListData}
      />

      <Separator />

      <PatientList
        filteredIcuIoData={icuIoData}
        // excludedIcuIoData={filteredData.excludedIcuIoData}
      />
    </aside>
  )
}

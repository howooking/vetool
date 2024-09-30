'use client'

import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import NoPatients from '@/components/hospital/icu/sidebar/no-patients'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarData, Vet } from '@/types/icu/chart'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function IcuSidebar({
  icuSidebarData,
  vetsListData,
  hosGroupList,
}: {
  icuSidebarData: IcuSidebarData[]
  vetsListData: Vet[]
  hosGroupList: string[]
}) {
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    selectedGroup: searchParams.get('group')?.split(',') || [],
    selectedVet: searchParams.get('vet') || '',
  })

  const filteredData = useMemo(() => {
    const filterByGroup = (data: IcuSidebarData[]) =>
      filters.selectedGroup.length === 0
        ? data
        : data.filter((item) =>
            filters.selectedGroup.some((group) =>
              item.group_list.includes(group),
            ),
          )

    const filterByVet = (data: IcuSidebarData[]) => {
      if (filters.selectedVet === '') return data
      const vetFilteredIds = new Set(
        icuSidebarData
          .filter(
            (chart) =>
              chart.vets?.main_vet === filters.selectedVet ||
              chart.vets?.sub_vet === filters.selectedVet,
          )
          .map((chart) => chart.icu_io_id),
      )

      return data.filter((item) => vetFilteredIds.has(item.icu_io_id))
    }

    const filteredIcuIoData = filterByVet(filterByGroup(icuSidebarData))
    const excludedIcuIoData = icuSidebarData.filter(
      (item) => !filteredIcuIoData.includes(item),
    )

    return { filteredIcuIoData, excludedIcuIoData }
  }, [filters.selectedGroup, filters.selectedVet, icuSidebarData])

  if (icuSidebarData.length === 0) {
    return (
      <aside className="flex h-[calc(100vh-88px)] w-[144px] shrink-0 flex-col gap-3 overflow-y-auto border-r p-2">
        <NoPatients />
      </aside>
    )
  }

  return (
    <>
      <aside className="hidden h-[calc(100vh-88px)] w-[144px] shrink-0 flex-col gap-3 border-r p-2 md:flex">
        <Filters
          hosGroupList={hosGroupList}
          setFilters={setFilters}
          filters={filters}
          vetsListData={vetsListData}
        />

        <Separator />

        <PatientList
          filteredIcuIoData={filteredData.filteredIcuIoData}
          excludedIcuIoData={filteredData.excludedIcuIoData}
        />
      </aside>

      {/* <MobilePatientList
        filteredIcuIoData={filteredData.filteredIcuIoData}
        excludedIcuIoData={filteredData.excludedIcuIoData}
      /> */}
    </>
  )
}

'use client'

import Filters from '@/components/hospital/icu/sidebar/filters/filters'
import NoPatients from '@/components/hospital/icu/sidebar/no-patients'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { Filter } from './icu-sidebar'

export default function NormalSidebar({
  filteredData,
  vetsListData,
  hosGroupList,
  isEmpty,
  setFilters,
  filters,
  handleCloseMobileDrawer,
}: {
  filteredData: {
    filteredIcuIoData: IcuSidebarIoData[]
    excludedIcuIoData: IcuSidebarIoData[]
  }
  vetsListData: Vet[]
  hosGroupList: string[]
  isEmpty: boolean
  setFilters: React.Dispatch<React.SetStateAction<Filter>>
  filters: Filter
  handleCloseMobileDrawer?: () => void
}) {
  return (
    <aside className="hidden h-[calc(100vh-88px)] w-[144px] shrink-0 flex-col gap-3 border-r p-2 md:flex">
      {isEmpty ? (
        <>
          <NoPatients />
        </>
      ) : (
        <>
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
            handleCloseMobileDrawer={handleCloseMobileDrawer}
          />
        </>
      )}
    </aside>
  )
}

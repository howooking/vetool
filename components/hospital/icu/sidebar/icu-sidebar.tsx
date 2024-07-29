'use client'

import GroupSelectDialog from '@/components/hospital/icu/sidebar/group-select-dialog'
import NoPatients from '@/components/hospital/icu/sidebar/no-patients'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import VetSelectDialog from '@/components/hospital/icu/sidebar/vet-select-dialog'
import { Button } from '@/components/ui/button'
import { IcuChartJoined, IcuIoPatientJoined, IcuUserList } from '@/types/icu'
import { RotateCcw } from 'lucide-react'
import { useState } from 'react'

export default function IcuSidebar({
  icuIoData,
  icuChartData,
  vetsListData,
}: {
  icuIoData: IcuIoPatientJoined[]
  icuChartData: IcuChartJoined[]
  vetsListData: IcuUserList[]
}) {
  const [filters, setFilters] = useState({
    selectedGroup: [] as string[],
    selectedVet: '',
  })

  const resetFilters = () => {
    setFilters({ selectedGroup: [], selectedVet: '' })
  }

  const filterByGroup = (data: IcuIoPatientJoined[]) =>
    // 특정 그룹 선택없음이면 모든 data 반환, 특정 그룹 선택 시 해당되는 그룹 반환
    filters.selectedGroup.length === 0
      ? data
      : data.filter((item) =>
          filters.selectedGroup.some((group) =>
            item.group_list.includes(group),
          ),
        )

  const filterByVet = (data: IcuIoPatientJoined[]) => {
    // 특정 수의사 선택 없음이면 모든 data 반환
    if (filters.selectedVet === '') return data

    const vetFilteredIds = icuChartData
      .filter(
        (chart) =>
          chart.main_vet.user_id === filters.selectedVet ||
          chart.sub_vet?.user_id === filters.selectedVet,
      )
      .map((chart) => chart.icu_io_id.icu_io_id)

    return data.filter((item) => vetFilteredIds.includes(item.icu_io_id))
  }

  const { filteredIcuIoData, excludedIcuIoData } = (() => {
    const groupFiltered = filterByGroup(icuIoData)
    const filtered = filterByVet(groupFiltered)
    const excluded = icuIoData.filter((item) => !filtered.includes(item))

    return { filteredIcuIoData: filtered, excludedIcuIoData: excluded }
  })()

  return (
    <aside className="h-icu-chart w-[144px] shrink-0 overflow-y-auto border-r p-2">
      <Button
        variant="outline"
        onClick={resetFilters}
        className="mb-2 flex h-8 w-full gap-2"
      >
        필터 초기화
        <RotateCcw size={12} />
      </Button>

      <GroupSelectDialog
        hosGroupList={icuIoData[0]?.hos_id.group_list || []}
        selectedGroup={filters.selectedGroup}
        setSelectedGroup={(group) =>
          setFilters({ ...filters, selectedGroup: group })
        }
      />

      <VetSelectDialog
        vetsListData={vetsListData}
        selectedVet={filters.selectedVet}
        setSelectedVet={(vet) => setFilters({ ...filters, selectedVet: vet })}
      />

      {icuIoData.length === 0 ? (
        <NoPatients />
      ) : (
        <PatientList
          filteredIcuIoData={filteredIcuIoData}
          excludedIcuIoData={excludedIcuIoData}
          selectedGroup={filters.selectedGroup}
        />
      )}
    </aside>
  )
}

'use client'

import GroupSelectDialog from '@/components/hospital/icu/sidebar/group-select-dialog'
import NoPatients from '@/components/hospital/icu/sidebar/no-patients'
import PatientList from '@/components/hospital/icu/sidebar/patient-list'
import VetSelectDialog from '@/components/hospital/icu/sidebar/vet-select-dialog'
import { IcuChartJoined, IcuIoPatientJoined, IcuUserList } from '@/types/icu'
import { useMemo, useState } from 'react'

export default function IcuSidebar({
  icuIoData,
  icuChartData,
  hosGroupListData,
  vetsListData,
}: {
  icuIoData: IcuIoPatientJoined[]
  icuChartData: IcuChartJoined[]
  hosGroupListData: string[]
  vetsListData: IcuUserList[]
}) {
  const [selectedGroup, setSelectedGroup] = useState<string[]>([])
  const [selectedVet, setSelectedVet] = useState('')

  const filterByGroup = (data: IcuIoPatientJoined[]) =>
    selectedGroup.length === 0
      ? data
      : data.filter((item) =>
          selectedGroup.some((group) => item.group_list.includes(group)),
        )

  const filterByVet = (data: IcuIoPatientJoined[]) => {
    if (selectedVet === '') return data

    const vetFilteredIds = icuChartData
      .filter(
        (chart) =>
          chart.main_vet.user_id === selectedVet ||
          chart.sub_vet?.user_id === selectedVet,
      )
      .map((chart) => chart.icu_io_id.icu_io_id)

    return data.filter((item) => vetFilteredIds.includes(item.icu_io_id))
  }

  const { filteredIcuIoData, excludedIcuIoData } = useMemo(() => {
    const groupFiltered = filterByGroup(icuIoData)
    const filtered = filterByVet(groupFiltered)
    const excluded = icuIoData.filter((item) => !filtered.includes(item))

    return { filteredIcuIoData: filtered, excludedIcuIoData: excluded }
  }, [selectedGroup, selectedVet])

  return (
    <aside className="h-icu-chart w-[144px] shrink-0 overflow-y-auto border-r p-2">
      <GroupSelectDialog
        hosGroupList={hosGroupListData}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <VetSelectDialog
        vetsListData={vetsListData}
        selectedVet={selectedVet}
        setSelectedVet={setSelectedVet}
      />
      {icuIoData.length === 0 ? (
        <NoPatients />
      ) : (
        <PatientList
          filteredIcuIoData={filteredIcuIoData}
          excludedIcuIoData={excludedIcuIoData}
          selectedGroup={selectedGroup}
        />
      )}
    </aside>
  )
}

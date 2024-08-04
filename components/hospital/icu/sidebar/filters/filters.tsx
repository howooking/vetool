import type { IcuIoPatientJoined, IcuUserList } from '@/types/icu'
import { RotateCcw } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import type { Filters } from '../icu-sidebar'
import GroupFilter from './group-filter'
import VetFilter from './vet-filter'

export default function Filters({
  filters,
  setFilters,
  icuIoData,
  vetsListData,
}: {
  filters: Filters
  setFilters: Dispatch<SetStateAction<Filters>>
  icuIoData: IcuIoPatientJoined[]
  vetsListData: IcuUserList[]
}) {
  const resetFilters = () => {
    setFilters({ selectedGroup: [], selectedVet: '' })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500">필터</span>

        <RotateCcw
          size={14}
          onClick={resetFilters}
          className="cursor-pointer transition hover:text-primary"
        />
      </div>

      <GroupFilter
        hosGroupList={icuIoData[0]?.hos_id.group_list || []}
        selectedGroup={filters.selectedGroup}
        setSelectedGroup={(group) =>
          setFilters({ ...filters, selectedGroup: group })
        }
      />

      <VetFilter
        vetsListData={vetsListData}
        selectedVet={filters.selectedVet}
        setSelectedVet={(vet) => setFilters({ ...filters, selectedVet: vet })}
      />
    </div>
  )
}

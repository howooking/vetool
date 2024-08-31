import GroupFilter from '@/components/hospital/icu/sidebar/filters/group-filter'
import VetFilter from '@/components/hospital/icu/sidebar/filters/vet-filter'
import type { Filters } from '@/components/hospital/icu/sidebar/icu-sidebar'
import type { IcuIoJoined, IcuUserList } from '@/types/icu'
import { RotateCcw } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

export default function Filters({
  filters,
  setFilters,
  icuIoData,
  // vetsListData,
}: {
  filters: Filters
  setFilters: Dispatch<SetStateAction<Filters>>
  icuIoData: IcuIoJoined[]
  // vetsListData: IcuUserList[]
}) {
  const pathname = usePathname()

  const { push } = useRouter()

  const resetFilters = () => {
    setFilters({ selectedGroup: [], selectedVet: '' })
    push(pathname)
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

      {/* <GroupFilter
        hosGroupList={icuIoData[0]?.hos_id.group_list || []}
        selectedGroup={filters.selectedGroup}
        setSelectedGroup={(group) =>
          setFilters({ ...filters, selectedGroup: group })
        }
      /> */}

      {/* <VetFilter
        vetsListData={vetsListData}
        selectedVet={filters.selectedVet}
        setSelectedVet={(vet) => setFilters({ ...filters, selectedVet: vet })}
      /> */}
    </div>
  )
}

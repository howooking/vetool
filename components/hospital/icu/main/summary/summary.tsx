import SummaryTable from '@/components/hospital/icu/main/summary/table/summary-table'
import type { IcuData } from '@/types/icu'

export default function Summary({ icuData }: { icuData: IcuData }) {
  return (
    <div className="flex h-icu-chart w-full flex-col gap-2 overflow-auto p-2 pb-[48px]">
      <SummaryTable icuData={icuData} />
      {/* <IoRadialChart /> */}
    </div>
  )
}

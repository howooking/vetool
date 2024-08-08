import IoRadialChart from '@/components/hospital/icu/main/summary/io-radial-chart'
import SummaryTable from '@/components/hospital/icu/main/summary/table/summary-table'
import type { IcuData } from '@/types/icu'

export default function Summary({ icuData }: { icuData: IcuData }) {
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <SummaryTable icuData={icuData} />
      <IoRadialChart />
    </div>
  )
}

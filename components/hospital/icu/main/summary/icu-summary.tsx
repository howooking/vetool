import type { IcuData } from '@/types/icu'
import SummaryTable from './table/summary-table'

export default function IcuSummary({ icuData }: { icuData: IcuData }) {
  const outPatientCount = icuData.icuIoData.filter(
    (element) => element.out_date,
  ).length

  return (
    <div className="w-full p-2">
      {/* <div>입원환자 수: {icuData.icuIoData.length - outPatientCount}</div>
      <div>
        퇴원환자 수:
        {outPatientCount}
      </div> */}

      <SummaryTable icuData={icuData} />
    </div>
  )
}

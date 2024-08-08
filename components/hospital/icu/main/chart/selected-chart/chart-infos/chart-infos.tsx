'use client'

import type { IcuChartJoined, IcuIoPatientJoined } from '@/types/icu'
import ChiefComplaint from './chief-complaint'
import Diagnosis from './diagnosis'
import Group from './group/group'
import InAndOutDate from './in-and-out-date/in-and-out-date'
import { MainSubVet } from './main-sub-vet/main-sub-vet'
import OwnerName from './onwer-name'
import SearchTag from './search-tag'

export default function ChartInfos({
  chartData,
  isPatientOut,
  selectedIo,
}: {
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  isPatientOut: boolean
  selectedIo: IcuIoPatientJoined
}) {
  return (
    <div className="grid grid-cols-8 gap-2">
      <div className="col-span-2">
        <InAndOutDate
          icuIoId={selectedIo.icu_io_id}
          inDate={selectedIo.in_date}
          outDueDate={selectedIo.out_due_date}
          isPatientOut={isPatientOut}
          outDate={selectedIo.out_date}
        />
      </div>

      <div className="col-span-2">
        <MainSubVet
          mainVet={chartData.main_vet}
          subVet={chartData.sub_vet}
          icuChartId={chartData.icu_chart_id}
        />
      </div>

      <div className="col-span-4">
        <Diagnosis
          diagnosis={chartData.icu_chart_dx}
          icuChartId={chartData.icu_chart_id}
          icuIoId={selectedIo.icu_io_id}
        />
      </div>

      <div className="col-span-1">
        <Group
          hosGroupList={chartData.hos_id.group_list}
          currentGroups={selectedIo.group_list}
          icuIoId={selectedIo.icu_io_id}
        />
      </div>

      <div className="col-span-1">
        <OwnerName
          ownerName={chartData.patient_id.owner_name}
          patientId={chartData.patient_id.patient_id}
        />
      </div>

      <div className="col-span-2">
        <SearchTag
          searchTags={selectedIo.search_tags}
          icuIoId={selectedIo.icu_io_id}
        />
      </div>

      <div className="col-span-4 flex gap-2">
        <ChiefComplaint
          chiefComplaint={chartData.icu_chart_cc}
          icuIoId={selectedIo.icu_io_id}
          icuChartId={chartData.icu_chart_id}
        />
      </div>
    </div>
  )
}

'use client'

import ChiefComplaint from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/chief-complaint'
import Diagnosis from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/diagnosis'
import Group from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/group/group'
import InAndOutDate from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/in-and-out-date/in-and-out-date'
import { MainSubVet } from '@/components/hospital/icu/main/chart/selected-chart/chart-infos/main-sub-vet/main-sub-vet'
import type { IcuChartJoined, IcuIoJoined, Vet } from '@/types/icu'
import OwnerName from './owner-name'
import Cpcr from './cpcr'

export default function ChartInfos({
  chartData,
  isPatientOut,
  selectedIo,
  vetsList,
}: {
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  isPatientOut: boolean
  selectedIo: IcuIoJoined
  vetsList: Vet[]
}) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-8">
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
          vetsList={vetsList}
          mainVet={chartData.main_vet}
          subVet={chartData.sub_vet}
          icuChartId={chartData.icu_chart_id}
        />
      </div>

      <div className="order-last col-span-2 md:order-none md:col-span-4">
        <Diagnosis
          diagnosis={selectedIo.icu_io_dx}
          icuIoId={selectedIo.icu_io_id}
        />
      </div>

      <div className="col-span-1">
        <Cpcr
          cpcr={chartData.icu_io_id.cpcr}
          icuIoId={chartData.icu_io_id.icu_io_id}
        />
      </div>

      <div className="col-span-1">
        <OwnerName
          ownerName={chartData.patient_id.owner_name}
          patientId={chartData.patient_id.patient_id}
        />
      </div>

      <div className="col-span-2">
        <Group
          hosGroupList={selectedIo.hos_id.group_list}
          currentGroups={selectedIo.group_list}
          icuIoId={selectedIo.icu_io_id}
        />
      </div>

      <div className="order-last col-span-2 md:order-none md:col-span-4">
        <ChiefComplaint
          chiefComplaint={selectedIo.icu_io_cc}
          icuIoId={selectedIo.icu_io_id}
        />
      </div>
    </div>
  )
}

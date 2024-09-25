'use client'

import ChiefComplaint from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chief-complaint'
import Cpcr from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/cpcr'
import Diagnosis from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/diagnosis'
import Group from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/group/group'
import InAndOutDate from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/in-and-out-date/in-and-out-date'
import MainSubVet from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/main-sub-vet/main-sub-vet'
import OwnerName from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/owner-name'
import type {
  IcuChartJoined,
  IcuIoJoined,
  SelectedChart,
  Vet,
} from '@/types/icu'

export default function ChartInfos({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const { icu_io, patient } = chartData

  const isPatientOut = !!icu_io.out_date
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-8">
      <div className="col-span-2">
        <InAndOutDate
          icuIoId={icu_io.icu_io_id}
          inDate={icu_io.in_date}
          outDueDate={icu_io.out_due_date}
          isPatientOut={isPatientOut}
          outDate={icu_io.out_date}
        />
      </div>

      <div className="col-span-2">
        {/* <MainSubVet
          vetsList={vetsList}
          mainVet={chartData.main_vet}
          subVet={chartData.sub_vet}
          icuChartId={chartData.icu_chart_id}
        /> */}
      </div>

      <div className="order-last col-span-2 md:order-none md:col-span-4">
        <Diagnosis diagnosis={icu_io.icu_io_dx} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="col-span-1">
        <Cpcr cpcr={icu_io.cpcr} icuIoId={icu_io.icu_io_id} />
      </div>

      <div className="col-span-1">
        <OwnerName
          ownerName={patient.owner_name}
          patientId={patient.patient_id}
        />
      </div>

      <div className="col-span-2">
        {/* <Group
          hosGroupList={icu_io.hos_id.group_list}
          currentGroups={icu_io.group_list}
          icuIoId={icu_io.icu_io_id}
        /> */}
      </div>

      <div className="order-last col-span-2 md:order-none md:col-span-4">
        <ChiefComplaint
          chiefComplaint={icu_io.icu_io_cc}
          icuIoId={icu_io.icu_io_id}
        />
      </div>
    </div>
  )
}

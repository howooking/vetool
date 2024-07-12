'use client'

import type { IcuChartJoined, IcuVetList } from '@/types/icu'
import Caution from './infos/caution'
import ChiefComplaint from './infos/chief-complaint'
import Diagnosis from './infos/diagnosis'
import Group from './infos/group/group'
import HeaderSignalments from './infos/header-signament/header-signalment'
import InAndOutDate from './infos/in-and-out-date/in-and-out-date'
import { MainSubVet } from './infos/main-sub-vet/main-sub-vet'

export default function ChartInfos({
  chartData,
  vetsData,
  isPatientOut,
}: {
  chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  vetsData: IcuVetList[]
  isPatientOut: boolean
}) {
  return (
    <div>
      <HeaderSignalments
        ageInDays={chartData.icu_io_id.age_in_days}
        breed={chartData.patient_id.breed}
        name={chartData.patient_id.name}
        gender={chartData.patient_id.gender}
        weightMeasuredDate={chartData.weight_measured_date}
        weight={chartData.weight}
        species={chartData.patient_id.species}
        patientId={chartData.patient_id.patient_id}
        icuChartId={chartData.icu_chart_id}
        icuIoId={chartData.icu_io_id.icu_io_id}
        isPatientOut={isPatientOut}
      />

      <div className="grid grid-cols-4 items-center gap-2">
        <InAndOutDate
          icuIoId={chartData.icu_io_id.icu_io_id}
          inDate={chartData.icu_io_id.in_date}
          outDueDate={chartData.icu_io_id.out_due_date}
          isPatientOut={isPatientOut}
          outDate={chartData.icu_io_id.out_date}
        />

        <MainSubVet
          mainVet={chartData.main_vet}
          subVet={chartData.sub_vet}
          vetsData={vetsData}
          icuChartId={chartData.icu_chart_id}
        />

        <Diagnosis
          diagnosis={chartData.icu_io_id.dx}
          icuIoId={chartData.icu_io_id.icu_io_id}
        />

        <Group
          hosGroupList={chartData.hos_id.group_list}
          currentGroups={chartData.icu_io_id.group_list}
          icuIoId={chartData.icu_io_id.icu_io_id}
        />

        <Caution
          caution={chartData.caution}
          icuChartId={chartData.icu_chart_id}
        />

        <ChiefComplaint
          chiefComplaint={chartData.icu_io_id.cc}
          icuIoId={chartData.icu_io_id.icu_io_id}
        />
      </div>
    </div>
  )
}
